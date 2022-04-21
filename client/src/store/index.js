import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index.js';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(
    rootReducer,
    window._REDUX_DEVTOOLS_EXTENSION_&& window._REDUX_DEVTOOLS_EXTENSION_(),
    applyMiddleware(thunkMiddleware));


// import { createStore, applyMiddleware } from 'redux';
// import { composeWhithDevTools } from 'redux-devtools-extension';
// import  thunk from 'redux-thunk';
// import rootReducer from '../reducer/index.js';

// export const store =  createStore(
//     rootReducer, 
//     composeWhithDevTools(applyMiddleware(thunk)
//     ));