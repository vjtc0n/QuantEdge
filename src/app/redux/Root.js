// Import react
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Import custom
import configureStore from './store/configureStore';
import Routes from '../routes/index';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router history={hashHistory}>
                        {Routes()}
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}