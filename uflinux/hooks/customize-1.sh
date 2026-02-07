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

    local tmp
    tmp=$(mktemp -d)

    cp -r "$src"/. "$tmp"/
    chown -R 0:0 "$tmp"
    chmod -R 1755 "$tmp"
    chmod --reference="$src" "$tmp"
    chown --reference="$src" "$tmp"

    mkdir -p "$dst"
    cp "$tmp" "$dst"

    rm -rf "$tmp"
}

# ----------------- copy files
install_dir "files/bootlogo" "$1/usr/share/plymouth/themes/bootlogo"
install_dir "files/embedded-plymouth/amd64" "$1"

# ----------------- chroot scripts
run_in_chroot "$1" hooks/chroot/boot_logo.sh
