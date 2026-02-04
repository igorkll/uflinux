#!/bin/sh

# set root password (for debug)
echo "root:root" | chpasswd
usermod -s /bin/bash root

# disable getty
# systemctl mask getty.target

# create user
useradd -m -s /bin/bash user
usermod -aG video,input,audio,render user
passwd -d user
loginctl enable-linger user

# install DE
apt install --no-install-recommends \
  plasma-workspace \
  plasma-workspace-wayland \
  kwin-wayland \
  plasma-session

# setup DE
systemctl set-default graphical.target
systemctl enable shell.service
apt purge baloo-file
