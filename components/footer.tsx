import { socialData } from "@/lib/socials";
import Image from "next/image";
import Link from "next/link";
import anpcSal from "@/assets/anpc-sal.png";

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Slim & Beauty</h3>
            <p className="text-gray-600 mb-4">
              Slim & Beauty by MC oferă servicii de înfrumusețare și remodelare corporală de înaltă calitate, folosind tehnologii avansate și produse premium. Hai să vorbim despre slăbit!
            </p>
            <div className="flex space-x-4">
              {socialData.map((item, index) => (
                <Link key={`social-icon-footer-no-${index}`} href={item.link} target="_blank" className="text-gray-500 hover:text-pink-500">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={20}
                    height={20}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Programul nostru</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between">
                <span>Luni, marți, joi</span>
                <span>13:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Miercuri, vineri</span>
                <span>09:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sâmbătă, duminică</span>
                <span>Închis</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">Detalii de contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-pink-600 mt-1"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Strada Petőfi Sándor 101, Dumbrăvița 307160, Romania</span>
              </li>
              <li className="flex items-start">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-pink-600 mt-1"
                >
                  <path
                    d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>+40 733 407 329</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-pink-200 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Slim & Beauty. Toate drepturile rezervate.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="https://reclamatiisal.anpc.ro/" target="_blank" rel="nofollow">
              <Image
                src={anpcSal}
                alt="ANPC SAL"
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}