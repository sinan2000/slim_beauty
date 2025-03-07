'use client';
import Link from 'next/link';
import { Logo } from './logo';
import { ArrowUpRight } from 'lucide-react';

export default function ClientFooter() {
    return (
        <div className="relative border-t border-emerald-500/20 bg-black/50 backdrop-blur-xl sns-footer">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo and Link Section */}
                    <Link
                        href="https://www.snsautomation.tech"
                        target="_blank"
                        className="group flex items-center gap-2 transition-transform hover:scale-105"
                    >
                        <Logo />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                SNS Automation
                            </span>
                            <span className="text-xs text-emerald-500/60">Software Solutions</span>
                        </div>
                    </Link>

                    {/* CTA Section */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="https://www.snsautomation.tech"
                            target="_blank"
                            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            Ai nevoie de un site web sau o aplicatie mobilă?
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                </div>

                {/* Animated Line */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
                        style={{
                            animation: 'shimmer 2s linear infinite',
                            backgroundSize: '200% 100%',
                        }}
                    />
                </div>
            </div>

            {/* Scoped Styles */}
            <style jsx>{`
        .sns-footer {
          --foreground-rgb: 255, 255, 255;
          --background-start-rgb: 0, 0, 0;
          --background-end-rgb: 0, 0, 0;
          color: rgb(var(--foreground-rgb));
          background: linear-gradient(
              to bottom,
              transparent,
              rgb(var(--background-end-rgb))
            )
            rgb(var(--background-start-rgb));
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
        </div>
    );
}
