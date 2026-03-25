{

const ini = globalRequire('ini')

const applicationsDirs = [
    "/usr/share/applications",
    "/usr/local/share/applications",
    path.join(process.env.HOME || "", ".local/share/applications")
];

function getAllDirs(dirpath) {
    let paths = []

    const files = fs.readdirSync(dirpath);
    files.forEach(file => {
        if (file.endsWith(".desktop")) {
            paths.push(path.join(dirpath, file));
        }
    });

    return paths
}

const theme = "hicolor"
const themeDir = path.join('/usr/share/icons', theme)


const iconsDirs = 
getAllDirs(path.join(themeDir, "scalable")) + 
getAllDirs(path.join(themeDir, "1024x1024")) + 
getAllDirs(path.join(themeDir, "512x512")) + 
getAllDirs(path.join(themeDir, "256x256")) + 
getAllDirs(path.join(themeDir, "128x128")) + 
getAllDirs(path.join(themeDir, "64x64")) + 
getAllDirs(path.join(themeDir, "32x32")) + 
getAllDirs(path.join(themeDir, "symbolic")) + 
[
    '/usr/share/app-install/icons',
    '/usr/share/pixmaps',
    path.join(process.env.HOME || "", '.local/share/icons'),
    path.join(process.env.HOME || "", '.icons')
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

window.getIconPathFromIconName = function (iconName) {
    const extensions = ['.png', '.svg', '.xpm'];
    
    for (const basePath of iconsDirs) {
        for (const ext of extensions) {
            const fullPath = path.join(basePath, iconName + ext);
            if (fs.existsSync(fullPath)) {
                return fullPath;
            }
        }
    }
    
    return iconName;
}

window.getAppInfoFromDesktopFile = function(desktopFile) {
    const content = fs.readFileSync(desktopFile, 'utf-8');
    const config = ini.parse(content);

    const desktopEntry = config['Desktop Entry']
    console.log(desktopEntry)

    return {
        desktopEntry: desktopEntry,
        desktopFile: desktopFile,
        appName: desktopEntry.Name,
        runCommand: desktopEntry.Exec,
        iconPath: getIconPathFromIconName(desktopEntry.Icon)
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