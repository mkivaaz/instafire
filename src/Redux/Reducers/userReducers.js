const reducer = (state = 0, action) =>{
    console.log(action);
    switch(action.type){
        case "Login":
            return action.payload
        case "Sign Up":
            return action.payload
        default:
            return "None"

    }

}

export default reducer;
