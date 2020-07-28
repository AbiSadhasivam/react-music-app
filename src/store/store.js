import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './reducers/reducers';
import middlewares from './middlewares/middleware';

let store;

export default function getStore() {
  if (!store) {
    /* eslint no-underscore-dangle: 0 */
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

    store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(...middlewares))
    );
  }

  return store;
}
