# CLARVO — Production VPS Deployment Guide

This guide explains how to deploy **CLARVO** to your VPS using Docker and Docker Compose.

---

## 1. Port Architecture & Conflicts Avoided

Your server currently has the following ports occupied:
> `3000`, `3001`, `3002`, `3008`, `5432`, `8000`, `8001`, `8002`

### Port Allocation:
- **Inside the Docker container**: Runs on port `3000` (Next.js default internal runtime).
- **On the VPS Host**: Mapped to port **`3005`** (`3005:3000`).
- **Nginx Reverse Proxy**: Forwards public traffic (`80`/`443` -> `http://127.0.0.1:3005`).

---

## 2. Server Prerequisites (Ubuntu / Debian VPS)

If your VPS does not yet have Docker installed, install it with:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker & Docker Compose Plugin
sudo apt install -y docker.io docker-compose-v2 curl git

# Start and enable Docker
sudo systemctl enable --now docker

# Optional: Allow running docker without sudo
sudo usermod -aG docker $USER
newgrp docker
```

---

## 3. Deployment Steps on VPS

### Step 1: Clone the Repository to your VPS
```bash
cd /var/www  # or your preferred folder
git clone <YOUR_GIT_REPOSITORY_URL> clarvo
cd clarvo
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local` (or verify that `.env.local` contains your Firebase and Wix credentials):
```bash
cp .env.example .env.local
```

Verify that `APP_PORT=3005` in `.env.local` or leave it to the default.

### Step 3: Run the Automated Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

The script will automatically:
1. Verify Docker and Compose installations.
2. Build the multi-stage production Docker image (`node:22-alpine` with Next.js standalone output).
3. Bind the container's internal `3000` port to host port **`3005`**.
4. Run health check probes to ensure the server is serving traffic.

---

## 4. Nginx Reverse Proxy Setup (Domain & SSL)

To connect your domain (e.g. `clarvo.in` or `schools.yourdomain.com`) to port `3005`:

### 1. Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/clarvo
```

Paste the following block (replace `yourdomain.com` with your real domain):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. Enable Site and Test Nginx
```bash
sudo ln -s /etc/nginx/sites-available/clarvo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Install Free SSL with Let's Encrypt Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 5. Important: Firebase Authorized Domains

When deploying to a custom domain or VPS IP:
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project **`clarvo-6b20b`**.
3. Go to **Authentication** > **Settings** > **Authorized Domains**.
4. Click **Add Domain** and add:
   - Your domain (e.g. `yourdomain.com`)
   - Your VPS public IP address (for testing before domain connection)

---

## 6. Daily Maintenance & Useful Commands

| Task | Command |
|---|---|
| **View Live Container Logs** | `docker compose logs -f` |
| **Check Container Status** | `docker compose ps` |
| **Restart Application** | `docker compose restart` |
| **Stop Application** | `docker compose down` |
| **Deploy New Updates** | `./deploy.sh` (or `git pull && docker compose up -d --build`) |

---

## 7. Running Locally (Localhost)

- **Normal Next.js Dev Server**:
  ```bash
  npm run dev
  # Runs directly on http://localhost:3000
  ```

- **Local Docker Test**:
  ```bash
  docker compose up -d --build
  # Runs containerized on http://localhost:3005
  ```
