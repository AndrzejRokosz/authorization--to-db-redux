import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import { auth, googleProvider } from '../firebaseConfig'
import { connect } from 'react-redux'
import Forms from './Forms'
import {
    initAuthChangeListeningAction,
    logOutAsyncAction,
    loginByGoogleAsyncAction,
    logInAsyncWithEmailAndPassword,
    emailChangeAction,
    passwordChangeAction

} from '../state/auth'

class Auth extends React.Component {

    componentDidMount() {
        this.props._initAuthChangeListeningAction()
    }

   

    render() {
        return (
            this.props._isUserLoggedIn ?
                <div>
                    <FloatingActionButton
                        style={{
                            position: 'fixed',
                            top: 10,
                            right: 10,
                            zIndex: 9999,
                            color: 'white'
                        }}
                        secondary={true}
                        onClick={this.props._logOutAsyncAction}
                    >
                        X
            </FloatingActionButton>
                    {this.props.children}
                </div>
                :
                <Forms
                    email={this.props._email}
                    onEmailChangeHandler={this.props._emailChangeAction}
                    password={this.props._password}
                    onPasswordChangeHandler={this.props._passwordChangeAction}
                    onLogInClick={this.props._logInAsyncWithEmailAndPassword}
                    onLogInByGoogleClick={this.props._loginByGoogleAsyncAction}
                />
                
        )
    }
}
const mapStateToProps = state => ({
    _isUserLoggedIn: state.auth.isUserLoggedIn,
    _email: state.auth.email,
    _password: state.auth.password
})

const mapDispatchToProps = dispatch => ({
    _initAuthChangeListeningAction: () => dispatch(initAuthChangeListeningAction()),
    _logOutAsyncAction: () => dispatch(logOutAsyncAction()),
    _loginByGoogleAsyncAction: () => dispatch(loginByGoogleAsyncAction()),
    _logInAsyncWithEmailAndPassword: () => dispatch(logInAsyncWithEmailAndPassword()),
    _emailChangeAction: (event) => dispatch( emailChangeAction(event.target.value)),
    _passwordChangeAction: (event) => dispatch( passwordChangeAction(event.target.value))

})


export default connect(mapStateToProps, mapDispatchToProps)(Auth)