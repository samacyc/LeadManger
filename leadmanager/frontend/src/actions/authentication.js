import axios from 'axios'

import {
    USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,
    REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_FAIL, LOGOUT_SUCCESS
} from './types'
import { create_error } from './message'


export const loadUser = () => (dispatch, getState) => {

    dispatch({
        type: USER_LOADING
    })

    const token = getState().auth.token
    let config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('/api/auth/user', config).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch(create_error(errors))
        dispatch({
            type: AUTH_ERROR
        })
    })
}

export const login = (data) => dispatch => {

    let config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    axios.post("/api/auth/login", data = JSON.stringify(data), config).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch(create_error(errors))
        dispatch({
            type: LOGIN_FAIL
        })
    })

}




export const logout = () => (dispatch, getState) => {

    dispatch({
        type: USER_LOADING
    })

    const token = getState().auth.token
    let config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.post('/api/auth/logout', null, config).then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    }).catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch(create_error(errors))
    })
}


export const register = (data) => dispatch => {
    const data_json = {
        "username": data['username'],
        "email": data['email'],
        "password": data['password'],
        "password2": data['password2']
    }
    let config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    axios.post('/api/auth/register', JSON.stringify(data), config).then(res => {
        console.log(res.data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        console.log(data)
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch(create_error(errors))
        dispatch({
            type: REGISTER_FAIL
        })

    })
}