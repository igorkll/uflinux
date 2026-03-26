{

const ini = globalRequire('ini')

function getAllDirs(dirpath) {
    let paths = []

    const files = fs.readdirSync(dirpath);
    files.forEach(file => {
        paths.push(path.join(dirpath, file));
    });

    return paths
}

// ------------------------------- application dirs

const applicationsDirs = [
    "/usr/share/applications",
    "/usr/local/share/applications",
    path.join(process.env.HOME || "", ".local/share/applications")
];

// ------------------------------- icons dirs

const theme = "hicolor"
const themeDir = path.join('/usr/share/icons', theme)

const iconsDirs = [
...getAllDirs(path.join(themeDir, "symbolic")),
...getAllDirs(path.join(themeDir, "scalable")),
...getAllDirs(path.join(themeDir, "1024x1024")),
...getAllDirs(path.join(themeDir, "512x512")),
...getAllDirs(path.join(themeDir, "310x310")),
...getAllDirs(path.join(themeDir, "256x256@2")),
...getAllDirs(path.join(themeDir, "256x256")),
...getAllDirs(path.join(themeDir, "192x192")),
...getAllDirs(path.join(themeDir, "150x150")),
...getAllDirs(path.join(themeDir, "128x128@2")),
...getAllDirs(path.join(themeDir, "128x128")),
...getAllDirs(path.join(themeDir, "96x96@2")),
...getAllDirs(path.join(themeDir, "96x96")),
...getAllDirs(path.join(themeDir, "72x72")),
...getAllDirs(path.join(themeDir, "64x64@2")),
...getAllDirs(path.join(themeDir, "64x64")),
...getAllDirs(path.join(themeDir, "48x48@2")),
...getAllDirs(path.join(themeDir, "48x48")),
...getAllDirs(path.join(themeDir, "44x44")),
...getAllDirs(path.join(themeDir, "36x36")),
...getAllDirs(path.join(themeDir, "32x32@2")),
...getAllDirs(path.join(themeDir, "32x32")),
...getAllDirs(path.join(themeDir, "28x28")),
...getAllDirs(path.join(themeDir, "24x24@2")),
...getAllDirs(path.join(themeDir, "24x24")),
...getAllDirs(path.join(themeDir, "22x22@2")),
...getAllDirs(path.join(themeDir, "22x22")),
...getAllDirs(path.join(themeDir, "16x16@2")),
...getAllDirs(path.join(themeDir, "16x16")),
...[
    '/usr/share/app-install/icons',
    '/usr/share/pixmaps',
    path.join(process.env.HOME || "", '.local/share/icons'),
    path.join(process.env.HOME || "", '.icons')
]];

// -------------------------------

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

    return {
        desktopEntry: desktopEntry,
        desktopFile: desktopFile,
        appName: desktopEntry.Name,
        runCommand: desktopEntry.Exec,
        iconPath: getIconPathFromIconName(desktopEntry.Icon)
    }
}

window.getDesktopFilePath = function(desktopFiles, desktopFile) {
    for (const checkDesktopFile of desktopFiles) {
        if (path.basename(checkDesktopFile) == desktopFile) {
            return checkDesktopFile
        }
    }
}

}