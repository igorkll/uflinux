# custom boot logo
plymouth-set-default-theme bootlogo
cp -f /usr/share/plymouth/themes/bootlogo/bootlogo.plymouth /usr/share/plymouth/themes/default.plymouth

# disable auto hide boot logo
rm -f /usr/share/initramfs-tools/scripts/init-bottom/plymouth

# initialization of plymouth to an earlier stage in custom_init.sh
rm -f /usr/share/initramfs-tools/scripts/init-premount/plymouth
