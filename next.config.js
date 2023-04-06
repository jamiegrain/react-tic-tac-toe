/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/grid',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig