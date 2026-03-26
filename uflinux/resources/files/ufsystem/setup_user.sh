#!/bin/bash

if [ "$EUID" -eq 0 ]; then
    SCOPE="--system"
else
    SCOPE="--user"
fi

flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak override "$SCOPE" --unshare=network --disallow=all
