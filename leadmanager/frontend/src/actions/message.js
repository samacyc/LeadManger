import { CREATE_MESSAGE } from './types'

export const create_message = (payload) => {
    return {
        type: CREATE_MESSAGE,
        payload: payload
    }

}