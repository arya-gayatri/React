import React, { Component } from 'react';
import Projects from './components/Projects'
import AddProject from './components/AddProject'
import './App.css';
import uuid from 'uuid';
import $ from 'jquery';
import Todos from './components/Todos'

class App extends Component {
  
  constructor(){
      super();
      this.state = {
        projects: [],
        todos: []
    }

  }


  // An external api to get json data
  getTodos(){
      $.ajax({
        url: "https://jsonplaceholder.typicode.com/todos",
        dataType: 'json',
        cache: false,
        success: function(data){
          this.setState({todos: data}, function(){
            console.log(this.state);
          });
        }.bind(this),
        error: function(xhr, status, err){
          console.log(err);
        }
      });

  }

  getProjects(){

    this.setState({projects : [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category : 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category : 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Cart',
          category : 'Web Development'
        }

      ]});


  }

  componentWillMount(){

      this.getProjects();
      this.getTodos();

  }

  componentDidMount(){

    this.getTodos();

  }

  handleAddProject(project){
    // since state is immutable, create new projects objects with all old projects, add new one and make that object as the projects object of the state
      let projects = this.state.projects
      projects.push(project)
      this.setState({projects: projects})
      // Note - this is not persisted i.e disappears on reload. (Use react only for front-end)
  } 

  handleDeleteProject(id){

    let projects = this.state.projects
    let index = projects.findIndex(x => x.id === id);
    // find the index and delete 1 item (project to be deleted)
    projects.splice(index,1);
    this.setState({projects: projects})
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
        <hr/>
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
