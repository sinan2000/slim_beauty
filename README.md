<p align="center">
  <img src="sns-automation-logo.svg" alt="SNS Automation" width="200">
</p>

# 💄 Slim & Beauty by MC – Beauty Salon Web App

**Slim & Beauty by MC** is a modern, high-performance web app designed for a beauty salon based in **Timisoara, Romania**. This website is built for seamless **booking, scheduling, and SEO optimization**, ensuring it ranks high on search engines for relevant beauty and wellness services.

🔗 **Visit Us:** [www.snsautomation.tech](https://www.snsautomation.tech)

---

## 🌟 Features  

- 📆 **Online Booking Form** – Visitors can book appointments effortlessly  
- 📆 **Google Calendar Integration** – Automatically syncs appointments for easy schedule management  
- 📩 **SMS Notifications** - The customer receives a SMS notification upon booking form submission 
- 🔒 **Performance Optimized** – Fast loading speeds and efficient architecture  
- 📂 **Rate Limiting with Redis KV** – Protects against spam and excessive requests  
- 📈 **SEO-Optimized** – Implements JSON-LD and metadata to enhance search engine visibility  
- 📊 **Google Analytics & Tag Manager** – Provides insights into visitor interactions
- 🌐 **Responsive & Mobile-Friendly** – Flawless experience on all devices
- ⚡ **Optimized Hosting** - Hosted on Vercel's infrastructure for low latency and CDN

---

## 🛠️ Tech Stack  

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Node.js + Redis KV

---

## 🚀 Installation & Setup  

### 1️. Prerequisites  
Ensure you have the following installed:  

- [Node.js (LTS version)](https://nodejs.org/)  

### 2️. Clone the Repository  
```sh
git clone https://github.com/sinan2000/slim-beauty.git
```

### 3. Install Dependencies
```sh
cd slim_beauty
npm install
```

### 4. Set Up Environment Variables
Make sure to include environment variables for google calendar api, vonage for sms sending and redis kv.

### 5. Run in Development Mode
```sh
npm run dev
```

### 5. Build for Production
```sh
npm run build && npm run start
```

## 📜 License
MIT License – Feel free to modify and use Slim & Beauty as needed.

