/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: process.env.NEXT_PUBLIC_ENV === 'SIT' ? "build_sit" :"build_local",
    distDir: process.env.NEXT_PUBLIC_ENV === 'UAT' ? "build_uat" :"build_local"
}

module.exports = nextConfig
