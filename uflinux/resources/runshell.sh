#!/bin/bash

if [ ! -f /data/init.flag ]; then
    /ufsystem/setup_user.sh
    touch /data/init.flag
fi

electron /ufsystem/shell lockscreen --enable-gpu-rasterization --ignore-gpu-blocklist --ozone-platform=wayland --enable-features=UseOzonePlatform --user-data-dir=/data/electron
electron /ufsystem/shell shell --enable-gpu-rasterization --ignore-gpu-blocklist --ozone-platform=wayland --enable-features=UseOzonePlatform --user-data-dir=/data/electron
