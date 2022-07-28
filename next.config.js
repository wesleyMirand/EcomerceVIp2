require("dotenv").config({ path: './.env.local'});
const nextConfig = {
    reactStrictMode: true,
    env: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    },
    images: {
      domains: ['images.unsplash.com'],
    },
    typescript: {
      ignoreBuildErrors: true,
    }
  }
  
  module.exports = nextConfig