// Import react
import React,{Component} from 'react';
import {render} from 'react-dom';

// Import components
import Root from './app/redux/Root';

// Import sass
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/font-awesome/scss/font-awesome.scss'
import './app/stylesheets/style.scss';

render(<Root/>, document.getElementById('root'))