import React, { Component } from "react";
var result

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      pass: '',
      validationMessage: "",
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
      let url = "/register"
      
      const response = await( await fetch("/register",
       {method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })).json();
      console.log(response,"response")
      if (response.validRegister=="true") //if registration is succesful, go to login page
      {
        window.location.href = './login';
    } 
      }    
  }


  render() {
    const { Username, pass, validationMessage } = this.state;

    return (
      <div className="App-form">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={this.handleSubmit}>
          <label htmlFor="Username">Username</label>
          <input
            value={this.state.Username}
            onChange={this.handleusernameChange}
            type="Username" // Corrected type from "Username" to "text"
            placeholder="Username"
            id="Username"
            name="Username"
          /> <br/>
          <label htmlFor="Password">Password</label>
          <input
            value={this.state.pass}
            onChange={this.handlepasswordChange}
            type="password"
            placeholder="********"
            id="Password"
            name="Password"
          /> <br/>
          <button type="submit">Register</button>
        </form>
        {/* <p>{validationMessage}</p>
        <button className="link-btn" onClick={() => this.props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
      </div>
      </div>
    );
  }
}

export default Register;
