# Welcome to Modern React TS Starter

> A clean, production-ready starter template for building React applications with TypeScript, Vite, React Query, Axios, TailwindCSS (or Radix/shadcn UI) and more.

## 🚀 Why this template  
This template is designed to give you a solid foundation for your next React + TypeScript project, with features like:  
- ⚡️ Blazing fast build & dev experience using Vite  
- ✅ TypeScript for type safety  
- 🧠 Data-fetching & caching using React Query (i.e., the TanStack variant)  
- 🔌 HTTP client via Axios  
- 🎨 Styling / UI: either plain TailwindCSS or Tailwind + Radix UI + shadcn/ui (depending on branch)  
- 📁 Opinionated folder structure to keep your app scalable  
- 🧪 Out-of-the-box setup so you focus on building features, not configuration  

## 📦 Features  
- Vite dev server + hot module replacement  
- TypeScript config tuned for React + Vite  
- React Query for data / server state  
- Axios setup with base URL configuration  
- TailwindCSS (and optionally Radix UI / shadcn UI) for UI components  
- Boilerplate layout with example pages/components  
- ESLint and TSConfig files pre-configured  
- Public assets folder and index.html template  

## 🛠️ Getting Started  
### Prerequisites  
Make sure you have the following installed:  
- Node.js (v14+ or whatever your project requires)  
- Yarn (or you may use npm/pnpm but this template uses Yarn by default)  

### Install & Run  
` bash
# Clone the repo
git clone https://github.com/your-org/modern-react-ts-starter.git
cd modern-react-ts-starter

# Install dependencies
yarn

### Create a .env file
### For example:
### VITE_APP_BASE_URL=https://jsonplaceholder.typicode.com

cp .env.example .env        # (if you provide an example)
### or manually create .env with required keys

### Start development server
yarn dev

### Build for production
yarn build

### Serve production build locally
yarn preview
