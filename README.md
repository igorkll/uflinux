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
* all external media is mounted via "bindfs" so that all files are perceived as 777 and everything is accessible without root
* the user can't customize anything, everything is nailed down and the system can't be changed
### philosophy
* each device (including PC) is updated separately with single updates FROM THE DEVICE MANUFACTURER and not from the OS author. updates are never made in single packages, this is always the case: the manufacturer has assembled a new image separately for each device and distributed
* each system image is already supplied with embedded drivers for a specific device, the drivers are updated in a single way along with the OS itself with updates from the device manufacturer
* user != an expert. in this OS, the user will never see the terminal (he does not know what a terminal is at all), he will never change the configs himself (he does not know about their existence)
* administrator != root. root access is simply not available here

## for whom is this distribution probably not suitable
* i want complete freedom and flexibility in configuration: no, uflinux is specially designed so as not to give the user the opportunity to break anything, you will not be able to fine-tune anything here
* i want freedom and to do what I want with my OS: no, uflinux does not give you the opportunity to "do what you want", it does not give root access and flexible settings

## important
* currently, the OS does not support OTA updates