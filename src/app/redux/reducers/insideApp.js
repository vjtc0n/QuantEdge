import _ from 'underscore'

import {
    INIT_DATA,
    UPDATE_ROW_DATA,
    SAVE_PREVIOUS_DATA
} from '../actions/insideAppActions';

const initalState = {
    allData: [],
    topGainersData: [],
    topLosersData: [],
    previousData: []
};

export default function insideAppReducer(state = initalState, action) {
    switch (action.type) {
        case INIT_DATA:
            return {
                ...state,
                allData: action.payload,
                previousData: action.payload,
                topGainersData: _.sortBy(action.payload, 'change').reverse(),
                topLosersData: _.sortBy(action.payload, 'percentChange')
            };
        case UPDATE_ROW_DATA:
            state.allData[action.payload.index - 1].price = action.payload.price;
            state.allData[action.payload.index - 1].value = action.payload.value;
            state.allData[action.payload.index - 1].total = action.payload.total;
            state.allData[action.payload.index - 1].change = action.payload.change;
            state.allData[action.payload.index - 1].percentChange = action.payload.percentChange;
            state.topGainersData = _.sortBy(state.allData, 'change').reverse();
            state.topLosersData = _.sortBy(state.allData, 'percentChange');
            return state;

        case SAVE_PREVIOUS_DATA:
            return {
                ...state,
                previousData: action.payload
            };
        default:
            return state;
    }
}