#!/bin/bash

DEV="$1"

MOUNTDIR_REAL="/system/media"
MOUNTDIR_USER="/run/media"

if [ ! -d "$MOUNTDIR_REAL" ]; then
    mkdir -p "$MOUNTDIR_REAL"
    mount -t tmpfs -o size=100M tmpfs "$MOUNTDIR_REAL"
fi

if [ ! -d "$MOUNTDIR_USER" ]; then
    mkdir -p "$MOUNTDIR_USER"
fi

MOUNTNAME="$(blkid -s LABEL -o value "$DEV" || echo $(basename $DEV))"
if [ -z "$MOUNTNAME" ]; then
    MOUNTNAME="$(basename $DEV)"
fi

MOUNTPOINT_REAL="${MOUNTDIR_REAL}/${MOUNTNAME}"
MOUNTPOINT_USER="${MOUNTDIR_USER}/${MOUNTNAME}"

mkdir -m 700 -p "$MOUNTPOINT_REAL"

umount "$MOUNTPOINT"

bindfs \
  -u 0 \
  -g 0 \
  -p 777 \
  --create-for-user=0 \
  --create-for-group=0 \
  --chmod-ignore \
  "$MOUNTPOINT.orig" "$MOUNTPOINT"
