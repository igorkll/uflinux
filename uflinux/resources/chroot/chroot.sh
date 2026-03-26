#!/bin/bash
set -e

# -------------------------------- node packages

npm install -g electron@39.2.7
npm install -g ini@6.0.0
chmod 4755 /usr/local/lib/node_modules/electron/dist/chrome-sandbox

# -------------------------------- flatpak packages

flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

# --------------------------------

/ufsystem/setup_user.sh
touch /.chrootend