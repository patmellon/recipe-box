import React, { Component } from 'react';
import { Form, Text, Select, FormError } from 'react-form'
import logo from './logo.svg';
import './App.css';

class TaskList extends React.Component{
  deleteElement (){
    console.log("remove");
  }

  render(){

    const isEditing = this.props.isEditing;

    let editInput = null;
    if (isEditing) {
      editInput = <input/>;
    } else {
      editInput = null;
    }

    return (
      <div>

        <ul>
          {this.props.items.map((task, taskIndex) =>

            <li key={taskIndex}>

              <b>{task}</b><br/>
              <ul>
                <li>{this.props.ingredients[taskIndex]}</li>
              </ul>
              {editInput}
              <button onClick={this.props.deleteTask} value={taskIndex}> Delete </button>
              <button onClick={this.props.editTask}> Edit </button>
            </li>
          )}
        </ul>

      </div>
    );
  }
};

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      items: ['PumpkinPie', 'FruityLoops', 'ChickenMarang'],
      task: '',
      ingredients: ['pumpkin, lumpkins', 'fruits and loops','chicken, pie'],
      ingredient: '',
      isEditing: false
    }

    this.deleteTask = this.deleteTask.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  deleteTask(e) {
    var taskIndex = parseInt(e.target.value, 10);
    console.log('remove task: %d', taskIndex, this.state.items[taskIndex]);
    this.setState(state => {
      state.items.splice(taskIndex, 1);
      state.ingredients.splice(taskIndex, 1);
      return {items: state.items, ingredients: state.ingredients};
    });
  }

  onChange (e) {
    this.setState({ task: e.target.value});
  }

  onChange2(e){
    this.setState({ingredient: e.target.value})
  }

  addTask (e){
    this.setState({
      items: this.state.items.concat([this.state.task]),
      task: '',
      ingredients: this.state.ingredients.concat([this.state.ingredient]),
      ingredient: ''
    })

    e.preventDefault();
  }


  editTask() {
    this.setState({isEditing: true});

  }

  render(){

    return(
      <div>
        <h1>My Task </h1>
        <TaskList items={this.state.items} ingredients={this.state.ingredients}
          deleteTask={this.deleteTask} editTask={this.editTask} isEditing={this.state.isEditing} />

          <form onSubmit={this.addTask}>
            Recipe Name: <input onChange={this.onChange} type="text" value={this.state.task}/><br/>
            Ingredients: <input onChange={this.onChange2} type="text" value={this.state.ingredient}/><br/>
            <button> Add Recipe </button>
          </form>
        </div>
      );
    }
  };


  export default App;
