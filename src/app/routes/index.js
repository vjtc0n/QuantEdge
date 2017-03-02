// Import react
import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Import components
import AppMaster from '../views/AppMaster';
import MainContainer from '../redux/containers/MainContainer';

export default () => {
    return (
        <Route path="/" component={AppMaster}>
            <IndexRoute component={MainContainer}/>
            <Route path="/" component={MainContainer}/>
        </Route>
    )
}