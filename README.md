# uflinux
this is the most userfriendly distribution
this will be the linux of the future

## what has been changed compared to traditional linux
### kernel / boot
* virtual TTY have been deleted
* sysrq is disabled
* ctrl+alt+del is disabled
* the log is not displayed on the screen during the boot
### userspace
* getty has been disabled
* there is no package manager that modifies rootfs and runs from root
* all external media is mounted via overlayfs so that all files are perceived as 777 and everything is accessible without root

