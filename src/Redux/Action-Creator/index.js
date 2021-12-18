export const actSignUp = (user) => {
    return(dispatch) => {
        dispatch({
            type: "Sign Up",
            payload: user,
        })
    }
}

export const actLogin = (user) => {
    return(dispatch) => {
        dispatch({
            type: "Login",
            payload: user,
        })
    }
}
