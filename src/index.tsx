import ReactDOM from 'react-dom';
import React from 'react';
// import './index.scss';

// 首先我们需要导入一些组件...
import { Router, hashHistory } from 'react-router'
import routes from './router';


ReactDOM.render(<Router routes={routes} history={hashHistory} />, document.getElementById('root'));
