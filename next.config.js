module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['kaerunftmarket.infura-ipfs.io'],
  },
  experimental: { appDir: true },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },

}
