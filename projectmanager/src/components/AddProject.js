import React, { Component } from 'react';
import uuid from 'uuid';

class AddProject extends Component {

	constructor(){
		super();
		this.state = {
			newProject : {}
		}
	}

	static defaultProps = {
		categories : ['web Design', 'Web Development', 'Mobile Development']

	}

	handleSubmit(e){

		// validation for blank title
		if(this.refs.title.value === ''){
			alert("Title is required")
		}
		else{
			this.setState({newProject: {
				id: uuid.v4(),
				title: this.refs.title.value,
				category: this.refs.category.value	
			}}, function(){
				// to add new project to main list of projects
				this.props.addProject(this.state.newProject);
			});
		}
		e.preventDefault();
	}

	render() {
		let categoryOptions = this.props.categories.map(category => {

			return <option key={category} value={category}>{category}</option>

		});
		return (
	      <div>
	        <h3>Add Project</h3>
	        {/* bind is needed so that handleSubmit has access to values entered by referring by 'this' keyword */}
	        <form onSubmit={this.handleSubmit.bind(this)}>
	        	<div>
	        		<label>Title</label><br/>
	        		<input type="text" ref="title"/>
	        	</div>
	        	<div>
	        		<label>Category</label><br/>
	        		<select ref="category">
	        			{categoryOptions}
					</select>
	        	</div>
	        	<br/>
	        	<input type="submit" value="Submit"/>
	        </form>
	      </div>
	    );
	  }
	}

export default AddProject;
