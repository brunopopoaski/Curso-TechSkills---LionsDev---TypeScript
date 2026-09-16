module.exports = {
  apps: [
    {
      name: 'api-debug',
      script: 'dist/server.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_restarts: 3,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        LOG_LEVEL: 'info',
      },
    },
  ],
};
