import React, { useState } from 'react';
const JoinProject = ({ onProjectJoin }) => {
  const [projectCode, setProjectCode] = useState('');

  const handleInputChange = (e) => {
    setProjectCode(e.target.value);
  };

  const handleJoinProject = async (e) => {
    e.preventDefault();
    var body = {
      projectID: projectCode,
    };
    console.log(body);
    if (projectCode === "") {
      alert('Please enter the project ID');
    }   
    else {
      console.log("working");
      
      try {
        const response = await (await fetch("/JoinProject", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }));
        const data = await response.json();
        console.log(data, "response");
        if (data.validCreation === "true") {
          window.location.href = './HardwareSets';
        }
        else{
          console.log(data, "response");
          alert('Please enter a valid project ID');
          window.location.href = './JoinProject'
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="App-form">
      <div className="auth-form-container">
        {/* Add a form element with onSubmit */}
      <form className="register-form" onSubmit={handleJoinProject}>
      <h2>Join an Existing Project</h2><br/>
      <label>Project ID: </label>
      <input
        type="text"
        placeholder="Project ID"
        value={projectCode}
        onChange={handleInputChange}
      />
      <br></br>
      <br></br>
      <button type="submit">Join Project</button>
      </form>
      </div>
    </div>
  );
};

export default JoinProject;