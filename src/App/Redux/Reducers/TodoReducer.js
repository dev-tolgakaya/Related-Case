import initialState from "./initialState";

const TodoReducer = (state = initialState.todos, action) => {
    switch (action.type) {
        case 'SET_TODOS' : {
            return action.payload
        }
        case 'DELETE_TODO': {
            const newState = state.filter((todo) => todo.id !== action.payload)
            return newState
        }
        case 'UPDATE_TODO': {
            const newState = state.map((todo) => todo.id === action.payload.id ? action.payload : todo)
            return newState
        }
        default:
            return state
    }
}

export default TodoReducer;
