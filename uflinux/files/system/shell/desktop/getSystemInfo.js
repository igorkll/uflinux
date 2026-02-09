{

const applicationsDirs = [
    "/usr/share/applications",
    "/usr/local/share/applications",
    path.join(process.env.HOME || "", ".local/share/applications")
];

window.getAllDesktopFiles = function() {
    const desktopFiles = [];

    applicationsDirs.forEach(dir => {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                if (file.endsWith(".desktop")) {
                    desktopFiles.push(path.join(dir, file));
                }
            });
        }
    });

    return desktopFiles;
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

window.getAppInfoFromDesktopFile = function(allApps, desktopFile) {
    for (const appInfo of allApps) {
        if (appInfo.desktopFile == desktopFile) {
            return appInfo
        }
    }
}

window.getAppInfoFromDesktopFileName = function(allApps, desktopFileName) {
    for (const appInfo of allApps) {
        if (path.basename(appInfo.desktopFile) == desktopFileName) {
            return appInfo
        }
    }
}

}