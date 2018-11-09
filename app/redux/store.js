import { createStore, applyMiddleware, compose} from 'redux';  
import thunk from 'redux-thunk';

import reducers from './rootReducer'; //Import  the root Reducer

const enhancer = compose(applyMiddleware(thunk));

export default createStore(reducers, enhancer);