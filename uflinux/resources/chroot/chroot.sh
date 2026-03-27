#!/bin/bash
set -e

apt update

# -------------------------------- debug

if [ -e /uflinux_debug.flag ]; then
    apt install sudo -y
    usermod -aG sudo user
    cat > /usr/share/applications/weston-terminal.desktop <<EOF
[Desktop Entry]
Name=Terminal
Exec=weston-terminal
Terminal=false
Type=Application
EOF
fi

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
apt install wine -y

# -------------------------------- setup user

reset
echo setup user

/ufsystem/setup_user.sh

# -------------------------------- install liamounts

reset
echo install liamounts

wget https://github.com/igorkll/liamounts/archive/refs/tags/2.1.tar.gz
tar -xzf 2.1.tar.gz
cd liamounts-2.1
chmod +x install.sh
set +e
./install.sh
set -e
cd ..
rm -rf liamounts-2.1

# -------------------------------- cleanup

cp -a /home /data/
rm -rf /home
mkdir -m 755 /home

apt purge gcc -y
apt purge build-essential -y
apt purge libc6-dev -y
apt autoremove -y

# --------------------------------

touch /.chrootend