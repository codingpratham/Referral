const nextConfig = {
  webpack: (config:any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;