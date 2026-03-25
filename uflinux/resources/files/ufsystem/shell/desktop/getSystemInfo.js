{

const ini = globalRequire('ini')
const fs = require('fs')

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

windows.getAppInfoFromDesktopFile = function(path) {
    const content = fs.readFileSync(path, 'utf-8');
    const config = ini.parse(content);

    const desktopEntry = config['Desktop Entry']
    console.log(desktopEntry.Name)
    console.log(desktopEntry.Exec)

    return {
        desktopFile: path,
        appName: path.basename(path),
        iconPath: "wallpapers/18.jpg"
    }
}

window.getAllAppsInfo = function() {
    const desktopFiles = getAllDesktopFiles()
    const allApps = []

    for (const desktopFile of desktopFiles) {
        allApps.push(getAppInfoFromDesktopFile(desktopFile))
    }

    return allApps
}

window.getAppInfo = function(allApps, desktopFileName) {
    for (const appInfo of allApps) {
        if (path.basename(appInfo.desktopFile) == desktopFileName) {
            return appInfo
        }
    }
}

}