import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'

import Games from './games'
import GameDetail from './games/Game-details'
import Community from './community'
import CommunityDetail from './community/Community-details'
import Events from './event'
import EventDetail from './event/Event-details'
import IndexPage from './pages/index'
import AuthService from './../service/AuthService'
import SignupForm from './auth/Signup-form'
import LoginForm from './auth/Login-form'
import ProfilePage from './pages/profile'



// BOOTSTRAP Component
import Navigation from './ui/Navbar'
import Message from './ui/CustomToast'



class App extends Component {
  constructor() {
    super()
    this.state = {

      loggedInUser: null
    }

    this.AuthService = new AuthService()

  }

  setTheUser = user => this.setState({ loggedInUser: user })

  fetchUser = () => {

    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
    // .catch(err => console.log({ err }))
  }

  handleToast = (visible, text = '') => {
    let toastCopy = { ...this.state.toast }
    toastCopy = { visible, text }
    this.setState({ toast: toastCopy })
  }

  render() {

    this.fetchUser()

    return (
      <>

        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} handleToast={this.handleToast} />


        <Switch>
          <Route exact path="/" render={() => <IndexPage />} />

          <Route path="/profile" render={() =>
            this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} /> : <Redirect to='/signup' />}
          />

          <Route exact path="/community" render={() => <Community loggedInUser={this.state.loggedInUser} />} />
          <Route path="/community/:id" render={props => <CommunityDetail loggedInUser={this.state.loggedInUser} {...props} />} />
          {/* <Route exact path="/community/comment/:id" render={props => <CommentForm {...props} />} /> */}


          <Route exact path="/games" render={() => <Games />} />
          <Route path="/games/:id" render={props => <GameDetail {...props} />} />

          <Route exact path="/events" render={() => <Events />} />
          <Route path="/events/:id" render={props => <EventDetail {...props} />} />

          <Route path="/signup" render={props => <SignupForm {...props} setTheUser={this.setTheUser} handleToast={this.handleToast} />} />
          <Route path="/login" render={props => <LoginForm {...props} setTheUser={this.setTheUser} handleToast={this.handleToast} />} />
        </Switch>

        <Message {...this.state.toast} handleToast={this.handleToast} />
      </>
    )
  }
}

export default App