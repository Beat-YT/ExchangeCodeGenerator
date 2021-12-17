const { default: axios } = require('axios');
const { app, BrowserWindow } = require('electron')
const constants = require('./constants')
const open = require('open');
const isElectron = require('is-electron');

if (!isElectron()) {
    console.log('use npm start');
    process.exit()
}

async function Authenticate() {
    if (!app.isReady()) {
        await app.whenReady();
    }
    const win = new BrowserWindow({
        width: 600,
        height: 900
    })

    const info = constants.launcherAppClient2;

    if (!info) {
        throw reject(new Error(`Client ${client} is not valid`))
    }

    const loginQuery = new URLSearchParams();
    loginQuery.append('redirectUrl', info.redirectUrl);
    loginQuery.append('client_id', info.clientId);
    loginQuery.append('responseType', 'code');

    var url = constants.loginURL + '?' + loginQuery.toString()

    win.loadURL(url);

    win.webContents.setWindowOpenHandler((details) => {
        console.log(`url: ` + details.url)
        open(details.url);
        return {
            action: 'deny'
        }
    })

    try {
        win.webContents.debugger.attach('1.3');
    } catch (err) {
        console.log('Debugger attach failed: ', err);
    }

    win.webContents.debugger.on('detach', (event, reason) => {
        console.log('Debugger detached due to: ', reason);
    });


    win.webContents.debugger.on('message', (event, method, params) => {
        if (method === 'Network.responseReceived') {
            const url = new URL(params.response.url);
            if (url.pathname.endsWith('/id/api/exchange/generate')) {
                win.webContents.debugger.sendCommand('Network.getResponseBody', { requestId: params.requestId }).then(function (response) {
                    if (response.base64Encoded) {
                        var body = Buffer.from(response.body, 'base64').toString()
                    } else {
                        var body = response.body;
                    }
                    const parsed = JSON.parse(body);

                    win.loadFile('result.html').then(() => {
                        win.webContents.executeJavaScript(`var code='${parsed.code}';document.getElementById('code').innerHTML=code`)
                    })
                });
            }
        }
    })

    win.webContents.debugger.sendCommand('Network.enable');


    win.webContents.session.webRequest.onBeforeRequest(function (details, cb) {
        var url = new URL(details.url);

        if (url.pathname.endsWith('/id/api/analytics')) {
            return cb({ cancel: true })
        }

        return cb({ cancel: false })
    });


};

app.whenReady().then(() => {
    Authenticate();
})