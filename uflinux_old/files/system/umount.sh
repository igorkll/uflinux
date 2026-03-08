#!/bin/bash

DEV="$1"

umount -l "$DEV" &
