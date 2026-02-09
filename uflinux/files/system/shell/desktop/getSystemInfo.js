{

const applicationsDirs = [
    "/usr/share/applications",
    "/usr/local/share/applications",
    path.join(process.env.HOME || "", ".local/share/applications")
];

window.getAllDesktopFiles = function() {
    const apps = [];

    applicationsDirs.forEach(dir => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            if (file.endsWith(".desktop")) {
                apps.push(path.join(dir, file));
            }
        });
    });

    return apps;
}

window.getAllApps = function() {
    
}

}