import React, { Component } from "react";
import ErrorPop from "./errorpop";
import WelcomeProjectPage from "./WelcomeProjectPage";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      pass: '',
      showError: false,
    };

   

    this.handleusernameChange = this.handleusernameChange.bind(this)
    this.handlepasswordChange = this.handlepasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

   
}

handleusernameChange = event => {
    this.setState({
        Username: event.target.value
    });
}

handleCloseModal = () => {
  this.setState({ showError: false });
}

handlepasswordChange = event => {
    this.setState({
        pass: event.target.value
    });
}
  

  handleSubmit = async (e) => {
    e.preventDefault();
    var body = {
        username: this.state.Username,
        password: this.state.pass
    }

    console.log(body);

    if (this.state.Username === "") {
        alert('Please enter the username')
    }

    else if (this.state.pass === "") {
        alert('Please enter the password')
    }
    
    else {
        console.log("working");
      let url = "/login"
      
      const response = await( await fetch("/login",
       {method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })).json();
      console.log(response,"response")
      if (response.validLogin=="false") //if login details are incorrect
      {
        this.setState({ showError: true });
        //window.location.href = '/login'; 
    } else if (response.validLogin=="true") { //if login details are correct, add route to project here
        window.location.href = './WelcomeProjectPage'
        WelcomeProjectPage()
      }
      else {
        alert('User Not Found')
      }
      }    
  }

  render() {
    return (
      <div className="App-form">
      <div className="auth-form-container">
        <h2>Log-In</h2>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <label htmlFor="Username">Username</label>
          <input
            value={this.state.Username}
            onChange={this.handleusernameChange}
            type="string"
            placeholder="Username"
            id="Username"
            name="Username"
          /><br />
          <label htmlFor="Password">Password</label>
          <input
             value={this.state.pass}
             onChange={this.handlepasswordChange}
            type="Password"
            placeholder="********"
            id="Password"
            name="Password"
          /> <br />
          {/* Error modal */}
          {this.state.showError && (
  <ErrorPop isOpen={true} onClose={this.handleCloseModal} errorMessage="Invalid username or password" />
)}
          <button type="submit">Log In</button>
        </form>
     
        {/* <button className="link-btn" onClick={() => this.props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
      </div>
      </div>
    );
  }
}

export default Login;