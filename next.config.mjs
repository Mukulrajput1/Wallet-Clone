/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DOMAIN: process.env.DOMAIN,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        // Add more environment variables as needed
      }
};

export default nextConfig;
