import React from 'react'
import {
    render
} from 'react-dom';
import {
    Provider
} from 'react-redux';
import DevTools from './redux/devTools';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';
import rootRouter from 'sRoutes/rootRoute';
import configureStore from './redux/createStore';

const store = configureStore();

render(
    <Provider store={store}>
        <div>
            <Router history={browserHistory} routes={rootRouter}/>
            {process.env.NODE_ENV=='development'?<DevTools/>:null}
        </div>
    </Provider>,
    document.getElementById('Root')
);