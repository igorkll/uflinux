if (false) {

const evdev = globalRequire('evdev')

let pressedAt = null

function listenDevice(device) {
    device.on('EV_KEY', (code, value) => {
        console.log("Q")
        if (code === 116) {
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
        const device = new evdev(path, { raw: false })

        console.log('Listening for KEY_POWER on', path)
        listenDevice(device)
    } catch (e) {
        console.warn('Cannot open', path, e.message)
    }
})
}

{

const fd = fs.openSync('/dev/input/event1', fs.constants.O_RDONLY);
const EVENT_SIZE = 24;
const buf = Buffer.alloc(EVENT_SIZE);

function checkPowerButton() {
    try {
        const bytesRead = fs.readSync(fd, buf, 0, buf.length, null);
        if (bytesRead === buf.length) {
            const type  = buf.readUInt16LE(8);   // смещение type
            const code  = buf.readUInt16LE(10);  // смещение code
            const value = buf.readInt32LE(12);   // смещение value

            if (type === 1) { // EV_KEY
                console.log(`Key event: code=${code}, value=${value}`);
            }
        }
    } catch(e) {
        console.error('Read error', e);
    }
}

console.log("QWE")

setInterval(checkPowerButton, 100)

}