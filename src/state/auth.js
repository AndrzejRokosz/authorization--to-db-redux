//reducer
import { auth } from '../firebaseConfig'
const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'

export const initAuthChangeListeningAction = () => (dispatch, getState) => {
    auth.onAuthStateChanged( ///async action

        user => {
            if (user) {
                dispatch(logInAction()) //sync actions
            } else {
                dispatch(logOutAction())
            }
        }
    )
}

export const logOutAsyncAction =()=> (dispatch,getState) => {
    auth.signOut()
}

const logInAction = () => ({ type: LOG_IN }) //action creators
const logOutAction = () => ({ type: LOG_OUT })

const INITIAL_STATE = {  //trzymamy czy zalog/niezalog
    isUserLoggedIn: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isUserLoggedIn: true
            }
        case LOG_OUT:
            return {
                ...state,
                isUserLoggedIn: false
            }


        default:
            return state
    }
}