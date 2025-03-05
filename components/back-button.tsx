'use client';
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      className="inline-flex items-center px-6 py-3 bg-white text-pink-500 rounded-full hover:bg-pink-50 transition duration-300 border border-pink-200 shadow-sm"
      onClick={() => router.back()}  
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Înapoi
    </button>
  )
}