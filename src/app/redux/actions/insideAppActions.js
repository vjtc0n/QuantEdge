import * as API from '../../api/Backend';

export const INIT_DATA = 'INIT_DATA';
export const UPDATE_ROW_DATA = 'UPDATE_ROW_DATA';

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

export function updateRowDataToRedux(index, price, value) {
    return {
        type: UPDATE_ROW_DATA,
        payload: {
            index: index,
            price: price,
            value: value
        }
    }
}

export function updateRowData(index, price, value) {
    return dispatch => {
        dispatch(updateRowDataToRedux(index, price, value))
    }
}


