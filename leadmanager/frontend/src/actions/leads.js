import axios from 'axios'


import { GET_LEADS, DELETE_LEAD, ADD_Lead, GET_ERRORS } from './types'
import { create_message, create_error } from './message'
export const getLeads = () => (dispatch, getState) => {

    axios.get('/api/leads', config(getState)).then(
        res => {
            const data = res.data
            dispatch({
                type: GET_LEADS,
                payload: data
            });
        }
    ).catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch(create_error(errors))
    })
}

export const DeleteLead = (id) => (dispatch, getState) => {

    axios.delete(`/api/leads/${id}`, config(getState)).then(
        res => {
            dispatch(create_message({ deleteLead: 'Lead Deleted' }))
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        }
    ).catch(err => console.log(err))
}
export const addLead = (lead) => (dispatch, getState) => {

    axios.post("/api/leads/", lead, config(getState)).then(
        res => {
            const data = res.data
            dispatch(create_message({ createLead: 'Lead Created' }))

            dispatch({
                type: ADD_Lead,
                payload: data
            });
        }
    ).catch(err => {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch(create_error(errors))
    })
}

const config = (getState) => {
    const token = getState().auth.token
    let config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config

}