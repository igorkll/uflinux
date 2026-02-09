const path = require('path');
const fs = require('fs');
const { app } = require('electron');

function mergeTables(tbl, def) {
    for (let key in def) {
        if (!(key in tbl)) {
            tbl[key] = def[key]
        } else if (typeof def[key] === 'object' && def[key] != null && !Array.isArray(def[key])) {
            mergeTables[tbl[key], def[key]]
        }
    }
}

function calcAppsGridSize() {
    const grid = document.querySelector('.appsTab');
    const style = getComputedStyle(grid);

    const colGap = parseFloat(style.columnGap);
    const rowGap = parseFloat(style.rowGap);
    const padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const padY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

    const usableWidth = grid.clientWidth - padX;
    const usableHeight = grid.clientHeight - padY;

    const cellW = 100;
    const cellH = 100;

    return [Math.floor((usableWidth + colGap) / (cellW + colGap)), Math.floor((usableHeight + rowGap) / (cellH + rowGap))]
}
