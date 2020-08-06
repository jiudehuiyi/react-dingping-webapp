import { combineReducers } from 'redux';
import app from "./app";
import home from "./home";
import detail from "./detail";
import search from "./search";
import searchResult from "./searchResult";
import login from "./login";
import user from "./user";
import citylist from "./citylist";
import purchase from "./purchase";
//合并成根reducer
const rootReducer = combineReducers({
    app,
    ...home,
    ...detail,
    ...search,
    ...searchResult,
    ...login,
    ...user,
    ...citylist,
    ...purchase
})

export default rootReducer