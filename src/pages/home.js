import React from 'react';
import Background from './images/Background.jpg'

const Home = () => {
return (
	<div className="home-page">
      <div className="background-image">
	  <img src={Background} alt="Background Image" />
      </div>
      <div className="content">
        <h1 className="main-heading">Nmass Hardware Solutions</h1>
        <h2 className="sub-heading">Creating. Managing. Innovating</h2>
      </div>
    </div>
	
);
};

export default Home;
