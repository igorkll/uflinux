#!/bin/bash

/ufsystem/setup_user.sh
electron /ufsystem/shell --enable-gpu-rasterization --ignore-gpu-blocklist --ozone-platform=wayland --enable-features=UseOzonePlatform --no-sandbox --user-data-dir=/data/electron
