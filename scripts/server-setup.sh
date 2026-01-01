#!/bin/bash
set -e

echo "=========================================="
echo "Digital Ocean Droplet Setup for Yogi Blevins"
echo "=========================================="
echo ""

read -p "Enter your domain name (e.g., yourdomain.com): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "Error: Domain name is required"
    exit 1
fi

echo ""
echo "Starting setup for domain: $DOMAIN"
echo ""

echo "=== Updating system packages ==="
sudo apt update && sudo apt upgrade -y

echo "=== Installing required packages ==="
sudo apt install -y curl git nginx certbot python3-certbot-nginx

echo "=== Installing Node.js 20.x ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "=== Installing pnpm ==="
curl -fsSL https://get.pnpm.io/install.sh | sh -
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
source ~/.bashrc 2>/dev/null || true

echo "=== Installing PM2 ==="
sudo npm install -g pm2

echo "=== Creating application directory ==="
sudo mkdir -p /var/www/yogi_blevins
sudo chown -R $USER:$USER /var/www/yogi_blevins

echo "=== Creating PM2 log directory ==="
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

echo "=== Creating nginx cache directory ==="
sudo mkdir -p /var/cache/nginx
sudo chown -R www-data:www-data /var/cache/nginx

echo "=== Creating certbot webroot ==="
sudo mkdir -p /var/www/certbot

echo "=== Configuring nginx ==="
cat << EOF | sudo tee /etc/nginx/sites-available/yogi-blevins
upstream nextjs_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    location /_next/static {
        proxy_pass http://nextjs_upstream;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /static {
        proxy_pass http://nextjs_upstream;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Forwarded-Port \$server_port;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
    }

    location ~ /\. {
        deny all;
    }
}
EOF

sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/yogi-blevins /etc/nginx/sites-enabled/

echo "=== Testing nginx configuration ==="
sudo nginx -t

echo "=== Restarting nginx ==="
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "=== Setting up PM2 startup ==="
pm2 startup systemd -u $USER --hp /home/$USER
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER

echo "=== Configuring firewall ==="
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

echo ""
echo "=========================================="
echo "Basic setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Set up SSL certificate (after DNS is configured):"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "2. Add these secrets to your GitHub repository:"
echo "   - DROPLET_HOST: Your droplet's IP address"
echo "   - DROPLET_USER: Your SSH username (usually 'root' or your username)"
echo "   - DROPLET_SSH_KEY: Your private SSH key (the entire key content)"
echo "   - DROPLET_SSH_PORT: SSH port (usually 22)"
echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID: xyhoulob (or your Sanity project ID)"
echo "   - NEXT_PUBLIC_SANITY_DATASET: production (or your dataset name)"
echo ""
echo "3. Generate a deploy key for GitHub:"
echo "   ssh-keygen -t ed25519 -C 'github-deploy-key' -f ~/.ssh/github_deploy"
echo "   cat ~/.ssh/github_deploy.pub"
echo "   (Add the public key as a Deploy Key in your GitHub repo settings)"
echo "   (Add the private key as DROPLET_SSH_KEY secret in GitHub)"
echo ""
echo "4. Push to your main branch to trigger a deployment!"
echo ""

