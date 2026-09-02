/** @type {import('next').NextConfig} */
const apiProxyTarget =
  process.env.API_PROXY_TARGET ||
  "https://dev.homecare.mcabee.in/api/admin";

const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/admin/:path*",
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
