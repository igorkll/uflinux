{

const evdev = globalRequire('evdev')

let pressedAt = null

function listenDevice(device) {
    device.on('EV_KEY', (code, value) => {
        if (code === evdev.codes.KEY_POWER) {
            if (value === 1) {
                pressedAt = Date.now()
            } else if (value === 0 && pressedAt) {
                const duration = Date.now() - pressedAt
                if (duration > 2000) {
                    console.log("LONG PRESS")
                }
                pressedAt = null
            }
        }
    })
}

const devices = fs.readdirSync('/dev/input/').filter(f => f.startsWith('event')).map(f => '/dev/input/' + f)

devices.forEach(path => {
    try {
        const device = new Evdev(path)
        if (!device.has(Evdev.codes.KEY_POWER)) return

        console.log('Listening for KEY_POWER on', path)
        listenDevice(device)
    } catch (e) {
        console.warn('Cannot open', path, e.message)
    }
})
}