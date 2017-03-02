// Import react
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';

// Import custom
import configureStore from './store/configureStore';
import Routes from '../routes/index';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    {Routes()}
                </Router>
            </Provider>
        )
    }
}