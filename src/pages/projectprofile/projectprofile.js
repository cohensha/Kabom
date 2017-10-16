import React, {Component} from 'react';
import { Container, Row, Col, CardImg } from 'reactstrap';
import './style.css';
import { Redirect } from 'react-router-dom';
import Header from '../header/header';

class ProjectProfile extends Component {
    render() {
        return (
        	<div>
        		<Header/>

        		<div className="card">
					<CardImg top width = "100%" src="https://i.imgur.com/GWUyCqu.gif" alt={"Cover Image"}/>
					<h1>project.name</h1>
					<p className="slogan">project.slogan</p>
					<p>University of Southern California</p>
					<p><button>I'm interested!</button></p>
				</div>

				<div className="about">
					<h2 >Information</h2> <br/>
					
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

				<div className="description">
					<h2 >Description</h2> 
					
					<div className="container">
					  <div>I worked at Amazon this past summer on the Amazon Air team working on drones to fly packages across the US, aklsdjfkl;asjeflkajsfl
					  aejflkjasoeifjal;ksdfjakls;jf;kls
					  aejfkls;jdfkl;sajfjlakjdflksjk</div>
					</div> <br/>
				</div>
			</div>
        );
    }
}

export default ProjectProfile;
