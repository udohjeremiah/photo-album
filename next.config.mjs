/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
