#!/bin/bash
# Setup Appwrite Database and Test User for Vergabebausteine Dashboard

GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${CYAN}=== Vergabebausteine Appwrite Setup ===${NC}\n"

# Load environment variables from parent directory
if [ -f "../.env" ]; then
    export $(grep -v '^#' ../.env | grep 'APPWRITE_PROJECT_ID=\|APPWRITE_API_KEY=\|APPWRITE_ENDPOINT=' | xargs)
    echo -e "${GREEN}✓ Environment variables loaded${NC}"
else
    echo -e "${RED}✗ .env file not found in parent directory${NC}"
    exit 1
fi

ENDPOINT="${APPWRITE_ENDPOINT}"
PROJECT_ID="${APPWRITE_PROJECT_ID}"
API_KEY="${APPWRITE_API_KEY}"

echo -e "${CYAN}Project: ${PROJECT_ID}${NC}"
echo -e "${CYAN}Endpoint: ${ENDPOINT}${NC}\n"

# Step 1: Create Database
echo -e "${YELLOW}Step 1: Creating 'main' database...${NC}"
DB_RESPONSE=$(curl -s -X POST \
  "${ENDPOINT}/databases" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: ${PROJECT_ID}" \
  -H "X-Appwrite-Key: ${API_KEY}" \
  -d '{
    "databaseId": "main",
    "name": "Main Database"
  }')

if echo "$DB_RESPONSE" | grep -q '"$id"'; then
    DB_ID=$(echo "$DB_RESPONSE" | jq -r '.$id' 2>/dev/null || echo "main")
    echo -e "${GREEN}✓ Database created: ${DB_ID}${NC}"
else
    if echo "$DB_RESPONSE" | grep -q "already exists"; then
        echo -e "${YELLOW}⚠ Database 'main' already exists${NC}"
        DB_ID="main"
    else
        echo -e "${RED}✗ Failed to create database${NC}"
        echo "$DB_RESPONSE" | jq '.' 2>/dev/null || echo "$DB_RESPONSE"
        exit 1
    fi
fi

# Step 2: Create Users Collection
echo -e "\n${YELLOW}Step 2: Creating 'users' collection...${NC}"
COLL_RESPONSE=$(curl -s -X POST \
  "${ENDPOINT}/databases/${DB_ID}/collections" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: ${PROJECT_ID}" \
  -H "X-Appwrite-Key: ${API_KEY}" \
  -d '{
    "collectionId": "users",
    "name": "Users",
    "permissions": [
      "read(\"any\")",
      "create(\"users\")",
      "update(\"users\")",
      "delete(\"users\")"
    ],
    "documentSecurity": true
  }')

if echo "$COLL_RESPONSE" | grep -q '"$id"'; then
    COLL_ID=$(echo "$COLL_RESPONSE" | jq -r '.$id' 2>/dev/null || echo "users")
    echo -e "${GREEN}✓ Collection created: ${COLL_ID}${NC}"
else
    if echo "$COLL_RESPONSE" | grep -q "already exists"; then
        echo -e "${YELLOW}⚠ Collection 'users' already exists${NC}"
        COLL_ID="users"
    else
        echo -e "${RED}✗ Failed to create collection${NC}"
        echo "$COLL_RESPONSE" | jq '.' 2>/dev/null || echo "$COLL_RESPONSE"
    fi
fi

# Step 3: Add attributes to collection
echo -e "\n${YELLOW}Step 3: Adding attributes to users collection...${NC}"

# Name attribute
curl -s -X POST \
  "${ENDPOINT}/databases/${DB_ID}/collections/${COLL_ID}/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: ${PROJECT_ID}" \
  -H "X-Appwrite-Key: ${API_KEY}" \
  -d '{
    "key": "name",
    "size": 255,
    "required": true
  }' > /dev/null

echo -e "${GREEN}  ✓ Added 'name' attribute${NC}"

# Email attribute
curl -s -X POST \
  "${ENDPOINT}/databases/${DB_ID}/collections/${COLL_ID}/attributes/email" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: ${PROJECT_ID}" \
  -H "X-Appwrite-Key: ${API_KEY}" \
  -d '{
    "key": "email",
    "required": true
  }' > /dev/null

echo -e "${GREEN}  ✓ Added 'email' attribute${NC}"

# Role attribute
curl -s -X POST \
  "${ENDPOINT}/databases/${DB_ID}/collections/${COLL_ID}/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: ${PROJECT_ID}" \
  -H "X-Appwrite-Key: ${API_KEY}" \
  -d '{
    "key": "role",
    "size": 50,
    "required": false,
    "default": "user"
  }' > /dev/null

echo -e "${GREEN}  ✓ Added 'role' attribute${NC}"

echo -e "${YELLOW}⏳ Waiting for attributes to be available...${NC}"
sleep 3

# Step 4: Create test user account
echo -e "\n${YELLOW}Step 4: Creating test user account...${NC}"
USER_RESPONSE=$(curl -s -X POST \
  "${ENDPOINT}/users" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: ${PROJECT_ID}" \
  -H "X-Appwrite-Key: ${API_KEY}" \
  -d '{
    "userId": "unique()",
    "email": "test@vergabebausteine.de",
    "password": "password123",
    "name": "Test User"
  }')

if echo "$USER_RESPONSE" | grep -q '"$id"'; then
    USER_ID=$(echo "$USER_RESPONSE" | jq -r '.$id' 2>/dev/null)
    echo -e "${GREEN}✓ Test user created${NC}"
    echo -e "${CYAN}  Email: test@vergabebausteine.de${NC}"
    echo -e "${CYAN}  Password: password123${NC}"
    echo -e "${CYAN}  User ID: ${USER_ID}${NC}"
else
    if echo "$USER_RESPONSE" | grep -q "already exists"; then
        echo -e "${YELLOW}⚠ Test user already exists${NC}"
        echo -e "${CYAN}  Email: test@vergabebausteine.de${NC}"
        echo -e "${CYAN}  Password: password123${NC}"
    else
        echo -e "${RED}✗ Failed to create test user${NC}"
        echo "$USER_RESPONSE" | jq '.' 2>/dev/null || echo "$USER_RESPONSE"
    fi
fi

# Summary
echo -e "\n${GREEN}=== Setup Complete ===${NC}\n"
echo -e "${CYAN}Database ID:${NC} main"
echo -e "${CYAN}Collection ID:${NC} users"
echo -e "${CYAN}Test User:${NC} test@vergabebausteine.de"
echo -e "${CYAN}Password:${NC} password123\n"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Start the dashboard: ${GREEN}npm run dev${NC}"
echo -e "  2. Open: ${GREEN}http://localhost:5174${NC}"
echo -e "  3. Login with test credentials\n"
