// Smoke check for a running build: every sitemap URL renders, the 404 page is a real 404,
// GTM is absent before consent, and next/image (sharp) still serves images.
// Usage: node scripts/smoke.mjs [baseUrl]   (default http://localhost:3123)

const baseUrl = (process.argv[2] ?? "http://localhost:3123").replace(/\/$/, "");
const failures = [];

const fail = (message) => failures.push(message);

async function get(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, type: res.headers.get("content-type") ?? "", body: await res.text() };
}

function checkPage(url, { status, body }) {
  if (status !== 200) return fail(`${url}: status ${status}`);

  const h1s = body.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(`${url}: ${h1s} h1 elements`);
  if (!/<title>[^<]+<\/title>/.test(body)) fail(`${url}: missing <title>`);
  if (body.includes("googletagmanager")) fail(`${url}: GTM in server HTML`);
}

async function run() {
  const sitemap = await get(`${baseUrl}/sitemap.xml`);
  if (sitemap.status !== 200) return fail(`sitemap.xml: status ${sitemap.status}`);

  const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => {
    const { pathname } = new URL(loc);
    return `${baseUrl}${pathname}`;
  });
  if (urls.length === 0) fail("sitemap.xml: no URLs");

  for (const url of urls) {
    checkPage(url, await get(url));
  }

  const missing = await get(`${baseUrl}/pagina-inexistenta`);
  if (missing.status !== 404) fail(`/pagina-inexistenta: status ${missing.status}, expected 404`);

  const home = await get(`${baseUrl}/`);
  if (!home.body.includes('rel="apple-touch-icon"')) fail("home: no apple-touch-icon");

  const imageSrc = home.body.match(/src="(\/_next\/image\?url=[^"]+)"/)?.[1]?.replaceAll("&amp;", "&");
  if (!imageSrc) {
    fail("home: no /_next/image src found");
  } else {
    const image = await fetch(`${baseUrl}${imageSrc}`);
    const type = image.headers.get("content-type") ?? "";
    if (image.status !== 200 || !type.startsWith("image/")) {
      fail(`next/image: status ${image.status}, content-type "${type}"`);
    }
  }

  return urls.length;
}

// exitCode instead of process.exit(): exiting while fetch's sockets are still open trips a libuv
// assertion on Windows and turns exit 1 into 127.
try {
  const count = await run();
  if (failures.length === 0) console.log(`${count} URLs ok`);
} catch (error) {
  fail(`could not reach ${baseUrl}: ${error.cause?.code ?? error.message}`);
}

for (const message of failures) console.error(`FAIL ${message}`);
process.exitCode = failures.length === 0 ? 0 : 1;
