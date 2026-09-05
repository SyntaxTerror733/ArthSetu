# VITAARA
**AI-Powered Business Advisory & Financial Structuring Platform**

VITAARA is an AI-driven hyper-local business advisory and financial structuring platform for rural and semi-urban micro-entrepreneurs in India, built for Smart India Hackathon 2026. It combines a deterministic government loan calculator with an AI-generated feasibility report, grounded in real local business and demographic data.

## Features

### Module 2 — Financial Structuring & Loan Eligibility
- Deterministic project cost & loan eligibility calculator (10% margin / 90% loan structure)
- Automatic scheme routing between NSFDC Micro Finance Scheme (≤₹1.4L, 6.5% interest, 3-yr tenure) and Term Loan Scheme (₹1.4L-₹50L, 8% interest, 7-yr tenure)
- Full quarterly EMI/repayment schedule generator with moratorium handling
- 100% deterministic — no AI involvement, guaranteed accurate and auditable

### Module 1 — AI-Powered Feasibility Report
- Hyper-local market reach, opportunity analysis, and 2x2 SWOT matrix, generated via Google Gemini, strictly grounded in real district data
- Competitor mapping and pricing suggestions based on verified business density figures
- AI-generated suggested follow-up questions tailored to each report
- Strict guardrails: AI never invents statistics and never touches financial/loan figures (those remain exclusive to Module 2)

### Conversational Report Assistant
- Follow-up Q&A chatbot grounded in the specific generated report
- Voice input (speech-to-text) and voice output (text-to-speech) in both English and Hindi, via the browser's native Web Speech API
- AI-generated contextual suggested questions per report

### Bilingual Support (English / Hindi)
- Full UI translation plus AI-generated content (reports and chat answers) dynamically generated in the selected language
- Automatic report regeneration on language switch, no form resubmission needed

### Business Opportunity Comparison Mode
- Side-by-side feasibility comparison of two business categories in the same district
- AI-synthesized recommendation verdict with reasoning and key tradeoffs

### Data Transparency & Credibility
- Visible "Data Credibility" badge distinguishing verified vs. estimated figures per district
- Full source citations shown to the user (Census of India, UP Economic Survey, OpenStreetMap business listings)

### Downloadable Reports
- Client-side PDF export of both single-district and comparison reports

### Demo Resilience
- Pre-verified fallback cache per district, ensuring the app degrades gracefully to a real, correct backup report if the live AI call fails

## Real Data Coverage
Four demo districts across Uttar Pradesh, each with verified data:
- **Business density**: OpenStreetMap-sourced business listings
- **Population & density**: Census of India 2011 (most recent completed Census)
- **Per capita income**: Uttar Pradesh Economic Survey 2023-24
- Districts: Ghaziabad, Meerut, Prayagraj, Varanasi

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Custom client-side routing (state-based, not react-router-dom)
- anime.js v4 — hero entrance animations (splitText, stagger)
- html2canvas + jsPDF — client-side PDF report export
- Web Speech API (SpeechRecognition, SpeechSynthesis) — voice input/output

**Backend**
- FastAPI (Python)
- Uvicorn (ASGI server)
- Pydantic — request/response validation
- python-dotenv — environment configuration

**AI**
- Google Gemini API (gemini-3.1-flash-lite)
- google-genai SDK

**Data Sources**
- OpenStreetMap (business/POI listings)
- Census of India 2011
- Uttar Pradesh Economic Survey 2023-24

## Architecture
Four isolated backend layers (see docs/architecture.md for full reasoning):
1. **Financial Engine** — 100% deterministic, no AI dependency
2. **Data Layer** — cleaned Census + MSME/OSM dataset for demo districts
3. **AI Layer** — Gemini prompt templates, response validation, fallback cache
4. **Routes** — /api/calculate, /api/feasibility-report, /api/chat, /api/compare-verdict

**Golden rule**: financial_engine/ never imports from ai_layer/. The AI only ever receives numbers already computed by the financial engine — it never calculates its own.

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env  # Add your GEMINI_API_KEY
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be running at `http://localhost:5173`.

## Team Ownership

| Component / Layer | Primary Ownership & Architecture |
| :--- | :--- |
| **Financial Engine & Credit Structuring** | Deterministic NSFDC Scheme & Loan Eligibility Engine |
| **AI Layer & Prompt Engineering** | Google Gemini Integration, Guardrails, & Grounding |
| **Full-Stack Integration & UI/UX** | React Frontend, Responsive Styling, & FastAPI Routes |
