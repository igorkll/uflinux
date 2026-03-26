#!/bin/bash
set -e

# -------------------------------- node packages

npm install -g electron@39.2.7
npm install -g ini@6.0.0
chmod 4755 /usr/local/lib/node_modules/electron/dist/chrome-sandbox

# --------------------------------

/ufsystem/setup_user.sh


touch /.chrootend