import {combineReducers} from 'redux';
import insideAppReducer from './insideApp';

const rootReducer = combineReducers({
    'insideApp': insideAppReducer
});

export default rootReducer;