import axios from "axios"

const LoginRequest = () => {
    return {
        type: "LOGIN_REQUEST"
    }
}

const LoginSuccess = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

const LoginError = (error) => {
    return {
        type: "LOGIN_ERROR",
        payload: error
    }
}

export const Login = (formData) => {
    return (dispatch) => {
        dispatch(LoginRequest())
        axios({
            method: "POST",
            url: `https://coffee-shop-be-dio.herokuapp.com/api/v1/auth/login`,
            data: {
                email: formData.email,
                password: formData.password
            }
        })
        .then ((res) => {
            dispatch(LoginSuccess(res.data))
        })
        .catch((err)=> {
            dispatch(LoginError(err.response.data))
        })
    }
}

export const Logout = () => {
    return {
        type: "AUTH_LOGOUT",
    }
}
