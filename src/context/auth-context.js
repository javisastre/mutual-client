import React from 'react';
import authService from '../services/auth-service';

const { Consumer, Provider } = React.createContext();


class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null
  }

  me = () => {
    authService.me()
      .then((user) => this.setState({ isLoggedIn: true, user: user, isLoading: false }))
      .catch((err) => this.setState({ isLoggedIn: false, user: null, isLoading: false }));
  }

  componentDidMount () {
    this.me()
  }

  signup = (username, email, password) => {
    authService.signup( username, email, password )
      .then((user) => this.setState({ isLoggedIn: true, user }) )
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
      })
  }

  login = (username, password) => {
    authService.login( username, password )
      .then((user) => this.setState({ isLoggedIn: true, user }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
      })
  }

  logout = () => {
    authService.logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch((err) => console.log(err));
  }

  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    const { signup, login, logout, me } = this;

    if (isLoading) return <p>Loading</p>;

    return(
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout, me }}  >
        {this.props.children}
      </Provider>
    )
  }

}


// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  
  return function (props) {
      return(
        <Consumer>
          { (value) => {
            const { isLoggedIn, isLoading, user, signup, login, logout, me } = value;

            return (
              <WrappedComponent 
                isLoggedIn={isLoggedIn} 
                isLoading={isLoading} 
                user={user} 
                signup={signup} 
                login={login} 
                logout={logout}
                me={me}
                {...props}
              />
            )

          } }
        </Consumer>
        )
    }
}


export { AuthProvider, withAuth }