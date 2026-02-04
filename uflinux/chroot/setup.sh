#!/bin/sh

# disable getty
systemctl mask getty.target

# create user

loginctl enable-linger user

# install DE
apt install --no-install-recommends \
  plasma-workspace \
  plasma-workspace-wayland \
  kwin-wayland \
  plasma-session

# setup DE
systemctl enable shell.service
