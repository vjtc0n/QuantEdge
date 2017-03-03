import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../app/redux/Root';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'

import * as InsideAppActions from '../app/redux/actions/insideAppActions'
import insideAppReducer from '../app/redux/reducers/insideApp';

import {
    INIT_DATA,
    UPDATE_ROW_DATA,
    SAVE_PREVIOUS_DATA
} from '../app/redux/actions/insideAppActions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root />, div);
});

describe('actions', () => {
    it('should create an action initing data to redux', () => {
        const data = [
            {
                id: 25,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            },
            {
                id: 26,
                code: 'Guyana Dollar.AX',
                company: 'Harber, Orn and Schuppe',
                price: 9.632911509285316,
                value: '134636',
                change: 0,
                percentChange: 0,
                total: 1296936.673964138
            }
        ]
        const expectedAction = {
            type: INIT_DATA,
            payload: data
        }
        expect(InsideAppActions.initDataToRedux(data)).toEqual(expectedAction)
    })

    it('should create an action updating data of row to redux', () => {
        const data = {
            id: 25,
            price: 94.65066565179713,
            value: '605454',
            change: 0,
            percentChange: 0,
            total: 57306624.12154318
        }
        const expectedAction = {
            type: UPDATE_ROW_DATA,
            payload: {
                index: 25,
                price: 94.65066565179713,
                value: '605454',
                total: 57306624.12154318,
                change: 0,
                percentChange: 0
            }
        }
        expect(InsideAppActions.updateRowDataToRedux(data.id, data.price, data.value, data.total, data.change, data.percentChange)).toEqual(expectedAction)
    })

    it('should create an action saving previous data to redux', () => {
        const data = [
            {
                id: 25,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            },
            {
                id: 26,
                code: 'Guyana Dollar.AX',
                company: 'Harber, Orn and Schuppe',
                price: 9.632911509285316,
                value: '134636',
                change: 0,
                percentChange: 0,
                total: 1296936.673964138
            }
        ]
        const expectedAction = {
            type: SAVE_PREVIOUS_DATA,
            payload: data
        }
        expect(InsideAppActions.savePreviousDataToRedux(data)).toEqual(expectedAction)
    })

})

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('creates action initing data', () => {
        const data = [
            {
                id: 25,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            },
            {
                id: 26,
                code: 'Guyana Dollar.AX',
                company: 'Harber, Orn and Schuppe',
                price: 9.632911509285316,
                value: '134636',
                change: 0,
                percentChange: 0,
                total: 1296936.673964138
            }
        ]
        const expectedActions = [
            { type: INIT_DATA, payload: data },
        ]
        const store = mockStore({ insideApp: [] })

        store.dispatch(InsideAppActions.initData(data))
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('creates action updating data of row', () => {
        const data = {
            id: 25,
            price: 94.65066565179713,
            value: '605454',
            change: 0,
            percentChange: 0,
            total: 57306624.12154318
        }
        const expectedActions = [
            {
                type: UPDATE_ROW_DATA,
                payload: {
                    index: 25,
                    price: 94.65066565179713,
                    value: '605454',
                    total: 57306624.12154318,
                    change: 0,
                    percentChange: 0
                }
            },
        ]
        const store = mockStore(
            {
                insideApp: {}
            }
        )


        store.dispatch(InsideAppActions.updateRowData(data.id, data.price, data.value, data.total, data.change, data.percentChange))
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('creates action saving previous data', () => {
        const data = [
            {
                id: 25,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            },
            {
                id: 26,
                code: 'Guyana Dollar.AX',
                company: 'Harber, Orn and Schuppe',
                price: 9.632911509285316,
                value: '134636',
                change: 0,
                percentChange: 0,
                total: 1296936.673964138
            }
        ]
        const expectedActions = [
            { type: SAVE_PREVIOUS_DATA, payload: data },
        ]
        const store = mockStore({ insideApp: [] })

        store.dispatch(InsideAppActions.savePrevioudData(data))
        expect(store.getActions()).toEqual(expectedActions)
    })
})

describe('insideApp reducer', () => {
    it('should return the initial state', () => {
        expect(
            insideAppReducer(undefined, {})
        ).toEqual(
            {
                allData: [],
                previousData: [],
                topGainersData: [],
                topLosersData: []
            }
        )
    })

    it('should handle INIT DATA', () => {
        const data = [
            {
                id: 25,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            },
            {
                id: 26,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            }
        ]

        expect(
            insideAppReducer({
                allData: [],
                previousData: [],
                topGainersData: [],
                topLosersData: []
            }, {
                type: INIT_DATA,
                payload: data
            })
        ).toEqual(
            {
                allData: [
                    {
                        id: 25,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 26,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ],
                previousData: [
                    {
                        id: 25,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 26,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ],
                topGainersData: [
                    {
                        id: 26,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 25,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ],
                topLosersData: [
                    {
                        id: 25,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 26,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ]
            }
        )
    })

    it('should handle SAVE PREVIOUS DATA', () => {
        const data = [
            {
                id: 25,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            }
        ]

        expect(
            insideAppReducer({
                allData: data,
                previousData: [],
                topGainersData: data,
                topLosersData: data
            }, {
                type: SAVE_PREVIOUS_DATA,
                payload: data
            })
        ).toEqual(
            {
                allData: data,
                previousData: data,
                topGainersData: data.reverse(),
                topLosersData: data
            }
        )
    })

    it('should handle UPDATE ROW DATA', () => {
        const data = [
            {
                id: 1,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            },
            {
                id: 2,
                code: 'Walks.AX',
                company: 'Huel and Sons',
                price: 94.65066565179713,
                value: '605454',
                change: 0,
                percentChange: 0,
                total: 57306624.12154318
            }
        ]

        expect(
            insideAppReducer({
                allData: data,
                previousData: data,
                topGainersData: data,
                topLosersData: data
            }, {
                type: UPDATE_ROW_DATA,
                payload: {
                    index: 1,
                    price: 94.65066565179713,
                    value: '605454',
                    change: 5,
                    percentChange: 0,
                    total: 57306624.12154318
                }
            })
        ).toEqual(
            {
                allData: [
                    {
                        id: 1,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 5,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 2,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ],
                previousData: [
                    {
                        id: 1,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 5,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 2,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ],
                topGainersData: [
                    {
                        id: 1,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 5,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 2,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ],
                topLosersData: [
                    {
                        id: 1,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 5,
                        percentChange: 0,
                        total: 57306624.12154318
                    },
                    {
                        id: 2,
                        code: 'Walks.AX',
                        company: 'Huel and Sons',
                        price: 94.65066565179713,
                        value: '605454',
                        change: 0,
                        percentChange: 0,
                        total: 57306624.12154318
                    }
                ]
            }
        )
    })
})

