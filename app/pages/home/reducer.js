import * as t from './actionTypes';

let initialState = {
    isLoading: false,
    primer: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_PRIMERS: {
            const primer = state.primers;

            //mostar o sinal de carregamento
            if (primers.length === 0) return { ...state, isLoading: true }

            return state;
        }

        case t.PRIMERS_AVAILABLE: {
            let { data } = action;
            let primers = [];

            //converte o snapshot (obejoto json) em array
            data.forEach(function (childeSnapshot) {
                const item = childeSnapshot.val();
                item.key = childeSnapshot.key;

                primers.push(item);
            });
            primers.reverse();

            return { ...state, primers, isLoading: false };
        }

        case t.LOGGED_OUT: {
            return { ...state, primers: [] };
        }

        default:
            return state;
    }
};