import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReduder from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReduder, applyMiddleware(...middlewares));

export default store;