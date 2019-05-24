# Instapy Dashboard Multi Server

This project fork from [https://github.com/converge/instapy-dashboard](https://github.com/converge/instapy-dashboard)

## Screenshot:

Dashboard:
![gif](https://github.com/trungpv1601/instapy-dashboard-multi-server/blob/master/screenshots/dashboard.gif)

## MacOS Install

### 1. Install Project Dependencies:

```bash
# brew install
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# node, npm and git install
brew install node npm git
```

### 2. Install InstaPy-Dashboard-Multi-Server

```bash
git clone https://github.com/trungpv1601/instapy-dashboard-multi-server.git
cd instapy-dashboard-multi-server
npm install
```

## Linux Install

### 1. Install Project Dependencies:

```bash
# node and npm
sudo apt-get update ; sudo apt-get install nodejs npm git

# Debian is still using a very old version of nodejs, update/install it:
# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt-get install -y nodejs
```

### 2. Install InstaPy-Dashboard-Multi-Server

```bash
git clone https://github.com/trungpv1601/instapy-dashboard-multi-server.git
cd instapy-dashboard-multi-server
npm install
```

## Windows Install

### 1. Install Project Dependencies:

**Official documentation from** https://www.npmjs.com/package/npm

#### Super Easy Install

npm is bundled with node.

[Get the MSI](https://nodejs.org/en/download/). npm is in it.

### 2. Install InstaPy-Dashboard

```bash
git clone https://github.com/trungpv1601/instapy-dashboard-multi-server.git
cd instapy-dashboard-multi-server
npm install
```

## Project Setup

Change Server info in **src/config.js**

```js
// Child Server Setup https://github.com/converge/instapy-dashboard
const SERVERS = ['http://x.x.x.x:3001', 'http://x.x.x.x:3001'];
export default { SERVERS };
```

## Start the project

```bash
npm start
```

### Load the dashboard at http://localhost:3000
