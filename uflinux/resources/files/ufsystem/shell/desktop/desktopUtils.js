{

const ini = globalRequire('ini')

function getAllDirs(dirpath) {
    let paths = []

    try {
        const files = fs.readdirSync(dirpath);
        files.forEach(file => {
            paths.push(path.join(dirpath, file));
        });
    } catch (err) {
    }

    return paths
}

// ------------------------------- application dirs

const applicationsDirs = [
    "/usr/share/applications",
    "/usr/local/share/applications",
    path.join(process.env.HOME || "", ".local/share/applications")
];

// ------------------------------- icons dirs

const themeDir = '/usr/share/icons'

const themes = [
    "hicolor",
    "Papirus",
    "default"
]

const inThemeDirs = [
    "symbolic",
    "scalable",
    "1024x1024",
    "512x512",
    "310x310",
    "256x256@2",
    "256x256",
    "192x192",
    "150x150",
    "128x128@2",
    "128x128",
    "96x96@2",
    "96x96",
    "72x72",
    "64x64@2",
    "64x64",
    "48x48@2",
    "48x48",
    "44x44",
    "36x36",
    "32x32@2",
    "32x32",
    "28x28",
    "24x24@2",
    "24x24",
    "22x22@2",
    "22x22",
    "16x16@2",
    "16x16"
]

const iconsDirs = [
    '/usr/share/app-install/icons',
    '/usr/share/pixmaps',
    path.join(process.env.HOME || "", '.local/share/icons'),
    path.join(process.env.HOME || "", '.icons')
];

themes.forEach(themeName => {
    inThemeDirs.forEach(res => {
        const themeDirs = getAllDirs(path.join(themeDir, themeName, res))
        themeDirs.forEach(path => {
            iconsDirs.push(path)
        })
    })
})

// -------------------------------

window.getAllDesktopFiles = function() {
    const desktopFiles = [];

    applicationsDirs.forEach(dir => {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                if (file.endsWith(".desktop")) {
                    const desktopFilePath = path.join(dir, file)
                    const appInfo = getAppInfoFromDesktopFile(desktopFilePath)
                    console.log(appInfo)

                    if (!appInfo.desktopEntry.NoDisplay && !appInfo.desktopEntry.Hidden && !appInfo.desktopEntry.OnlyShowIn) {
                        desktopFiles.push(desktopFilePath);
                    }
                }
            });
        }
    });

    return desktopFiles;
}

window.getIconPathFromIconName = function (iconName) {
    const extensions = ['.png', '.svg', '.xpm'];
    
    if (iconName) {
        for (const basePath of iconsDirs) {
            for (const ext of extensions) {
                const fullPath = path.join(basePath, iconName + ext);
                if (fs.existsSync(fullPath)) {
                    return fullPath;
                }
            }
        }
        
        if (iconName.startsWith("/")) {
            return iconName
        }
    }

    return "icons/defaultapp.png"
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