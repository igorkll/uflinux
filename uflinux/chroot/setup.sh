#!/bin/sh
set -e

DEBUG=true

if [ "$DEBUG" = "true" ]; then
    # ------------ set root password (for debug)
    echo "root:root" | chpasswd
    usermod -s /bin/bash root
else
    # ------------ disable getty
    systemctl mask getty.target
end

# ------------ create user
useradd -m -s /bin/bash user
usermod -aG video,input,audio,render user
if [ "$DEBUG" = "true" ]; then
    echo "user:user" | chpasswd
else
    passwd -d user
fi

# ------------ setup DE
if [ "$DEBUG" != "true" ]; then
    systemctl enable sddm
    echo "sddm shared/default-display-manager select sddm" | debconf-set-selections
    systemctl set-default graphical.target
fi

# ------------ remove trash
