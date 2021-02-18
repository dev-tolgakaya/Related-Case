import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SetTodos,DeleteTodos,UpdateTodos} from '../Redux/Actions/TodoActions';
import {SetUsers} from "../Redux/Actions/UserActions";
import {getTodosMethod, getUsers, deleteTodos, editTodo} from "../Root/Methods";
import {Button, Form, Modal, Table} from 'react-bootstrap';
import PaginationBar from "../Components/PaginationBar";
import { BsFillCaretDownFill,BsFillCaretUpFill } from "react-icons/bs";

class HomePage extends Component {
    state = {
        modalShow: false,
        modalTitle: null,
        modalCompleted: null,
        selectedTodo:null,
        selectedId: null,
        currentPage: 1,
        todosPerPage: 10,
        sortTodos : false
    }
    handleCallback = (childData) =>{
        this.setState({currentPage: childData})
    }


    componentDidMount = async () => {
        await getTodosMethod().then(res => {
            if (res.status === 200) {
                this.props.SetTodos(res.data)
                getUsers().then(a => {
                    this.props.SetUsers(a.data)
                })
            }
        }).catch(err => console.log(err))
    }

    modalOpen = (todo) => {
        this.setState({
            modalTitle: todo.title, modalCompleted: todo.completed, modalShow: true, selectedId: todo.id,selectedTodo:todo
        })
    }
    modalClose = () => {
        this.setState({
            modalTitle: null, modalCompleted: null, modalShow: false, selectedId: null,selectedTodo:null
        })
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () =>{
        this.setState({
            modalCompleted : !this.state.modalCompleted
        })
    }
    deleteTodo = async (id) => {
        await deleteTodos(id).then(res =>{
            if(res.status===200){
                this.props.DeleteTodos(id)
                setTimeout(()=> alert('Todo deleted successfully'),200)
            }
        })
    }
    updateTodo = async () => {
        const data = {
            title: this.state.modalTitle,
            completed: this.state.modalCompleted,
            userId:this.state.selectedTodo.userId,
            id:this.state.selectedTodo.id
        }
        await editTodo(this.state.selectedId, data).then(res => {
            if(res.status===200){
                this.modalClose()
                this.props.UpdateTodos(data)
                setTimeout(()=> alert('Todo updated successfully'),200)

            }
        })
    }

    todoSort =(property)=> {
        const sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {

            const result = (b[property] < a[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    render() {
        const {currentPage, todosPerPage} = this.state;
        const {todos} = this.props;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = this.state.sortTodos ?
            (todos.slice(indexOfFirstTodo, indexOfLastTodo)).sort(this.todoSort('completed')) :
            todos.slice(indexOfFirstTodo, indexOfLastTodo)
        return (
            <div>
                <Modal
                    onHide={this.modalClose}
                    show={this.state.modalShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Todo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Todo</Form.Label>
                                <Form.Control onChange={this.changeInput} name='modalTitle' value={this.state.modalTitle}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" name='modalCompleted' onClick={this.handleClick} checked={this.state.modalCompleted} label="Completed"/>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn btn-danger' onClick={this.modalClose}>Close</Button>
                        <Button className='btn btn-warning' onClick={this.updateTodo}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <div className='container mt-4'>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Assignee</th>
                            <th>Status <button style={{border:"none",justifyContent:'center',alignItems:'center'}} onClick={()=>this.setState({sortTodos:!this.state.sortTodos})}>
                                {this.state.sortTodos ?<BsFillCaretDownFill/> : <BsFillCaretUpFill/>}
                            </button>
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currentTodos.map(todo =>
                                <tr style={{width:'100%'}} key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td style={{ alignItems: "center", justifyContent: 'center'}}>
                                        {
                                            this.props.users.map(user => {
                                                    if (user.id === todo.userId) {
                                                        return (<td style={{border:'none'}} key={user.id}><p>{user.username}</p></td>)
                                                    }
                                                }
                                            )
                                        }
                                    </td>
                                    <td> {todo.completed ? <p>Done</p> : <p>In Progress</p>}</td>
                                    <td style={{ alignItems: "center", justifyContent: 'center'}}>
                                        <div className='row d-flex' style={{ alignItems: "center", justifyContent: 'center'}}>
                                            <button onClick={() => this.deleteTodo(todo.id)} className='btn btn-danger'>DELETE</button>
                                            <button onClick={() => this.modalOpen(todo)} className='btn btn-warning ml-1'>EDIT</button>
                                        </div>

                                    </td>
                                </tr>)
                        }
                        </tbody>
                    </Table>
                    <PaginationBar  todos={this.props.todos} handleCallback={this.handleCallback} currentPage={this.state.currentPage}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        users: state.users
    }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        SetUsers,
        SetTodos,
        DeleteTodos,
        UpdateTodos
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
