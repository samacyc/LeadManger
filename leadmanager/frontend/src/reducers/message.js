import { CREATE_MESSAGE } from '../actions/types'


const initialState = {
}

export default function (state = initialState, actions) {

    switch (actions.type) {
        case CREATE_MESSAGE:
            return state = actions.payload
        default:
            return state
    }
}