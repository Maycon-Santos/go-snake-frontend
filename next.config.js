/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/lobby",
        destination: "/lobby/_",
      },
    ];
  },
};

module.exports = nextConfig;
