import React, {Component} from 'react';

var firebase = require('firebase');

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBfduS-4dlytGV2PCEkgE8KzoG8MoWg164",
    authDomain: "survey-61c0a.firebaseapp.com",
    databaseURL: "https://survey-61c0a.firebaseio.com",
    projectId: "survey-61c0a",
    storageBucket: "survey-61c0a.appspot.com",
    messagingSenderId: "186777097480"
  };
  firebase.initializeApp(config);

class Authen extends Component{

	constructor(props){

		super(props);
		this.state={
			err: ''
		};
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
		this.logout = this.logout.bind(this);
		this.google = this.google.bind(this);


	}

	login(event){

		const email = this.refs.email.value;
		const password = this.refs.password.value;
		
		const auth = firebase.auth();
		const promise = auth.signInWithEmailAndPassword(email, password);
		promise.then(user => {
			var lout = document.getElementById("logout");
			lout.classList.remove('hide');
			var message = "Welcome "+email;
			this.setState({err: message});
		});

		promise.catch(e => {
			var err = e.message;
			this.setState({err: err});

		});

	}

	signup(){

		const email = this.refs.email.value;
		const password = this.refs.password.value;
		
		const auth = firebase.auth();
		const promise = auth.createUserWithEmailAndPassword(email, password);

		promise
		.then(user => {
			var err = "Welcome "+user.email;
			firebase.database().ref('users/'+user.uid).set({
				email: user.email
			});
			this.setState({err: err});	
		}).catch(e => {
			var err = e.message;
			this.setState({err: err});
		})
	}

	logout(){

		firebase.auth().signOut();
		var lout = document.getElementById("logout");
		lout.classList.add('hide');
		var message = "Thanks";
		this.setState({err: message});
	}

	google(){

		var provider = new firebase.auth.GoogleAuthProvider();
		var promise = firebase.auth().signInWithPopup(provider);
		promise.then(result => {
			var user = result.user;
			firebase.database().ref('users/'+user.uid).set({
				email: user.email,
				name: user.displayName
			});
		});

		promise.catch(e => {
			var msg = e.message;
			this.setState({err: msg});
		});
	}

	render(){
		return(
			<div>
			<input id="email" ref="email" type="email" placeholder="Enter your email"/><br/>
			<input id="pass" ref="password" type="password" placeholder="Enter your password"/><br/>
			<p>{this.state.err}</p>
			<button onClick={this.login}>Log In</button>
			<button onClick={this.signup}>Sign Up</button>
			<button id="logout" className="hide" onClick={this.logout}>Log Out</button><br/>
			<button id="google" className="google" onClick={this.google}>Sign In with Google</button>
			</div>

		);
	}
}

export default Authen;
