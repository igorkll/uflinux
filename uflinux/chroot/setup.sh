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
fi

# ------------ create user
useradd -m -s /bin/bash user
usermod -aG video,input,audio,render user
if [ "$DEBUG" = "true" ]; then
    echo "user:user" | chpasswd
else
    passwd -d user
fi

# ------------ setup DE
systemctl enable sddm
echo "sddm shared/default-display-manager select sddm" | debconf-set-selections
systemctl set-default graphical.target

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

# remove user system
rm -f /usr/sbin/adduser
rm -f /usr/sbin/addgroup
rm -f /usr/sbin/deluser
rm -f /usr/sbin/delgroup
rm -f /usr/sbin/useradd
rm -f /usr/sbin/usermod
rm -f /usr/sbin/userdel
rm -f /etc/default/useradd
rm -rf /etc/skel
