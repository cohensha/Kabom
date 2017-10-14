import React, {Component} from 'react';
import { Container, Row, Col, CardImg } from 'reactstrap';
import './style.css';
import { Redirect } from 'react-router-dom';
import { ProfileImage } from './profile.jpg';

class ViewProfile extends Component {
    render() {
        return (
        	<div class="col-container">
        		<div id="header">
					<h1>kabom</h1>
				</div>

				<div className="courses">
					<h4>Currently taking</h4><br />
					
					<p className="info">CSCI 401</p>
					<p className="info">CSCI 356</p>
					<p className="info">MATH 407</p>
					<p className="info">ITP 354</p>
					<p className="info">EE 101</p>
					<br/>

					<h4>Have taken</h4><br />
					
					<p className="info">CSCI 401</p>
					<p className="info">CSCI 356</p>
					<p className="info">MATH 407</p>
					<p className="info">ITP 354</p>
					<p className="info">EE 101</p>
				</div>

				<div className="bio">
					<h4>Contact and Personal Info</h4><br />
					
					<h5>Username</h5>
					<p className="info">user.username</p>
					<h5>Email</h5>
					<p className="info">user.email</p>
					<h5>Facebook</h5>
					<p className="info">user.facebookName</p>
					<h5>LinkedIn</h5>
					<p className="info">linkedin.com/in/jwang</p>
					<h5>Location</h5>
					<p className="info">San Francisco, CA</p>

				</div>

        		<div className="card">
					<CardImg top width = "100%" src="https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/19055703_10208602625695033_5786944972651278570_o.jpg?oh=546f258ae9e4ce29b6c0ee061ca835f7&oe=5A84B5B2" alt={"John"}/>
					<h1>Jonathan Wang</h1>
					<p className="title">Software Developer</p>
					<p>University of Southern California</p>
					<p><button>Show interest!</button></p>
				</div>

				<div className="skillsCard">
					<h1>Experience</h1> <br/>
					
					<h5>user.company</h5>
					<div className="container">
					  <div>I worked at Amazon this past summer on the Amazon Air team working on drones to fly packages across the US</div>
					</div> <br/>

					<h5>user.technology</h5>
					<div className="container">
					  <div>C++</div>
					  <div>Java</div>
					  <div>React</div>
					</div> <br/>
				</div>
			</div>
        );
    }
}

export default ViewProfile;
