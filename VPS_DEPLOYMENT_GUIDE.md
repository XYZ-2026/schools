# CLARVO — Production VPS Deployment Guide (`schools.clarvo.in`)

This guide explains how to deploy **CLARVO** to your VPS under the subdomain **`schools.clarvo.in`** using Docker, Docker Compose, and Nginx.

---

## 1. Architecture & Port Mapping

Your VPS currently has existing services occupying the following ports:
> `3000`, `3001`, `3002`, `3008`, `5432`, `8000`, `8001`, `8002`

### Safe Port Strategy:
- **Inside the Docker container**: Runs Next.js internally on port `3000`.
- **On the VPS Host**: Mapped to host port **`3005`** (`3005:3000`).
- **Nginx Reverse Proxy**: Receives public traffic for **`schools.clarvo.in`** on standard web ports (`80` / `443`) and securely proxies to `http://127.0.0.1:3005`.

---

## 2. DNS Configuration (Domain Registrar / Cloudflare)

Log in to your DNS provider (GoDaddy, Namecheap, Hostinger, Cloudflare, etc.) where `clarvo.in` is managed and add the DNS record for the **`schools`** subdomain:

| Type | Name / Subdomain | Target / Value | TTL |
|---|---|---|---|
| **A** | `schools` | `<YOUR_VPS_PUBLIC_IP>` | Auto / 300 |

*(Alternatively, if you already have an A record for `clarvo.in` pointing to this VPS IP, you can also add a **CNAME** record with Name: `schools` and Value: `clarvo.in`)*

> [!NOTE]
> DNS propagation typically takes 5 to 30 minutes. You can test it from your computer or VPS:
> ```bash
> ping schools.clarvo.in
> # Or using dig:
> dig +short schools.clarvo.in
> ```

---

## 3. Firebase Console Configuration

Because user authentication is restricted to approved domains for security, add `schools.clarvo.in` to Firebase:

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project **`clarvo-6b20b`**.
3. In the left navigation, go to **Build** > **Authentication**.
4. Open the **Settings** tab > select **Authorized Domains**.
5. Click **Add Domain** and add:
   - **`schools.clarvo.in`**
   - `<YOUR_VPS_PUBLIC_IP>` *(Optional: for testing direct IP access before DNS propagates)*

---

## 4. VPS Prerequisites (Ubuntu / Debian)

If your VPS does not have Docker or Nginx installed yet:

```bash
# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 2. Install Docker, Docker Compose, Nginx, and Certbot
sudo apt install -y docker.io docker-compose-v2 nginx certbot python3-certbot-nginx curl git

# 3. Enable and start Docker & Nginx
sudo systemctl enable --now docker
sudo systemctl enable --now nginx

# 4. Optional: Allow running docker commands without 'sudo'
sudo usermod -aG docker $USER
newgrp docker
```

---

## 5. Deploying the Application

### Step 1: Clone / Pull the Code
```bash
# Navigate to your web directory
cd /var/www

# Clone your repository (if first time)
git clone <YOUR_GIT_REPOSITORY_URL> clarvo
cd clarvo

# Or pull latest changes (if already cloned)
git pull origin main
```

### Step 2: Configure Environment Variables
Verify your production `.env.local` exists in `/var/www/clarvo/.env.local`. If creating a new one:
```bash
cp .env.example .env.local
```
Ensure your Firebase and Wix credentials are present in `.env.local`:
```ini
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA3dOHBSLySQQ9su4o8A7Cd17MRMdrfAJw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=clarvo-6b20b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=clarvo-6b20b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=clarvo-6b20b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=816889517016
NEXT_PUBLIC_FIREBASE_APP_ID=1:816889517016:web:e280c357c025f27c8398ad

# Host port mapping (avoids busy ports 3000, 3001, 3002)
APP_PORT=3005
```

### Step 3: Run the Automated Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

The script will automatically:
- Build the optimized production Docker image (`node:22-alpine` with Next.js standalone output).
- Bind the internal Next.js server to host port **`3005`**.
- Run health checks and confirm the container is healthy.

---

## 6. Nginx Reverse Proxy for `schools.clarvo.in`

A pre-configured production Nginx file is included in [`nginx/schools.clarvo.in.conf`](file:///c:/Users/saira/Downloads/Schools/nginx/schools.clarvo.in.conf).

### Step 1: Install Nginx Configuration
```bash
sudo cp nginx/schools.clarvo.in.conf /etc/nginx/sites-available/schools.clarvo.in
sudo ln -sf /etc/nginx/sites-available/schools.clarvo.in /etc/nginx/sites-enabled/
```

### Step 2: Test & Reload Nginx
```bash
# Test configuration syntax
sudo nginx -t

# Reload Nginx service
sudo systemctl reload nginx
```

---

## 7. Free SSL Certificate with Let's Encrypt (HTTPS)

Run Certbot to obtain free SSL certificates with automated renewals:

```bash
sudo certbot --nginx -d schools.clarvo.in
```

When prompted:
1. Enter your email for urgent renewal and security notices.
2. Agree to the Terms of Service (`Y`).
3. Certbot will automatically install the certificate, configure SSL protocols, and set up HTTP -> HTTPS automatic redirection.

Test automatic SSL renewal:
```bash
sudo certbot renew --dry-run
```

Your site is now live at **https://schools.clarvo.in**!

---

## 8. Daily Operations & Useful Commands

| Action | Command |
|---|---|
| **View Live Container Logs** | `docker compose logs -f` |
| **Check Container Health** | `docker compose ps` |
| **Restart Container** | `docker compose restart` |
| **Stop Container** | `docker compose down` |
| **Deploy Code Updates** | `./deploy.sh` *(or `git pull && docker compose up -d --build`)* |
| **Check Nginx Status** | `sudo systemctl status nginx` |
| **Reload Nginx** | `sudo systemctl reload nginx` |
| **Test Nginx Config** | `sudo nginx -t` |

---

## 9. Troubleshooting

- **502 Bad Gateway**:
  Make sure the Docker container is running on port 3005:
  ```bash
  docker compose ps
  curl -I http://127.0.0.1:3005
  ```
- **Subdomain not resolving**:
  Check DNS propagation using `dig +short schools.clarvo.in`. Ensure the `A` record for `schools` points to your VPS IP.
- **Firebase Auth Error (unauthorized-domain)**:
  Ensure `schools.clarvo.in` is listed under Firebase Console > Authentication > Settings > Authorized Domains.
