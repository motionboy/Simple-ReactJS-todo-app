import React, { Component } from 'react';
import './App.css';
import {Container,Badge,ListGroup,ListGroupItem,ListGroupItemHeading,ListGroupItemText,Button,Form,FormGroup,Label,Input,Col } from 'reactstrap';
var todos = [
  {
    todoTitle: "This the first title",
    todoCreator:"Ibrahim Abdul",
    todoDesc:"This is the description",
    todoPriority:"Lowest"
  },
  {
    todoTitle: "This the second title",
    todoCreator:"Ibrahim Abdul",
    todoDesc:"This is the second description",
    todoPriority:"High"
  },
  {
    todoTitle: "This the third title",
    todoCreator:"Ibrahim Abdul",
    todoDesc:"This is the third description",
    todoPriority:"Medium"
  }
];
//Main class
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  //Remove todo method
  removeTodo(index){
    this.setState({
      todos: this.state.todos.filter(function(e, i){
        return i !== index;
      })
    })
  }

  handleAddTodo(todo){
    this.setState({todos: [...this.state.todos, todo]})
  }
  //The render method
  render() {
    return (
      <Container>
        <AddTodoForm onAddTodo={this.handleAddTodo}></AddTodoForm>
        <hr/>
        {this.state.todos.map((todo, index) =>
          <Col sm={6}>
            <ListGroup>
              <ListGroupItem key={index}>
                <ListGroupItemHeading>{todo.todoTitle} <Badge color="info">{todo.todoPriority}</Badge></ListGroupItemHeading>
                <strong>{todo.todoCreator}</strong>
                <ListGroupItemText>{todo.todoDesc}</ListGroupItemText>
                <Button outline color="danger" onClick={this.removeTodo.bind(this, index)}>Delete</Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        )}
      </Container>
    );
  }
}

//Add todo Component
class AddTodoForm extends Component{
  constructor(props){
      super(props);

      this.state = {
        todoTitle:'',
        todoCreator:'',
        todoDesc:'',
        todoPriority:'Lowest'
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.submitTodo = this.submitTodo.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState ({
      [name]:value
    })
  }

  submitTodo (event){
    event.preventDefault();
    this.props.onAddTodo(this.state);
    this.setState = ({
      todoTitle:'',
      todoDesc:'',
      todoCreator:'',
      todoPriority:'Lowest'
    });
  }

  render() {
    return (
        <Form onSubmit={this.submitTodo}>
          <h2>Add New Todo Item</h2>
          <FormGroup row>
            <Col sm={6}>
              <Label for="todoT">Todo Title</Label>
              <Input type="text" name="todoTitle" id="todoT" value={this.state.todoTitle} onChange={this.handleInputChange} placeholder="Enter Todo Title" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={6}>
            <Label for="todoC">Todo Creator</Label>
            <Input type="text" name="todoCreator" id="todoC" value={this.state.todoCreator} onChange={this.handleInputChange} placeholder="Type Creator's name" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={6}>
              <Label for="todoD">Todo Description</Label>
              <Input type="textarea" name="todoDesc" id="todoD" value={this.state.todoDesc} onChange={this.handleInputChange} placeholder="Enter Description"/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={6}>
              <Label for="todoP">Todo Priority</Label>
              <Input type="select" name="todoPriority" id="todoP" value={this.state.todoPriority} onChange={this.handleInputChange}>
              <option>High</option>
              <option>Medium</option>
              <option>Lowest</option>
              </Input>
            </Col>
          </FormGroup>
          <Button>Add Todo</Button>
        </Form>
    );
  }
}

export default App;
