import initialState from "./initialState";

const UserReducer = (state=initialState.users,action)=>{
    switch (action.type){
        case 'SET_USERS' :{
            return action.payload
        }
        default:
            return state
    }
}

export default UserReducer;
