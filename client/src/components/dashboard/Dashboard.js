import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

//components
import InputTodo from './todolist/InputTodo';
import ListTodos from './todolist/ListTodo';

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState('');
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    const getProfile = async () => {
        try {
            const response = await fetch('/dashboard/', {
                method: 'GET',
                headers: { token: localStorage.token }
            });

            const parseResponse = await response.json();
            setAllTodos(parseResponse);
            setName(parseResponse[0].user_name);

        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
        toast.success('Logout Successful');
    };

    //runs the useEffect function to prevent page refresh
    useEffect(() => {
        getProfile(); //notices that the state has changed and gets all todos and profile information again
        setTodosChange(false); //sets Todos state back to false so that when another change happens, it reruns the useEffect function
    }, [todosChange]);

    return (
    <Fragment>
        <div className='d-flex mt-5 justify-content-around'>
            <h2>{name}'s Todo List</h2>
            <button 
                className='btn btn-primary'
                onClick={e => logout(e)}>
                Logout
            </button> 
        </div>
        <InputTodo setTodosChange={setTodosChange}/> 
        <ListTodos allTodos={allTodos} setTodosChange={setTodosChange}/>
    </Fragment>
    );
};

export default Dashboard;