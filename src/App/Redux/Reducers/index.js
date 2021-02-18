import {combineReducers} from 'redux';
import TodoReducer from "./TodoReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    todos: TodoReducer,
    users: UserReducer

});

export default rootReducer;
