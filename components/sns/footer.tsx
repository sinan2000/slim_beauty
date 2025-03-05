'use client';
import dynamic from 'next/dynamic';

const ClientFooter = dynamic(() => import('@/components/sns/footer-client'), { ssr: false })

export default function SNSFooter() {
  return <ClientFooter />;
}