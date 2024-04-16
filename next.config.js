/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: [],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '**',
        },
      ],
    },
  }