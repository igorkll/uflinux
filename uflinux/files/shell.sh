#!/bin/bash

export DISPLAY=:0
export WAYLAND_DISPLAY=wayland-0

startplasma-wayland

while :; do
    sleep 1
done
