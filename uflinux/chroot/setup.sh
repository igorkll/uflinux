#!/bin/sh
set -e

DEBUG=true

if [ "$DEBUG" = "true" ]; then
    # ------------ set root password (for debug)
    echo "root:root" | chpasswd
    usermod -s /bin/bash root
else
    passwd -l root
    usermod -s /usr/sbin/nologin root
fi

# ------------ disable getty
systemctl disable getty.target
systemctl mask getty.target

systemctl disable getty@tty1.service
systemctl mask getty@tty1.service

systemctl disable getty@tty2.service
systemctl mask getty@tty2.service

systemctl disable getty@tty3.service
systemctl mask getty@tty3.service

systemctl disable getty@tty4.service
systemctl mask getty@tty4.service

systemctl disable getty@tty5.service
systemctl mask getty@tty5.service

systemctl disable getty@tty6.service
systemctl mask getty@tty6.service

chmod -x /sbin/agetty

# ------------ create user
useradd -m -u 10000 -s /bin/bash user
usermod -aG video,input,audio,render user
passwd -d user

if [ "$DEBUG" = "true" ]; then
    usermod -aG sudo user
fi

# ------------ setup DE
systemctl enable sddm
echo "sddm shared/default-display-manager select sddm" | debconf-set-selections
systemctl set-default graphical.target

# ------------ setting the windows compatible time format
ln -sf /usr/share/zoneinfo/UTC /etc/localtime

cat > /etc/adjtime <<'EOF'
0.0 0 0.0
0
LOCAL
EOF

# ------------ disable udisks2

systemctl disable udisks2
systemctl mask udisks2
dpkg --remove --force-depends udisks2

# ------------ setup plymouth

# systemctl disable plymouth-quit.service
# systemctl mask plymouth-quit.service

# systemctl disable plymouth-quit-wait.service
# systemctl mask plymouth-quit-wait.service

# ------------ remove trash

if [ "$DEBUG" != "true" ]; then
    apt remove --purge -y sudo
    apt remove --purge -y nano
fi

# remove documentation
rm -rf /usr/share/man
rm -rf /usr/share/doc
rm -rf /usr/share/info

if [ "$DEBUG" != "true" ]; then
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
fi

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
