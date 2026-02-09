{

const applicationsDirs = [
    "/usr/share/applications",
    "/usr/local/share/applications",
    path.join(process.env.HOME || "", ".local/share/applications")
];

window.getAllDesktopFiles = function() {
    const apps = [];

    applicationsDirs.forEach(dir => {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                if (file.endsWith(".desktop")) {
                    apps.push(path.join(dir, file));
                }
            });
        }
    });

    return apps;
}

window.getAllApps = function() {
    const desktopFiles = getAllDesktopFiles()
    const allApps = []

    for (const desktopFile of desktopFiles) {
        allApps.push({
            desktopFile: desktopFile,
            
        })
    }

    return allApps
}

}