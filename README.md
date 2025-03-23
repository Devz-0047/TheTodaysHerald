# Today's Herald

## 📜 Overview

Today's Herald is a modern news application built with React and Tailwind CSS. It fetches real-time news from the **GNews API** and supports multiple languages. The platform provides users with the latest headlines, stock parameters values, category-based news, and a seamless search experience.

## ✨ Features

- 📰 **Live News Fetching** – Fetches real-time news using the GNews API.
- 🔍 **Search Functionality** – Allows users to search for news articles.
- 🌍 **Multi-language Support** – Uses `react-i18next` for static content translation.
- 🎨 **Responsive UI** – Built with Tailwind CSS for a sleek and adaptive design.
- 🚀 **Fast Performance** – Uses React Query for efficient data fetching and caching.

## 🏗️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **State Management:** Redux Toolkit
- **API Integration:** Axios, React Query
- **Localization:** react-i18next
- **Deployment:** Vercel

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Devz-0047/TheTodaysHerald.git
cd todays-herald
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_GNEWS_API_KEY=your_api_key_here
```

### 4️⃣ Start the Development Server

```sh
npm run dev
```

Visit **`http://localhost:5173/`** in your browser.

## 🌐 API Integration

The app uses the **GNews API** for fetching news. Example API endpoint:

```sh
https://gnews.io/api/v4/search?q=<SEARCH_TERM>&token=<API_KEY>&lang=<LANGUAGE>&max=10
```

## 🔄 Language Support

This project supports multiple languages using `react-i18next`. Static text translations are provided for:

- **English** (en)
- **Hindi** (hi)
- **French** (fr)
- **Spanish** (es)

To switch languages, users can click on language buttons in the UI.

## 🛠️ Deployment

This project is deployed using **Vercel**. To deploy manually:

```sh
vercel
```

Or use GitHub Actions for automated deployment.

## 🤝 Contributing

Feel free to contribute! Fork the repo, make changes, and submit a PR. 🚀

## 📄 License

This project is **MIT Licensed**.

---

### 📬 Contact

For any queries, reach out via:
📧 Email: greydeven14@gmail.com
❌ X: [@Dev_128b](https://x.com/Dev_128b)
