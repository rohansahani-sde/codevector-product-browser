# CodeVector Product Browser Frontend Redesign

A premium, interactive storefront dashboard built to showcase the high-performance keyset (cursor-based) pagination backend traversing 200,000+ mock database products.

## Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (native CSS variables, HSL color palettes)
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Features
- 🚀 **Interactive Keyset Pagination**: Infinite feed style loader using real-time API cursor tokens (`createdAt` and `id`).
- 📁 **Sidebar Category Browsing**: Smooth floating sidebar category selectors with custom vector icons on desktop, adapting to scrollable category pills on mobile viewports.
- ⚡ **API Latency Statistics**: Live response-time metrics tracking execution speed of database lookups in milliseconds.
- 🎛️ **View Layout Switching**: Instantly switch feed structures between Grid and List views.
- 🛠️ **Pagination Diagnostics Console**: Real-time developer debug terminal logging active cursor coordinates, next cursors, statistics, and a chronological history of pagination chunks.

## API Integration

This frontend coordinates with your backend API via the following endpoints (configured through `src/services/api.js`):

- **Initial Load & All Categories**:  
  `GET /api/products?limit=20`

- **Category Filtering**:  
  `GET /api/products?limit=20&category={CategoryName}`

- **Keyset Paginated Continuation**:  
  `GET /api/products?limit=20&createdAt={createdAtCursorVal}&id={idCursorVal}`

- **Category Keyset Continuation**:  
  `GET /api/products?limit=20&category={CategoryName}&createdAt={createdAtCursorVal}&id={idCursorVal}`

---

## Local Development Startup

### 1. Installation
Clone the repository, navigate to the `frontend` folder, and install the package dependencies:
```bash
npm install
```

### 2. Configuration
Ensure the backend endpoint base URL is set correctly in `src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: "https://codevector-product-browser-3pzy.onrender.com/api",
});
```

### 3. Start Development Server
Launch Vite's development compilation server:
```bash
npm run dev
```
Open `http://localhost:5173` (or the configured terminal port) in your browser.
