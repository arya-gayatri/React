import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

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

class Survey extends Component{

	constructor(props){
		super(props);
		this.state = {
			uid: uuid.v1(),
			studentName: '',
			answers: {
				answer1: '',
				answer2: '',
				answer3: ''
			},
			isSubmitted: false
		};
	}

	nameSubmit(event){
		var studentName = this.refs.name.value;
		this.setState({
			studentName : studentName
		}, function(){
			console.log(this.state);
		});
	}

	answerSelected(event){

		var answers = this.state.answers;
		if(event.target.name === 'answer1'){
			answers.answer1 = event.target.value;
		}
		else if(event.target.name === 'answer2'){
			answers.answer2 = event.target.value;
		}
		else if(event.target.name === 'answer3'){
			answers.answer3 = event.target.value;
		}

		this.setState({answers: answers}, function(){
			console.log(this.state);
		})

	}

	questionSubmit(){

		firebase.database().ref('Survey/'+this.state.uid).set({
			studentName: this.state.studentName,
			answers: this.state.answers
		});

		this.setState({
			isSubmitted: true
		})
	}

	render(){
		var studentName;
		var questions;

		if(this.state.studentName==='' && this.state.isSubmitted===false)
		{
			studentName = <div>
				<h1> Please fill your name </h1>
				<form onSubmit={this.nameSubmit.bind(this)}>
					<input className="sname" type="text" placeholder="Enter your name" ref="name"/>
				</form>
			</div>,
			questions = '';
		} else if(this.state.studentName!=='' && this.state.isSubmitted===false)
		{
			studentName = <div>
			<h1> Welcome to Survey, {this.state.studentName}</h1>
			</div>,
			questions = <div>
				<h2>Here are some questions: </h2>
				<form onSubmit={this.questionSubmit.bind(this)}>
					<div className="card">
						<label>What kind of courses you like?</label><br/>
						<input type="radio" name="answer1" value="Technology" onChange={this.answerSelected.bind(this)}/>Technology
						<input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected.bind(this)}/>Marketing
						<input type="radio" name="answer1" value="Design" onChange={this.answerSelected.bind(this)}/>Design
						</div>
					<div className="card">
						<label>What is your skill level?</label><br/>
						<input type="radio" name="answer2" value="Beginner" onChange={this.answerSelected.bind(this)}/>Beginner
						<input type="radio" name="answer2" value="Intermediate" onChange={this.answerSelected.bind(this)}/>Intermediate
						<input type="radio" name="answer2" value="Advanced" onChange={this.answerSelected.bind(this)}/>Advanced
					</div>
					<div className="card">
						<label>Is online learning helpful?</label><br/>
						<input type="radio" name="answer3" value="Yes" onChange={this.answerSelected.bind(this)}/>Yes
						<input type="radio" name="answer3" value="No" onChange={this.answerSelected.bind(this)}/>No
						<input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected.bind(this)}/>Maybe
					</div>
					<input className="feedback-button" type="submit" value="submit"/>
				</form>
			</div>

		}else if(this.state.isSubmitted === true){

			studentName = <h1>Thanks, {this.state.studentName}!</h1>

		}

		return(
			<div>
			{studentName}
			-------------------------------------------------
			{questions}
			</div>
		);
	}
}

export default Survey;
