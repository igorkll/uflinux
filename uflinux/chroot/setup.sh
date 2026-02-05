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

# remove documentation
rm -rf /usr/share/man
rm -rf /usr/share/doc
rm -rf /usr/share/info

# remove package manager
rm -f /usr/bin/apt*
rm -f /usr/bin/dpkg*
rm -rf /usr/lib/apt
rm -rf /usr/lib/dpkg
rm -rf /usr/share/dpkg
rm -rf /var/lib/apt
rm -rf /var/lib/dpkg
rm -rf /etc/apt
rm -rf /etc/dpkg
