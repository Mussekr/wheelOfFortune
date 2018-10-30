import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = null;
    if (process.env.NODE_ENV === 'production') {
        store = createStore(
            persistedReducer,
          compose(applyMiddleware(thunk)),
        );
      } else {
        store = createStore(
            persistedReducer,
          compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
          ),
        );
      }
    
    let persistor = persistStore(store)
    return { store, persistor }
}
