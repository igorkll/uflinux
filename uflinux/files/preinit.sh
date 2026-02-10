#!/bin/bash

export PATH=/sbin:/usr/sbin:/bin:/usr/bin

mount -o bind /realrootroot/storage/home /home
mount -o bind /realrootroot/storage/data /data
