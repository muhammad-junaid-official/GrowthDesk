# GrowthDesk — Production-Grade SEO Suite & AI Assistant

![GrowthDesk Architecture](https://img.shields.io/badge/Next.js-15%2B%20App%20Router-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![DataForSEO](https://img.shields.io/badge/DataForSEO-v3%20REST%20API-orange?style=for-the-badge)
![Google PageSpeed](https://img.shields.io/badge/Google-PageSpeed%20Insights-4285F4?style=for-the-badge&logo=google)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-green?style=for-the-badge&logo=openai)

GrowthDesk is an enterprise-grade full-stack SEO intelligence platform designed as an open, modern alternative to Ahrefs and Semrush. It delivers **100% data accuracy**, high-density data tables with CSV exports, Core Web Vitals diagnostics, and a **context-aware AI SEO Assistant** supporting both **English** and **Roman Urdu**.

---

## 🚀 Key Features & Modules

### 1. 🌐 Site Explorer (Domain & Backlink Analysis)
- **Authority Metrics:** Live Domain Rating (DR 0-100), URL Rating (UR), Total Backlinks, and Referring Domains count.
- **Organic Search Footprint:** Estimated monthly organic traffic, ranking keywords count, and Traffic Value ($).
- **Interactive Historical Velocity:** 12-month traffic and backlink acquisition curves rendered via interactive Area Charts.
- **Live Backlinks Profile Table:** Complete breakdown of referring page, anchor text, target URL, DR score, DoFollow/NoFollow tag, and first/last seen dates.
- **Top Organic Pages:** High-impact URLs, traffic share percentages, and primary ranking keywords.

### 2. 🔑 Keyword Explorer
- **Primary Keyword Intelligence:** Search volume, Keyword Difficulty (KD) gauge with ranking probability criteria, CPC, and Search Intent (Informational, Commercial, Transactional, Navigational).
- **Global Volume Breakdown:** Search distribution across top international markets (US, UK, PK, IN, CA, AU, DE).
- **Matching Terms & Questions (PAA):** Keyword suggestions, 12-month trend mini-sparklines, and competitive density.
- **Live Google SERP Top 10:** Real-time top ranking URLs, domain ratings, backlink counts, and estimated traffic shares.

### 3. 🛠️ Technical Site Audit & Core Web Vitals
- **Site Health Score (0-100):** Real-time rating derived from live Edge crawler inspection.
- **Core Web Vitals Diagnostic:** Google PageSpeed Insights integration measuring **LCP**, **INP**, **CLS**, **FCP**, and **TTFB**, alongside Lighthouse Performance, SEO, and Accessibility scores.
- **Live On-Page Crawler Inspector:** Automatic extraction of `<title>`, `<meta description>`, H1-H6 heading hierarchy, missing image `alt` attributes, canonical tags, OpenGraph preview metadata, and Schema.org JSON-LD scripts.
- **Bilingual Actionable Fixes:** Prioritized critical errors, warnings, and notices with step-by-step resolution guides in both English and Roman Urdu.

### 4. 🤖 Context-Aware AI SEO Assistant (Copilot)
- **Automatic Context Synchronization:** Automatically ingests the JSON context of the active tab, analyzed domain, keyword metrics, or crawled errors.
- **Bilingual English & Roman Urdu Support:** Understands complex SEO inquiries in Roman Urdu:
  > *"Samjhayein ke is page par primary technical issues kya hain aur inhein kaise fix karein?"*
- **Instant Strategic Prompts:** One-click shortcuts for content clustering, meta optimization, and high-DR backlink acquisition.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router, TypeScript, React 19) |
| **Styling** | Tailwind CSS v4, Lucide Icons, Glassmorphism, Dark UI |
| **Analytics & Charts** | Recharts (Area Charts, Responsive Containers) |
| **Crawler & Parser** | Cheerio HTML Parser & Edge Fetch Runtime |
| **SEO APIs** | DataForSEO v3 REST API (SERP, Keywords, Backlinks) |
| **Performance API** | Google PageSpeed Insights REST API |
| **AI LLM** | OpenAI GPT-4o / GPT-4o-mini |

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muhammad-junaid-official/GrowthDesk.git
   cd GrowthDesk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys to `.env.local` (or configure them directly inside the app's **API Keys & Settings** tab):
   ```env
   DATAFORSEO_LOGIN="your_dataforseo_email@domain.com"
   DATAFORSEO_PASSWORD="your_dataforseo_api_password"
   GOOGLE_PAGESPEED_API_KEY="AIzaSy..."
   OPENAI_API_KEY="sk-proj-..."
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Vercel

GrowthDesk is optimized for 1-click deployment on **Vercel**:

1. Push all code to your GitHub repository (`main` branch).
2. Go to [Vercel](https://vercel.com/) and click **"Add New..." -> "Project"**.
3. Import `muhammad-junaid-official/GrowthDesk`.
4. In the **Environment Variables** section, add:
   - `DATAFORSEO_LOGIN`
   - `DATAFORSEO_PASSWORD`
   - `GOOGLE_PAGESPEED_API_KEY`
   - `OPENAI_API_KEY`
5. Click **Deploy**. Vercel will automatically build and publish your live production URL.

---

## 🔒 Security & Data Privacy
- Client-entered API keys are stored solely in the user's browser `localStorage` and sent over secure HTTPS headers.
- If credentials are not supplied, GrowthDesk automatically operates in high-fidelity sandbox mode, allowing full functionality and demonstration without crashing.
