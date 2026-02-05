#!/bin/bash

DEV="$1"

sleep 2

MOUNTPOINT=$(findmnt -rn -S "$DEV" -o TARGET)
[ -z "$MOUNTPOINT" ] && exit 0

mkdir -m 000 -p "$MOUNTPOINT.orig"
mount --bind "$MOUNTPOINT" "$MOUNTPOINT.orig"
umount "$MOUNTPOINT"

bindfs \
  -u 0 \
  -g 0 \
  -p 777 \
  --create-for-user=0 \
  --create-for-group=0 \
  --chmod-ignore \
  "$MOUNTPOINT.orig" "$MOUNTPOINT"
