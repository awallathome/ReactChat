//These imports tell the app that we are using React packages. 

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Components/Routes/routes';
import registerServiceWorker from './registerServiceWorker';

// The ReactDOM.render() function below directs all renderable elements (from the Routes function in the neighboring routes.js file) to the 'root' element in the index.html
ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
