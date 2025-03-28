module.exports = {
  apps: [
    {
      name: 'bt-frontend',
      script: 'npm',
      args: 'run preview',
      autorestart: false,
      watch: false,
      error_file: 'logs/errors/brawl-tree-frontend.log',
      out_file: 'logs/outs/brawl-tree-frontend.log',
      log_file: 'logs/brawl-tree-frontend.log',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
