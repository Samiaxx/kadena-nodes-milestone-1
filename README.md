# Kadena Nexus – Global Node Map (MVP)

Kadena Nexus is a Web3-style global node visualization dashboard built for the Kadena ecosystem.

This MVP focuses on delivering a **clean, interactive world map and globe view**, with a modern UI and a solid foundation for future live network data and analytics.

---

## ✨ Features (MVP)

- 🌍 Interactive **2D Map (Leaflet)** with global node markers
- 🌐 Interactive **3D Globe (Mapbox)** with clickable nodes
- 🧭 Hover tooltips showing:
  - Node ID / Name
  - Region
  - Node type
  - Status (Online / Offline)
- 🎨 Light / Dark mode toggle
- 🔁 Toggle between **Map** and **Globe** views
- 📍 Static mock node data (10 global nodes)
- 🧩 Modular, scalable code structure (ready for live data)

> This MVP is focused on visualization and UX. Live network data will be introduced in future versions.

---

## 🗺️ Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Leaflet.js** (2D map)
- **Mapbox GL JS** (3D globe)
- **Tailwind CSS**
- **Vercel** (Deployment)

---

## 🚀 Getting Started (Local Development)

```bash
npm install
npm run dev