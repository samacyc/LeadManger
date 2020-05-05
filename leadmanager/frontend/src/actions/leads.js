import axios from 'axios'


import { GET_LEADS, DELETE_LEAD, ADD_Lead, GET_ERRORS } from './types'
import { create_message } from './message'
export const getLeads = () => dispatch => {

    axios.get('/api/leads').then(
        res => {
            const data = res.data
            dispatch({
                type: GET_LEADS,
                payload: data
            });
        }
    ).catch(err => console.log(err))
}

export const DeleteLead = (id) => dispatch => {

    axios.delete(`/api/leads/${id}`).then(
        res => {
            dispatch(create_message({ deleteLead: 'Lead Deleted' }))
            dispatch({
                type: DELETE_LEAD,
                payload: id
            });
        }
    ).catch(err => console.log(err))
}
export const addLead = (lead) => dispatch => {

    axios.post("/api/leads/", lead).then(
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
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    })
}