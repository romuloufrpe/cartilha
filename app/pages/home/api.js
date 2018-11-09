import { database } from '../../config/firebase';

export function addPrimer(primer, callback) {
    const { userId } = primer;
    const newPrimerRef = database.ref().child('primer').push();
    const newPrimerKey = newPrimerRef.key;

    primer.id = newPrimerKey;

    //Grave os novos dados de cotação simultaneamente na lista de cotações e na lista de cotações do usuário.
    let updates = {};
    updates['/primers' + newPrimerKey] = primer;
    updates['/user-primers' + userId + '/' + newPrimerKey] = primer;

    database.ref().update(updates)
        .then(() => callback(true, primer, null))
        .catch((error) => callback(false, null, error));
}

export function getPrimers(callback) {
    const primerRef = database.ref('primers');

    //começa a ouvir novos dados
    primerRef.on('value', function (snapshot) {
        callback(true, snapshot, null)
    });
}

export function updatePrimer(primer, callback) {
    const { id, userId } = primer;

    let updates = {};
    updatePrimer['primers/' + id] = primer;
    updates['/user-primer/' + userId + '/' + id] = primer;

    database.ref().update(updates)
        .then(() => callback(true, prime, null))
        .catch((error) => callback(false, null, error));
}

export function deletePrimer(primer, callback) {
    const { id, userId } = primer;

    let updates = {};
    updates['primer/' + id] = null;
    updates['/user-primers/' + userId + '/' + id] = null;

    databese.ref().update(updates)
        .then(() => callback(true, primer, null))
        .catch((error) => callback(false, null, error));
}
export function toggleLove(data, callback) {
    const { primer, uid } = data;
    const primerRef = database.ref('primers/' + primer.id);

    primerRef.transaction(function(primer) {
        if (primer) {
            if (primer.loves && primer.loves[uid]) {
                primer.loveCount--;
                primer.loves[uid] = null;
            } else {
                primer.loveCount++;
                if (!primer.loves) primer.loves = {};
                primer.loves[uid] = true;
            }
        }

        return primer;

    }, function(error, committed, snapshot) {
        if (error || !committed) callback(false, null, error)
        else callback(true, snapshot.val(), null)
    });
}

