import React, { useEffect } from 'react';
import Mengnan from './images/Mengnan.png'; 
import Nirjari from './images/Nirjari.jpeg'; 
import Shivam from './images/Shivan.png'; 
import Ahlad from './images/Ahlad.jpeg'; 
import Shrawani from './images/Shrawani.JPEG';
//import './testAbout.css';


const About = () => {
	return (
	<div>
		<h1 className="h1-center"> About Us</h1>
	  <div className="image-gallery-container">
		
		<div className="image-item">
		  <img src={Mengnan} alt="Image 1" />
		  <h3>Mengnan Xu</h3>
		  <p>Scrum Master</p>
		</div>
		<div className="image-item">
		  <img src={Shrawani} alt="Image 2" />
		  <h3>Shrawani Bawage</h3>
		  <p>Data Engineer</p>
		</div>
		<div className="image-item">
		  <img src={Ahlad} alt="Image 3" />
		  <h3>Ahlad Satyam</h3>
		  <p>Backend Developer</p>
		</div>
		<div className="image-item">
		  <img src={Nirjari} alt="Image 4" />
		  <h3>Nirjari Mehta</h3>
		  <p>Developer</p>
		</div>
		<div className="image-item">
		  <img src={Shivam} alt="Image 5" />
		  <h3>Shivam Bhardwaj</h3>
		  <p>Software Developer</p>
		</div>
	  </div>
	  </div>
	);
  };

export default About;
