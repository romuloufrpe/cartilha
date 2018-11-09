import { combineReducers  } from 'redux';

import { reducer as authReducer } from "../pages/auth"
import { reducer as homeReducer } from "../pages/home"

//Combine all the reducer
const rootReducer = combineReducers({ authReducer, homeReducer });

export default rootReducer;