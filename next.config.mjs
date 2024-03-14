/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
