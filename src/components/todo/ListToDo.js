import React, { Fragment, useEffect, useState } from "react";
import EditToDo from "./EditToDo";

const ListToDos = ()=>{

    const [toDos, setToDos] = useState([]);

    const getToDos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setToDos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await fetch("http://localhost:5000/todos/" + id, {
                method: "DELETE"
            });
            const currentToDo = toDos.filter(x => x.todo_id !== id);
            setToDos(currentToDo);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getToDos();
    }, []);

    

    //console.log(toDos);

    return <Fragment>
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    toDos.map((todo)=>{
                        return <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditToDo toDo={todo}/>
                            </td>
                            <td><button type="button" className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>})
                }
                <tr>
                    
                </tr>
            </tbody>
        </table>
    </Fragment>
};

export default ListToDos;