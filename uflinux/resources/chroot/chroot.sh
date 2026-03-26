#!/bin/bash
set -e

apt update

# -------------------------------- node packages

reset
echo install npm packages

npm install -g electron@39.2.7
npm install -g ini@6.0.0
chmod 4755 /usr/local/lib/node_modules/electron/dist/chrome-sandbox

# -------------------------------- install waydroid

reset
echo install waydroid

# apt install curl ca-certificates -y
# curl -s https://repo.waydro.id | bash
# apt update
# apt install waydroid -y
# waydroid init
# waydroid init -s GAPPS

# -------------------------------- install wine

reset
echo install wine

dpkg --add-architecture i386
apt update
apt install wine

# -------------------------------- setup user

reset
echo setup user

/ufsystem/setup_user.sh

# -------------------------------- install liamounts

reset
echo install liamounts

wget https://github.com/igorkll/liamounts/archive/refs/tags/2.0.tar.gz
tar -xzf 2.0.tar.gz
cd liamounts-2.0
chmod +x install.sh
./install.sh
cd ..
rm -rf liamounts-2.0

# -------------------------------- cleanup

touch /.chrootend