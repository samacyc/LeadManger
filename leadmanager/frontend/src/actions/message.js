import { CREATE_MESSAGE, GET_ERRORS } from './types'

export const create_message = (payload) => {
    return {
        type: CREATE_MESSAGE,
        payload: payload
    }

}

export const create_error = (payload) => {
    return {
        type: GET_ERRORS,
        payload: payload
    }
}