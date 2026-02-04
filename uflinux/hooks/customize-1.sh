run_in_chroot() {
    local CHROOT_PATH="$1"
    local SCRIPT_PATH="$2"

    cp "$SCRIPT_PATH" "$CHROOT_PATH/.build_script" || return 1
    chmod +x "$CHROOT_PATH/.build_script" || return 1
    chroot "$CHROOT_PATH" /bin/bash /.build_script || return 1
    rm -f "$CHROOT_PATH/.build_script"
}

install_dir() {
    local src="$1"
    local dst="$2"

    mkdir -p "$dst"
    cp -r "$src"/. "$dst"/
    chown -R 0:0 "$dst"
    chmod -R 1755 "$dst"
}

# ----------------- copy files
install_dir "files/bootlogo" "$1/usr/share/plymouth/themes/bootlogo"

# ----------------- chroot scripts
run_in_chroot "$1" hooks/chroot/boot_logo.sh
