module.exports = {
  apps: [
    {
      name: 'brawltree-frontend',
      script: 'npm',
      args: 'run preview',
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
