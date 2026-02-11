{

const appsTabHost = document.getElementById("appsTabHost")
const mainAppsHost = document.getElementById("mainAppsHost")
let appsHosts = [...appsTabHost.children, mainAppsHost]
const tabdots = document.getElementById("tabdots")

let appsGridSize

function onResize() {
    appsGridSize = calcAppsGridSize()
}

onResize()
window.addEventListener('resize', onResize)

// ---------------------------------- tabdots

function refreshTabdotsSelect() {
    const active = getActiveSnap(appsTabHost)[0]
    let index = 0
    for (const tabdot of tabdots.children) {
        if (index == active) {
            tabdot.classList.add("active")
        } else {
            tabdot.classList.remove("active")
        }
        index++
    }
}

function selectTab(index) {
    appsTabHost.scrollTo({
        left: appsTabHost.clientWidth * index,
        behavior: 'smooth'
    })
}

function changeTab(delta) {
    selectTab(getActiveSnap(appsTabHost)[0] + delta)
}

function refreshTabdots() {
    tabdots.replaceChildren()

    let index = 0
    for (const element of appsTabHost.children) {
        const i = index
        const tabdot = document.createElement("div")
        tabdot.classList.add("tabdot")
        tabdot.addEventListener('pointerdown', () => {
            selectTab(i)
        })
        tabdots.appendChild(tabdot)
        index++
    }

    refreshTabdotsSelect()
}

// ---------------------------------- tabhost

function addIcon(appsTab, icon) {
    let appIcon = document.createElement("div")
    appIcon.classList.add("appIcon")
    appIcon.style.gridColumn = icon.x
    appIcon.style.gridRow = icon.y
    appIcon.icon = icon

    let appImgDiv = document.createElement("div")
    appIcon.appendChild(appImgDiv)

    let appImg = document.createElement("img")
    appImg.src = icon.appInfo.iconPath
    appImgDiv.appendChild(appImg)

    let titleObj = document.createElement("p")
    titleObj.textContent = icon.appInfo.appName
    appIcon.appendChild(titleObj)

    addLongPressHandle(appImgDiv, 1000, event => {
        enableEditMode(event, appIcon)
    })
    appImgDiv.addEventListener("pointerdown", event => {
        doIcon(event, appIcon)
    })

    appsTab.appendChild(appIcon)
}

function addAppsTab(tabHost, tab=null) {
    let appsTab = document.createElement("div")
    appsTab.classList.add("appsTab")

    if (tab) {
        for (const icon of tab) {
            addIcon(appsTab, icon)
        }
    }

    tabHost.appendChild(appsTab)
    return appsTab
}

// ---------------------------------- register default apps

function addMainAppTab(appsInfo, desktopFileName) {
    let appInfo = getAppInfoFromDesktopFileName(appsInfo, desktopFileName)

    if (appInfo) {
        const icon = {
            x: storage.desktop.mainAppsTab.length + 1,
            y: 1,
            appInfo
        }
        storage.desktop.mainAppsTab.push(icon)
    }
}

function addMainAppsTab(appsInfo) {
    addMainAppTab(appsInfo, "org.telegram.desktop.Discord")
    addMainAppTab(appsInfo, "com.discordapp.Discord")
    addMainAppTab(appsInfo, "com.valvesoftware.Steam.desktop")
    addMainAppTab(appsInfo, "org.mozilla.firefox.desktop")

    addMainAppTab(appsInfo, "telegram.desktop")
    addMainAppTab(appsInfo, "discord.desktop")
}

function refreshDefaultApps() {
    const appsInfo = getAllApps()

    let x = 1
    let y = 1
    let sizeX = appsGridSize[0]
    let sizeY = appsGridSize[1]
    let tab = []

    storage.desktop.appsTabs = []
    for (const appInfo of appsInfo) {
        const icon = {
            x,
            y,
            appInfo
        }
        tab.push(icon)
        
        x++
        if (x > sizeX) {
            x = 1
            y++
            if (y > sizeY) {
                y = 1
                storage.desktop.appsTabs.push(tab)
                tab = []
            }
        }
    }

    if (tab.length > 0) {
        storage.desktop.appsTabs.push(tab)
    }

    storage.desktop.mainAppsTab = []
    addMainAppsTab(appsInfo)

    storage.desktop.defaultAppsTabsLoaded = true
    storage_save()
}

if (!storage.desktop.defaultAppsTabsLoaded || true) {
    refreshDefaultApps()
}

// ---------------------------------- add tabs

function refreshAppsIcons() {
    document.querySelectorAll(".appsTab").forEach(element => {
        element.remove()
    })

    let tabAdded = false
    let firstAppsTab = null
    for (const tab of storage.desktop.appsTabs) {
        let appsTab = addAppsTab(appsTabHost, tab)
        if (firstAppsTab == null) firstAppsTab = appsTab
        tabAdded = true
    }

    if (firstAppsTab) {
        firstAppsTab.id = "templateAppsTab"
    }

    if (!tabAdded) {
        addAppsTab(appsTabHost)
    }

    addAppsTab(mainAppsHost, storage.desktop.mainAppsTab)

    appsHosts = [...appsTabHost.children, mainAppsHost]

    refreshTabdots()
}

refreshAppsIcons()

appsTabHost.addEventListener('scroll', refreshTabdotsSelect)

// ---------------------------------- edit icons

let editMode = false
let autoDisableEditModeTimer = null
let currentHandleElement = null
let currentVirtualElement = null
let editModeChangeTabTimer = null

function startDisableEditModeTimer() {
    if (autoDisableEditModeTimer) {
        clearTimeout(autoDisableEditModeTimer)
    }

    autoDisableEditModeTimer = setTimeout(() => {
        disableEditMode()
        autoDisableEditModeTimer = null
    }, 5000)
}

function recreateVirtualIcon(cursorX=null, cursorY=null) {
    let allow1 = currentHandleElement && cursorX != null
    let allow2 = false
    let cell = null
    if (allow1) {
        cell = getGridCellAtCursor(appsHosts, cursorX, cursorY, 100, 100)
        if (cell) {
            let gridItem = getGridElement(cell.grid, cell.row, cell.col)
            allow2 = gridItem == null || gridItem.classList.contains("virtualIcon")
        }
    }

    if (allow1 && allow2) {
        if (currentVirtualElement &&
            currentVirtualElement.col == cell.col &&
            currentVirtualElement.row == cell.row) {
            return
        }
    }

    if (currentVirtualElement) {
        currentVirtualElement.remove()
        currentVirtualElement = null
    }

    if (allow1 && allow2) {
        const element = currentHandleElement.realIcon.cloneNode(true)
        element.classList.remove("handle")
        element.classList.add("virtualIcon")
        element.style.gridColumn = cell.col
        element.style.gridRow = cell.row
        element.col = cell.col
        element.row = cell.row
        cell.grid.appendChild(element)

        currentVirtualElement = element
    }
}

function updateFakeIconPosition(event, fakeIcon) {
    const rect = fakeIcon.realIcon.getBoundingClientRect()
    fakeIcon.style.left = (event.clientX - (rect.width / 2)) + "px"
    fakeIcon.style.top = (event.clientY - (rect.height / 2)) + "px"

    let cell = getGridCellAtCursor(appsHosts, event.clientX, event.clientY, 100, 100)
    let validPos = false
    if (cell) {
        let sizeX = appsGridSize[0]
        let sizeY
        if (cell.grid == mainAppsHost.firstElementChild) {
            sizeY = 1
        } else {
            sizeY = appsGridSize[1]
        }

        console.log(cell)
        console.log(sizeX)
        console.log(sizeY)
        validPos = cell.col >= 1 && cell.col <= sizeX && cell.row >= 1 && cell.row <= sizeY
    }

    console.log(validPos)

    if (validPos) {
        recreateVirtualIcon(event.clientX, event.clientY)
    } else {
        recreateVirtualIcon()
    }
}

function doHandleIcon(event, realIcon) {
    if (currentHandleElement) doUnhandleIcon()
    const fakeIcon = realIcon.cloneNode(true)
    fakeIcon.realIcon = realIcon
    fakeIcon.classList.add("fakeIcon")

    const rect = realIcon.getBoundingClientRect()
    fakeIcon.style.width = rect.width + "px"
    fakeIcon.style.height = rect.height + "px"

    updateFakeIconPosition(event, fakeIcon)

    currentHandleElement = fakeIcon
    document.body.appendChild(fakeIcon)

    realIcon.classList.add("handle")
    document.body.classList.add('grabbingOverride')
}

function virtualIconToReal() {

}

function doUnhandleIcon(process=false) {
    if (!currentHandleElement) return

    currentHandleElement.realIcon.classList.remove("handle")
    currentHandleElement.remove()
    currentHandleElement = null

    if (process) {
        virtualIconToReal()
    }

    recreateVirtualIcon()

    document.body.classList.remove('grabbingOverride')
}

function doIcon(event, handleElement) {
    if (editMode) {
        doHandleIcon(event, handleElement)
    } else {

    }
}

function enableEditMode(event, handleElement) {
    if (editMode) return
    document.documentElement.classList.add('editMode')
    startDisableEditModeTimer()
    document.addEventListener('user_interaction', startDisableEditModeTimer)
    editMode = true

    if (handleElement) {
        doIcon(event, handleElement)
    }
}

function disableChangeTabTimer() {
    if (editModeChangeTabTimer) clearTimeout(editModeChangeTabTimer)
    editModeChangeTabTimer = null
}

function disableEditMode() {
    if (!editMode) return
    document.documentElement.classList.remove('editMode')
    document.removeEventListener('user_interaction', startDisableEditModeTimer)
    
    disableChangeTabTimer()
    doUnhandleIcon()

    editMode = false
}

document.addEventListener('pointerup', () => {
    disableChangeTabTimer()
    doUnhandleIcon(true)
})

let changeTabCheckArea = 5

document.addEventListener('pointermove', event => {
    if (currentHandleElement) {
        updateFakeIconPosition(event, currentHandleElement)
        
        disableChangeTabTimer()
        editModeChangeTabTimer = setInterval(() => {
            const rect = appsTabHost.getBoundingClientRect()

            changeTabCheckAreaPx = (rect.width / 100) * changeTabCheckArea
            if (event.x < changeTabCheckAreaPx) {
                changeTab(-1)
                startDisableEditModeTimer()
            }
            if (event.x > rect.width - changeTabCheckAreaPx) {
                changeTab(1)
                startDisableEditModeTimer()
            }
        }, 1000)
    }
})

}