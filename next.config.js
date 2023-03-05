/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "@solana/wallet-adapter-base",
  // Uncomment wallets you want to use
  "@solana/wallet-adapter-bitpie",
  "@solana/wallet-adapter-coin98",
  "@solana/wallet-adapter-ledger",
  "@solana/wallet-adapter-mathwallet",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-solflare",
  "@solana/wallet-adapter-sollet",
  "@solana/wallet-adapter-solong",
  "@solana/wallet-adapter-torus",
  "@solana/wallet-adapter-wallets",
  "@project-serum/sol-wallet-adapter",
  // "@solana/wallet-adapter-ant-design",
  "@solana/wallet-adapter-bitkeep",
  "@solana/wallet-adapter-blocto",
  "@solana/wallet-adapter-clover",
  "@solana/wallet-adapter-coinhub",
  "@solana/wallet-adapter-safepal",
  "@solana/wallet-adapter-slope",
]);

const plugins = [
  // add this if you need LESS
  // [withLess, {
  //   lessLoaderOptions: {
  //     /* ... */
  //   },
  // }],
  [
    withTM,
    {
      webpack5: true,
      reactStrictMode: true,
    },
  ],
];

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      // FIX this
      // Disable minimize to make it work with Candy Machine template
      // minimization brakes Public Key names
      config.optimization.minimize = false;
    }
    return config;
  },
};

module.exports = withPlugins(plugins, nextConfig);
