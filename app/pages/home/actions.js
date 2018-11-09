import * as t from './actionTypes';
import * as api from './api';

// adiciona cartilha - CREATE (C)
export function addPrimer(primer, successCB, errorCB) {
    return (dispatch) => {
        api.addPrimer(primer, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// busca a cartilha READ (R)
export function getPrimers(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_PRIMERS });
        api.getPrimers(function (success, data, error) {
            if (success) dispatch({ type: t.PRIMERS_AVAILABLE, data });
            else if (error) errorCB(error)
        });
    };
}

// atualiza a cartilha UPDATE (U)
export function updatePrimer(primer, successCB, errorCB) {
    return (dispatch) => {
        api.updatePrimer(primer, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// deleta a cartilha DELETE (D)
export function deletePrime(prime, errorCB) {
    return (dispatch) => {
        api.deletePrimer(primer, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

// like / unlike
export function toggleLove(data, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_PRIMERS });
        api.toggleLove(data, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}