//reducer
import { auth, googleProvider, database } from '../firebaseConfig'
import { loadTextFromDbAsyncAction } from './userData';


const LOG_IN = 'auth/LOG_IN'
const LOG_OUT = 'auth/LOG_OUT'
const EMAIL_CHANGE = 'auth/EMAIL_CHANGE'
const PASSWORD_CHANGE = 'auth/PASSWORD_CHANGE'
export const initAuthChangeListeningAction = () => (dispatch, getState) => {
    auth.onAuthStateChanged( ///async action

        user => {
            if (user) {
                dispatch(logInAction(user))
                dispatch(saveLoginTimeStampAsyncAction())
                dispatch(loadTextFromDbAsyncAction()) //sync actions
            } else {
                dispatch(logOutAction())
            }
        }
    )
}

export const logOutAsyncAction = () => (dispatch, getState) => {
    auth.signOut()
}

export const loginByGoogleAsyncAction = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
}

export const logInAsyncWithEmailAndPassword = () => (dispatch, getState) => {
    const { auth: { email, password } } = getState()
    //above destruct is the same as
    // const email =getState().auth.email
    // const password =getState().auth.password
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            alert('Something is wrong! Check console for error details!')
            console.log(error)
        })

}
//login uzytkownika nnnnnnggg
const saveLoginTimeStampAsyncAction = () => (dispatch, getState) => {
    database.ref('/loginsLogs').push({
        timestamp: Date.now()
    })
}

export const emailChangeAction = newValue => ({
    type: EMAIL_CHANGE,
    newValue
})
export const passwordChangeAction = newValue => ({
    type: PASSWORD_CHANGE,
    newValue
})

const logInAction = (user) => ({
    type: LOG_IN,
    user
})
//action creators
const logOutAction = () => ({ type: LOG_OUT })

const INITIAL_STATE = {  //trzymamy czy zalog/niezalog
    isUserLoggedIn: false,
    email: '',
    password: '',
    user: null  //do zapisu do local.storage
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isUserLoggedIn: true,
                user: action.user
            }
        case LOG_OUT:
            return {
                ...state,
                isUserLoggedIn: false,
                user:null
            }
        case EMAIL_CHANGE:
            return {
                ...state,
                email: action.newValue
            }
        case PASSWORD_CHANGE:
            return {
                ...state,
                password: action.newValue
            }

        default:
            return state
    }
}