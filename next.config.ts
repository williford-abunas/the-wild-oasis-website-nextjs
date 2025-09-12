import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [25, 50, 75, 90, 100],
    remotePatterns: [
      new URL('https://ayxacsottclfxlwekkzh.supabase.co/storage/v1/object/public/cabin-images/**'),
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
};

export default nextConfig;
