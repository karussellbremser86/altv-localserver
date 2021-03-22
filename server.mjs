import * as alt from 'alt';
import chat from 'chat';

// spawn player + posi
const spawnPos = {
    X: -365.425,
    Y: -131.809,
    Z: 37.873,
};

const standardModel = 'mp_m_freemode_01';

alt.on('playerConnect', (player) => {
    alt.emitClient(player, 'spawn:Player', spawnPos);
});

alt.onClient('spawn:Ready', (player, pos) => {
    player.model = 'mp_m_freemode_01';
    player.spawn(pos.x, pos.y, pos.z, 0);
});

// Befelhe

//Heilen
chat.registerCmd('sethp', (player, arg) => {
    if (!arg || arg.length <= 0) {
        chat.send(player, '/sethp (amount)');
        return;
    }

    let amount = parseInt(arg[0]);
    if (amount < 100) {
        amount += 100;
    }

    if (isNaN(amount)) {
        chat.send(player, 'The amount specifiend; war keine Nummer.');
        return;
    }

    player.health = amount;
});

// Vehicle

chat.registerCmd('veh', (player, arg) => {
    if (!arg || arg.length <= 0) {
        chat.send(player, '/veh (model)');
        return;
    }
    spawnVehicle(player, arg[0]);
});

alt.onClient('spawn:Vehicle', spawnVehicle);

//Loadpage
chat.registerCmd('loadpage', (player) => {
    alt.emitClient(player, 'webview:Load');
});

function spawnVehicle(player, model) {
    try {
        const newVehicle = new alt.Vehicle(
            model,
            player.pos.x,
            player.pos.y,
            player.pos.z,
            0,
            0,
            0
        );
        alt.emitClient(player, 'vehicle:SetInto', newVehicle);
    } catch (err) {
        chat.send(player, 'Dieses Modell war falsch.');
    }
}
