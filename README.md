# uflinux: user-friendly linux
this is the most userfriendly distribution  
this will be the linux of the future  
provides an android-like experience but is not android, the distribution is based on debian  
the distribution is suitable for: computers, laptops, tablets, smartphones, embedded  
the distribution can be comfortably used by people who have no idea what linux is  

## what has been changed compared to traditional linux
### kernel / boot
* virtual TTY have been deleted
* sysrq is disabled
* ctrl+alt+del is disabled
* the log is not displayed on the screen during the boot
* there is no bootloader menu and it is impossible to get into the bootloader somehow
* at the first boot, the system increases the size of the data partition to the maximum possible. since the OS is being built in an image format for writing to disk, and I do not know what disk size it will be written to
### userspace
* there is no terminal
* the "/var" directory is mounted as tmpfs and its contents are reset on shutdown
* getty has been disabled
* there is no multiuser system
* there is no root access here
* there is no package manager that modifies rootfs and runs from root
* all external media is mounted via overlayfs so that all files are perceived as 777 and everything is accessible without root
* the user can't customize anything, everything is nailed down and the system can't be changed

## important
* currently, the OS does not support OTA updates