//import * as API from '../../api/Backend';

export const INIT_DATA = 'INIT_DATA';
export const UPDATE_ROW_DATA = 'UPDATE_ROW_DATA';
export const SAVE_PREVIOUS_DATA = 'SAVE_PREVIOUS_DATA';

export function initDataToRedux(data) {
    return {
        type: INIT_DATA,
        payload: data
    }
}


export function initData(data) {
    return dispatch => {
        dispatch(initDataToRedux(data))
    }
}

export function updateRowDataToRedux(index, price, value, total, change, percentChange) {
    return {
        type: UPDATE_ROW_DATA,
        payload: {
            index: index,
            price: price,
            value: value,
            total: total,
            change: change,
            percentChange: percentChange
        }
    }
}

export function updateRowData(index, price, value, total, change, percentChange) {
    return dispatch => {
        dispatch(updateRowDataToRedux(index, price, value, total, change, percentChange))
    }
}

export function savePreviousDataToRedux(data) {
    return {
        type: SAVE_PREVIOUS_DATA,
        payload: data
    }
}

export function savePrevioudData(data) {
    return dispatch => {
        dispatch(savePreviousDataToRedux(data))
    }
}


