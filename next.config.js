const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'localhost:3000', 'cdn.clinicallab.com', 'launchbase.uk', 'media.licdn.com'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
