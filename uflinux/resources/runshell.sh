#!/bin/bash

if [ ! -f /data/setup_user.flag ]; then
    /ufsystem/setup_user.sh
    touch /data/setup_user.flag
fi

electron /ufsystem/shell --enable-gpu-rasterization --ignore-gpu-blocklist --ozone-platform=wayland --enable-features=UseOzonePlatform --no-sandbox --user-data-dir=/data/electron
