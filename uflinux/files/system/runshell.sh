#!/bin/bash

if [ -d "/uflinux_debug.flag" ]; then
    weston-terminal
fi

electron /system/shell --enable-features=UseOzonePlatform --ozone-platform=wayland
