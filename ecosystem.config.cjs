module.exports = {
  apps: [
    {
      name: 'yogi-blevins',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/yogi_blevins',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_SANITY_PROJECT_ID: 'xyhoulob',
        NEXT_PUBLIC_SANITY_DATASET: 'production',
      },
      error_file: '/var/log/pm2/yogi-blevins-error.log',
      out_file: '/var/log/pm2/yogi-blevins-out.log',
      log_file: '/var/log/pm2/yogi-blevins-combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};

