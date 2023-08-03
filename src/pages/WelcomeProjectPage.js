import React from 'react';
import { Link } from 'react-router-dom';


const WelcomeProjectPage = () => {

  return (
    
    <div className="App-form">
      <div className="auth-form-container">
        <h3 >Welcome to the Project Page!</h3><br></br>
          <div className="navigation">
          <Link to="/CreateProject"><button className="button-project">Create New Project</button></Link>
          <Link to="/JoinProject"><button className="button-project">Join Existing Project</button></Link>
        </div>
      </div>
      </div>
  );
};
export default WelcomeProjectPage;