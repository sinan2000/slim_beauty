import { BronzLogo } from "@/components/bronz/logo";

/** Route-change fallback: the logo breathing on the espresso ground, still under reduced motion. */
export default function LoadingPage() {
    return (
        <div role="status" aria-label="Se încarcă" className="flex min-h-[100svh] items-center justify-center px-5">
            <BronzLogo variant="full" title="Slim & Beauty by MC" className="bz-breathe h-auto w-[min(22rem,70vw)] text-(--cream)" />
        </div>
    );
}
