# uflinux: user-friendly linux
this is the most userfriendly distribution  
this will be the linux of the future  
provides an android-like experience but is not android, the distribution is based on debian  
the distribution is suitable for: computers, laptops, tablets, smartphones, embedded  
the distribution can be comfortably used by people who have no idea what linux is  
i'm making this distribution to gain experience in linux before developing a more scalable SkyOS project that should completely lose compatibility with gnu/linux software and switch to an electron applications and its own framework

## build system
https://github.com/igorkll/syslbuild

## what has been changed compared to traditional linux
### kernel / boot
* virtual TTY have been deleted
* sysrq is disabled
* ctrl+alt+del is disabled
* the log is not displayed on the screen during the boot
* there is no bootloader menu and it is impossible to get into the bootloader somehow
* at the first boot, the system increases the size of the data partition to the maximum possible. since the OS is being built in an image format for writing to disk, and I do not know what disk size it will be written to
### filesystem
* the filesystem here is immutable, but the data is actually on the same partition, just in a different directory
* in fact, the file system has this structure:
```
/storage - directories for data that is connected using bindings
/rootfs - an immutable rootfs from which the system is boot
```
* the "/" path actually allows you to access the "/rootfs" directory, and the real file system is accessed via the "/realrootroot" path.
* you do not need to use "/realrootroot" directly, all binds have already been made and the storage directories are mounted in the filesystem directories
### userspace
* there is no terminal
* the "/var" directory is mounted as tmpfs and its contents are reset on shutdown
* getty has been disabled
* there is no multiuser system
* there is no root access here
* there is no package manager that modifies rootfs and runs from root
* all external media is mounted via "bindfs" so that all files are perceived as 777 and everything is accessible without root
* all external media are mounted with "sync" so as not to lose data
* the user can't customize anything, everything is nailed down and the system can't be changed
* by default, the system uses a Windows-compatible time format
### philosophy
* each device (including PC) is updated separately with single updates FROM THE DEVICE MANUFACTURER and not from the OS author. updates are never made in single packages, this is always the case: the manufacturer has assembled a new image separately for each device and distributed (currently, OTA updates have not been implemented yet)
* each system image is already supplied with embedded drivers for a specific device, the drivers are updated in a single way along with the OS itself with updates from the device manufacturer
* user != an expert. in this OS, the user will never see the terminal (he does not know what a terminal is at all), he will never change the configs himself (he does not know about their existence)
* administrator != root. root access is simply not available here
### power behavior
* when you close the laptop lid, the screen simply goes out, but it will never turn off on its own or go into sleep mode.
* pressing the power button once turns off the screen
* when you hold it down, the Power management menu appears

## for whom is this distribution probably not suitable
* i want complete freedom and flexibility in configuration: no, uflinux is specially designed so as not to give the user the opportunity to break anything, you will not be able to fine-tune anything here
* i want freedom and to do what I want with my OS: no, uflinux does not give you the opportunity to "do what you want", it does not give root access and flexible settings
