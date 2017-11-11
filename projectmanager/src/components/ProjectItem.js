import React, { Component } from 'react';

class ProjectItem extends Component {

	deleteProject(id){
		// need to pass this 2 levels above -> first to projects and then to app so we set property
		this.props.onDelete(id);

	}

	render() {
		console.log(this.props)
	    return (
	      <li className="Project">
	      	<strong>{this.props.project.title}</strong> : {this.props.project.category} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>X</a>
	      </li>

	    );
	  }
	}

export default ProjectItem;
