import {
    INIT_DATA,
    UPDATE_ROW_DATA
} from '../actions/insideAppActions';

const initalState = {
    allData: [],
    topGainersData: [],
    topLosersData: []
};

export default function insideAppReducer(state = initalState, action) {
    switch (action.type) {
        case INIT_DATA:
            return {
                ...state,
                allData: action.payload
            };
        case UPDATE_ROW_DATA:
            state.allData[action.payload.index - 1].price = action.payload.price;
            state.allData[action.payload.index - 1].value = action.payload.value;
            return state;
        default:
            return state;
    }
}