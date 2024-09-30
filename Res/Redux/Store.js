// import { applyMiddleware, compose, legacy_createStore,middleware} from 'redux'
// import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {reducers} from './Reducers/Index';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const allReducers = (reducers, composeEnhancers(applyMiddleware(thunk)))
// const store= configureStore({reducer: allReducers })
const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
