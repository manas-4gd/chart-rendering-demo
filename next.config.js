/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is enabled by default in Next.js 14
  
  // Transpile plotly.js and other dependencies
  transpilePackages: ['plotly.js', 'react-plotly.js'],
  
  // Allow 'self' and 'window' in server components 
  experimental: {
    // Disabling SSR for components that use browser-only features
    appDir: true,
    serverComponentsExternalPackages: ['plotly.js', 'react-plotly.js']
  },
  
  // Webpack configuration to handle 'self' is not defined error
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  }
}

module.exports = nextConfig
