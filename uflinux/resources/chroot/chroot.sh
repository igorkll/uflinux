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

# -------------------------------- weston lua shell

wget -O weston-based-custom-shell.zip https://github.com/igorkll/weston-based-custom-shell/archive/refs/tags/0.3.zip

mkdir -p weston-based-custom-shell
bsdtar -xf weston-based-custom-shell.zip -C weston-based-custom-shell --strip-components=1
cd weston-based-custom-shell

./install_weston_configuration.sh

cd ..
rm weston-based-custom-shell.zip
rm -rf weston-based-custom-shell

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

# dpkg --add-architecture i386
# apt update
# apt install wine -y

# -------------------------------- cleanup

reset
echo cleanup

apt purge gcc -y
apt purge build-essential -y
apt purge libc6-dev -y
apt autoremove -y

# --------------------------------

touch /.chrootend