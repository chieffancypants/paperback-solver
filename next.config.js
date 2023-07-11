/** @type {import('next').NextConfig} */

// When building for production (Github Pages), add the repo name as the base path
const basePath = process.env.NODE_ENV === 'production' ? '/paperback-solver' : ''

const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: basePath,
}

module.exports = nextConfig
