const withMarkdoc = require('@markdoc/next.js')

const { withGlobalCss } = require('next-global-css')
const withConfig = withGlobalCss()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

const globalNextConfig = withConfig(nextConfig)

module.exports = withMarkdoc()(globalNextConfig)
