/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', 'upload.wikimedia.org', 'fonts.googleapis.com', 'newsite.atmiyauni.ac.in', 'freelogopng.com'],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
