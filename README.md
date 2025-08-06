# Beats Store Template

This is a template for a digital beats e-commerce store. It includes placeholder data for kits and order emails, and is designed to help producers quickly launch their own online storefront.

## Features

- Kit detail pages and categorized displays
- Add-to-cart functionality (works for both guests and authenticated users)
- Stripe Checkout integration
- Post-purchase emails with secure download links using Resend
- Responsive UI styled with Tailwind CSS
- Entrance animations using Framer Motion

## Tech Stack

- Next.js (App Router)
- Supabase (Auth, Database, Storage)
- Stripe (Checkout)
- Resend (Email API)
- Tailwind CSS (Style)
- Framer Motion (Animation)

## Setup Notes

- This is a template with placeholder data. Replace with your own kits and assets.
- The Newsletter and Contact forms are styled but not fully implemented.
- You must create your own Supabase project and replicate the required schema (`kits`, `cart_items`, `users`, etc.).

For implementation questions or style customizations, contact **aksultan05@gmail.com**

---

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
