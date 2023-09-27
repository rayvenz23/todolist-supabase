import React, { useState, useEffect, } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Form,
  Alert,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import useAuthsStore from '../../store/Auth';

const Login = () => {
  const navigate = useNavigate();
  const {
    authUser, 
    todoList, 
    addTodoItem, 
    signOut, 
    getTodoList, 
    deleteItem,
    editTodoItem,
  } = useAuthsStore();
  const [newTask, setNewTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    if (!authUser) {
      //navigate('login');
    }
  }, [authUser]);

  const addNewItem = () => {
    addTodoItem({ task: newTask });
    setNewTask('');
  }

  const onStartEdit = (item) => {
    setEditId(item.id);
    setEditTask(item.task);
  }

  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col sm="3" />
          <Col sm="6">
            <Card className="w-100" >
              <Card.Header>
                <Card.Title ><h1>To do List</h1></Card.Title>
              </Card.Header>
              <Card.Body>
                {
                  todoList?.map((item) => {
                    return (
                      <Card >

                        {
                          editId === item.id ?
                          <Card.Body className="d-flex align-items-center" >
                            <Form.Control type="text" placeholder="Type a to-do" value={editTask} onChange={(e) => setEditTask(e.target.value)} />
                            <Button variant="info" className="py-1 px-2 mx-1" onClick={() => {
                              editTodoItem({
                                id: item.id,
                                task: editTask,
                              });
                              setEditId(null);
                            }}>Save</Button>
                            <Button variant="danger" className="py-1 px-2" onClick={() => {
                              setEditId(null);
                            }}>Cancel</Button>
                          </Card.Body>
                          :
                          <Card.Body className="d-flex align-items-center" >
                            <span style={{ flex: 1 }}>{item.task}</span>
                            <Button variant="info" className="py-1 px-2 mx-1" onClick={() => {
                              onStartEdit(item)
                            }}>Edit</Button>
                            <Button variant="danger" className="py-1 px-2" onClick={() => {
                              deleteItem({ id: item.id })
                            }}>X</Button>
                          </Card.Body>
                        }
                      </Card>
                    )
                  })
                }
                <Card className="mt-3">
                  <Card.Body>
                    <Form className="mb-10 d-flex" >
                      <Form.Control type="text" placeholder="Type a to-do" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                      <Button disabled={!newTask} className="mx-1" onClick={() => addNewItem()}>Add</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Card.Body>
              <Card.Footer>
                <Button variant="secondary" onClick={() => signOut()} >Sign out</Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm="3" />
        </Row>
      </Container>
    </div>
  );
}

export default Login;
