import * as alt from 'alt';
import * as native from 'natives';

let webview;

//spawn Vehicel Client Seitig
alt.onServer('vehicle:SetInto', (newVehicle) => {
    const localPlayer = alt.Player.local.scriptID;
    alt.setTimeout(() => {
        native.setPesIntoVehicle(localPlayer, newVehicle.scriptID, -1);
    }, 200);
});

//spawn Player Client Seitig
alt.onServer('spawn:Player', (pos) => {
    alt.setTimeout(() => {
        alt.emitServer('spawn:Ready', pos);
    }, 3500);
});
//alt.emitClient(player, 'webview:Load');
//loadpage Client Seitig
alt.onServer('webview:Load', () => {
    if (!webview) {
        webview = new alt.WebView('http://resource/client/html/index.html');
        webview.on('close:Webview', closeWebview);
        webview.on('spawn:Vehicle', spawnVehicle);
        webview.on('ready', ready);
    }

    webview.focus();
    alt.showCursor(true);
});

function ready() {
    webview.emit('display:Name', alt.Player.local.name);
}

function closeWebview() {
    alt.showCursor(false);
    webview.destroy();
    webview = undefined;
}

function spawnVehicle(model) {
    alt.emitServer('spawn:Vehicle', model);
}
