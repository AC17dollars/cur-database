#!/bin/bash

# Function to install packages based on the distribution
install_packages() {
  local distro=$1
  shift

  case $distro in
    "debian" | "ubuntu")
      if command -v sudo &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y "$@"
      else
        echo "Sudo is not available. Please install packages manually."
        exit 1
      fi
      ;;
    "arch" | "manjaro")
      if command -v sudo &> /dev/null; then
        sudo pacman -Sy --noconfirm "$@"
      else
        echo "Sudo is not available. Please install packages manually."
        exit 1
      fi
      ;;
    *)
      echo "Unsupported distribution: $distro"
      exit 1
      ;;
  esac
}

# git check
if ! command -v git &> /dev/null; then
  echo "Git is not installed. Installing..."

  # package manager
  if [ -f /etc/os-release ]; then
    . /etc/os-release
    distro=$ID

    install_packages "$distro" "git"
  else
    echo "Unable to determine the current distribution. Please install git manually."
    exit 1
  fi
fi

# Git clone
if [ -d "cur-database" ]; then
    cd cur-database/backend || exit 1
    git pull || { echo "Failed to update the repository."; exit 1; }
else
    echo "Git repository does not exist. Cloning the repository..."
    git clone --recursive "https://github.com/AC17dollars/cur-database.git" || { echo "Failed to clone the repository."; exit 1; }
    cd cur-database/backend
fi


# User input
read -p "Enter the database URL (postgres://username:password@hostname/database): " db_url

# Parse username, password, hostname, and database from the URL
username=$(echo "$db_url" | sed -n 's/.*\/\/\(.*\):.*@.*/\1/p')
password=$(echo "$db_url" | sed -n 's/.*\/\/.*:\(.*\)@.*/\1/p')
hostname=$(echo "$db_url" | sed -n 's/.*@\(.*\)\/.*/\1/p')
database=$(echo "$db_url" | sed -n 's/.*\/\(.*\)$/\1/p')

# Create a .env file
echo "PORT=3210
PG_HOST=$hostname
PG_PORT=5432
PG_USER=$username
PG_PASSWORD=$password
PG_DATABASE=$database" > .env

# Check for nodejs and npm
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
  echo "Node.js or npm is not installed. Installing..."

  if [ -f /etc/os-release ]; then
    . /etc/os-release
    distro=$ID

    install_packages "$distro" "nodejs" "npm"
  else
    echo "Unable to determine the current distribution. Please install nodejs and npm manually."
    exit 1
  fi
fi

# Run the command 'npm run test'
npm install
npm run test