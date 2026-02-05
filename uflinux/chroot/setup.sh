#!/bin/sh
set -e

# ------------ set root password (for debug)
echo "root:root" | chpasswd
usermod -s /bin/bash root

# ------------ disable getty
# systemctl mask getty.target

# ------------ create user
useradd -m -s /shell.sh user
usermod -aG video,input,audio,render user
# passwd -d user
echo "user:user" | chpasswd

# ------------ remove trash
