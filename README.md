# IKN Properties — Real Estate & Land-Share Flat Platform

Official website and administrative management portal for **IKN Properties** (Domain: [https://iknproperties.com/](https://iknproperties.com/)), inspired by the luxury real estate aesthetic of [dpremiumhomes.com](https://www.dpremiumhomes.com/).

> **Company Tagline:**  
> *“নিজের নামে জমি কিনুন, সবাই মিলে কম খরচে ফ্ল্যাট গড়ুন। বিশ্বাসের ভিত্তিতে গড়ে উঠুক আপনার নিরাপদ বিনিয়োগ।”*  
> (Buy land in your own name, build flats together at low cost. Let your safe investment be built on trust.)

---

## 🌟 Key Features & Capabilities

### 1. Public Real Estate Portal
- **Luxury Aesthetic**: Deep Royal Emerald Green (`#065e33`) with Champagne Gold (`#d9a52d`) and slate styling matching top real estate developers in Dhaka.
- **Bilingual Interface**: Seamless instant toggle between English and Bengali (বাংলা).
- **Hero Slider & Quick Search**: Dynamic visual slider with responsive property filter (Category, Location, Budget).
- **Featured Projects**:
  - **Rose Garden**: 1,250 SFT, 63 Units, G+9, 3 Bed, 3 Bath, 2 Balconies, 2 Lifts, Substation, 24/7 Security & CCTV. (Land Share: 18 Lakh BDT, Est. Total: 40-45 Lakh BDT, 136 piles cast).
  - **Shopno Tower (স্বপ্ন টাওয়ার)**: 1,350 SFT, 18 Units, G+9, 3 Bed, 3 Bath, 2 Balconies, 1 Lift. (Land Share: 20 Lakh BDT, Est. Total: 45 Lakh BDT, Piling complete).
- **Interactive Land Share vs Commercial Developer Cost Calculator**:
  - Demonstrates **35–40% cost savings** (up to ~38 Lakh BDT per flat) with interactive sliders for flat size and monthly construction installments over 30 months.
- **Our 3 Core Business Services**:
  1. *Land Share Flats (জমি শেয়ারে ফ্ল্যাট)*
  2. *Ready Flats (রেডি ফ্ল্যাট)*
  3. *Joint Building Development (যৌথ ভবন নির্মাণ)*
- **5-Step Transparency Roadmap**: Vetting -> Sub-Kabla Registry in Buyer's Name -> RAJUK Approval & Soil Test -> Cost-to-cost construction -> Handover in 30 Months.
- **Live Construction Progress Tracker**: Real-time engineering milestones, pile casting updates, and on-site photos.
- **Real Estate Insights & Blog**: SEO-optimized guides on land share laws, RAJUK approvals, and North Badda market trends.
- **Lead Capture & Booking**:
  - Instant booking modal on all projects.
  - Floating direct WhatsApp chat (+8801703033789) with prefilled messages.
  - Official Project Brochure download.
- **Contact & Location**:
  - Office: 158/1B (4th Floor), Moynarbag, Hossen Market, North Badda, Dhaka-1212.
  - Hotlines: `01703-033789`, `01721-961935`.
  - Embedded Google Map.

### 2. Full-Featured Admin Control Panel (`/admin`)
- **Protected Access**: JWT authentication with bcrypt password hashing.
  - **Default Username:** `admin`
  - **Default Password:** `iknadmin2026`
- **Dashboard Overview**: KPI metric cards (Total Inquiries, Active Projects, Milestones, Blogs) and recent lead tracker.
- **Projects Management**: Add, edit, or delete projects with specifications, pricing, amenities, and photos.
- **Customer Leads CRM**: View inquiries, filter by status (`New`, `Contacted`, `Site Visit Scheduled`, `Closed`), update notes, and export to CSV.
- **Construction Milestones**: Add live progress updates with photo URLs and percentage bars.
- **Articles & Blogs**: Write, edit, and publish rich markdown articles with categories and SEO meta tags.
- **Testimonials Manager**: Manage verified customer feedback.
- **Hero Sliders Manager**: Update homepage banner headlines, images, and links.
- **Company Settings**: Update contact hotlines, address, social URLs, and change admin password.

### 3. SEO Optimization
- **Schema.org JSON-LD Structured Data**: Implemented for `RealEstateAgent`, `Organization`, `WebSite`, and individual properties.
- **Meta Tags**: OpenGraph, Twitter Cards, canonical tags, and localized descriptions.
- **Dynamic XML Sitemap**: Generated automatically at `/sitemap.xml`.
- **Search Engine Directives**: Validated `robots.txt`.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18 or higher, tested on Node v24)
- npm

### 1. Run the Full Application (Single Command)
```bash
npm start
```
This runs both the API server on port 5000 and serves the compiled frontend.

### 2. Run in Development Mode
```bash
npm run dev
```
- Backend API server: `http://localhost:5000`
- Frontend Vite dev server: `http://localhost:5173`

---

## 📂 Project Structure
```
├── dist/                   # Production build assets
├── public/
│   ├── favicon.svg         # Emerald and gold brand shield
│   └── robots.txt          # Search engine crawler instructions
├── server/
│   ├── index.js            # Express API, auth, sitemap generator & static server
│   ├── db.js               # Persistent JSON database with pre-seeded projects
│   └── data/               # Persistent database storage
├── src/
│   ├── admin/              # Complete Admin Portal components
│   ├── components/         # Reusable UI components & calculators
│   ├── context/            # Global AppContext & AuthContext
│   ├── pages/              # Public web pages
│   ├── App.jsx             # React router configuration
│   ├── main.jsx            # React root
│   └── index.css           # Tailwind directives & luxury styling
├── tailwind.config.js      # Brand color palette configuration
├── vite.config.js          # Vite build & proxy settings
└── package.json
```
