import React, { useState } from 'react';

const CreateProject = ({ onProjectCreate }) => {
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectIDChange = (e) => {
    setProjectCode(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    var body = {
      projectName: projectName,
      projectID: projectCode,
      projectDescription: projectDescription
    };
    console.log(body);
    if (projectName === "") {
      alert('Please enter the project name');
    }
    else if(projectDescription === ""){
      alert('Please enter the project description');
    } 
    else if (projectCode === "") {
      alert('Please enter the project ID');
    } 
    else {
      console.log("working");
      let url = "/CreateProject";
      try {
        const response = await (await fetch("/CreateProject", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }));
        const data = await response.json();
        console.log(data, "response");
        if (data.validCreation === "true") {
          window.location.href = './JoinProject';
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="App-form" >
 
    <div className="auth-form-container">
      <h2>Create a New Project</h2><br/>

       {/* Add a form element with onSubmit */}
      <form className="register-form" onSubmit={handleCreateProject}>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <br></br>
        <br></br>
        <label>Description: </label>
        <input
          type="text"
          placeholder="Project Description"
          value={projectDescription}
          onChange={handleProjectDescriptionChange}
        />
        <br></br>
        <br></br>
        <label>Project ID: </label>
        <input
          type="text"
          placeholder="Project ID"
          value={projectCode}
          onChange={handleProjectIDChange}
        />
        <br></br>
        <br></br>
        <br></br>
        {/* Remove the button element */}
        {/* <button onClick={handleCreateProject}>Create Project</button> */}
        <button type="submit">Create Project</button>
      </form>
    </div>
    </div>
  );
};

export default CreateProject;