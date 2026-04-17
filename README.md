# Aurora Jewel Studio — Storefront

A premium, high-end e-commerce storefront for **Aurora Jewel Studio**, specializing in handcrafted Silver and Panchadhatu jewelry from Nepal. Built with Next.js 14, Framer Motion for immersive animations, and Three.js for 3D product showcases.

## ✨ Features

- **Immersive 3D Hero**: Interactive 3D jewelry models using React Three Fiber.
- **Dynamic Catalog**: Fully integrated with Medusa v2 for real-time inventory and product data.
- **Bespoke Module**: Custom jewelry request flow that sends designs directly to the Medusa backend.
- **Micro-Animations**: Extensive use of Framer Motion for smooth transitions, scroll reveals, and hover effects.
- **Luxury Aesthetics**: Hand-picked color palette (`#013624` Green-Gold) and premium typography (Playfair Display & Inter).
- **Responsive Design**: Mobile-first architecture with glassmorphism navigation.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS with TailwindCSS utilities
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Rendering**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Backend API**: [Medusa v2](https://medusajs.com/)
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- A running Medusa v2 backend (see `/backend`)

### Installation

1. Clone the repository and navigate to the storefront:
   ```bash
   cd storefront
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```env
   NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/src/app`: Next.js App Router pages (Bespoke, Collections, Products).
- `/src/components/home`: High-level landing page sections (3D Showcase, Hero, Collections).
- `/src/components/layout`: Global components (Navbar, Footer, Mobile Menu).
- `/src/components/ui`: Reusable design systems components (Buttons, Animated Sections).
- `/src/context`: React context for Cart and Global state management.

## 🏛️ Architecture

This storefront acts as a headless frontend consuming the Medusa v2 API. Authentication, Cart logic, and Payment processing are all handled by the Medusa backend.
