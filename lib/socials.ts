const whatsAppMessage = encodeURIComponent("Bună ziua! Sunt interesată de serviciile dvs. de remodelare corporală.");
const whatsAppLink = `https://api.whatsapp.com/send?phone=40733407329&text=${whatsAppMessage}`;

export const socialData = [
  {
    link: "https://www.facebook.com/SalonSlimBeautyByMC",
    icon: "/icons/facebook.svg",
    alt: "Facebook Page of Salon Slim & Beauty by M.C."
  },
  {
    link: "https://www.instagram.com/slimandbeautybymc/",
    icon: "/icons/instagram.svg",
    alt: "Instagram Page of Salon Slim & Beauty by M.C."
  },
  {
    link: "https://www.tiktok.com/@slimandbeautymc/",
    icon: "/icons/tiktok.svg",
    alt: "TikTok Page of Salon Slim & Beauty by M.C."
  },
  {
    link: whatsAppLink,
    icon: "/icons/whatsapp.svg",
    alt: "WhatsApp Chat with Salon Slim & Beauty by M.C."
  }
];