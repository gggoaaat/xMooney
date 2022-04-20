/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    title: 'xMooney',
    blockExplorerURL : "https://testnet.bscscan.com/",
    tokenContractAddress : "0xEEFE69a45CB83d8e62d4ba22F7068480BE09b78c",
    vaultContractAddres : "0x32db1720afbf5c639291ca274d05bccd92594b7b"
  },
}

module.exports = nextConfig
