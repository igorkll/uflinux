#!/bin/sh

# this script runs before the initialization system in the initramfs environment. at this point, the switch_root has not yet occurred and the real root is mounted in "/root"

if [ ! -d /root/data/home ]; then
    cp -a /root/home /root/data/home
fi

/nativemount --bind /root/data/home /root/home
