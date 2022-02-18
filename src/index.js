import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

import InitialActions from './actions/initialActions.js';

ReactDOM.render(routes, document.getElementById("root"));

InitialActions.init(function () {
    ReactDOM.render(routes, document.getElementById("root"));
});
