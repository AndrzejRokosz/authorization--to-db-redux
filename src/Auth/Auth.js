import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import { auth, googleProvider } from '../firebaseConfig'

import Forms from './Forms'

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
    isUserLoggedIn: false
  }

  componentDidMount() {
    auth.onAuthStateChanged(
      // user is an obj with users data or null when not logged in
      user => {
        if (user) {
          this.setState({ isUserLoggedIn: true })
        } else {
          this.setState({ isUserLoggedIn: false })
        }
      }
    )
  }

  onEmailChangeHandler = event => {
    this.setState({ email: event.target.value })
  }
  onPasswordChangeHandler = event => {
    this.setState({ password: event.target.value })
  }

  onLogInClick = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        alert('Something is wrong! Check console for error details!')
        console.log(error)
      })
  }

  onLogInByGoogleClick = () => {
    auth.signInWithPopup(googleProvider)
  }

  onLogOutClickHandler = () => {
    auth.signOut()
  }

  render() {
    return (
      this.state.isUserLoggedIn ?
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
            onClick={this.onLogOutClickHandler}
          >
            X
          </FloatingActionButton>
          {this.props.children}
        </div>
        :
        <Forms
          email={this.state.email}
          onEmailChangeHandler={this.onEmailChangeHandler}
          password={this.state.password}
          onPasswordChangeHandler={this.onPasswordChangeHandler}
          onLogInClick={this.onLogInClick}
          onLogInByGoogleClick={this.onLogInByGoogleClick}
        />
    )
  }
}
export default Auth