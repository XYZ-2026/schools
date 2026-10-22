#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# CLARVO — Production VPS Deployment Script
# ═══════════════════════════════════════════════════════════════
set -e

# Default host port mapping on VPS (avoids 3000, 3001, 3002, 3008, 5432, 8000, 8001, 8002)
export APP_PORT=${APP_PORT:-3005}

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}        CLARVO — Automated VPS Deployment           ${NC}"
echo -e "${BLUE}====================================================${NC}"

# 1. Check for Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[ERROR] Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Detect docker compose syntax
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    echo -e "${RED}[ERROR] Neither 'docker compose' nor 'docker-compose' found.${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] Docker and Compose found: ${COMPOSE_CMD}${NC}"

# 2. Check environment file
if [ ! -f .env.local ] && [ ! -f .env ]; then
    echo -e "${YELLOW}[WARNING] No .env.local or .env file found!${NC}"
    echo -e "${YELLOW}Creating default .env.local with configured credentials...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env.local
    fi
fi

# 3. Pull latest code (if inside a git repository)
if [ -d .git ]; then
    echo -e "${BLUE}[+] Pulling latest changes from git repository...${NC}"
    git pull origin main || git pull || echo -e "${YELLOW}[!] Git pull skipped or failed, proceeding with local files.${NC}"
fi

# 4. Check occupied ports on host
echo -e "${BLUE}[+] Checking host port ${APP_PORT}...${NC}"
if command -v netstat &> /dev/null; then
    if netstat -tuln | grep -q ":${APP_PORT} "; then
        echo -e "${YELLOW}[!] Note: Port ${APP_PORT} is currently active. If it belongs to an old container, it will be updated.${NC}"
    fi
fi

# 5. Build and launch containers
echo -e "${BLUE}[+] Building and starting container on host port ${APP_PORT} -> container port 3000...${NC}"
${COMPOSE_CMD} down --remove-orphans || true
${COMPOSE_CMD} up -d --build

# 6. Wait for health check
echo -e "${BLUE}[+] Waiting for container health check...${NC}"
sleep 5

MAX_RETRIES=15
COUNTER=0
SUCCESS=false

while [ $COUNTER -lt $MAX_RETRIES ]; do
    if curl -s "http://127.0.0.1:${APP_PORT}" > /dev/null 2>&1; then
        SUCCESS=true
        break
    fi
    COUNTER=$((COUNTER + 1))
    echo -e "${YELLOW}[.] Waiting for server response (${COUNTER}/${MAX_RETRIES})...${NC}"
    sleep 3
done

if [ "$SUCCESS" = true ]; then
    echo -e "${GREEN}====================================================${NC}"
    echo -e "${GREEN}   CLARVO Successfully Deployed!                   ${NC}"
    echo -e "${GREEN}====================================================${NC}"
    echo -e "Container Name : clarvo-web-app"
    echo -e "Host Port      : ${APP_PORT} (Internal: 3000)"
    echo -e "Local Access   : http://127.0.0.1:${APP_PORT}"
    echo -e "VPS Access     : http://<YOUR_VPS_IP>:${APP_PORT}"
    echo -e ""
    echo -e "${BLUE}To view logs, run:${NC} ${COMPOSE_CMD} logs -f"
else
    echo -e "${YELLOW}[!] Container is running, but initial curl probe timed out.${NC}"
    echo -e "${BLUE}Check logs with:${NC} ${COMPOSE_CMD} logs --tail 50"
fi
