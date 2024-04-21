import React from "react";
import { Fragment } from 'react';
import InputToDo from "./InputToDo";
import ListToDos from "./ListToDo";

const ToDoMain = () => {

    return <Fragment>
        <div className='container'>
            <InputToDo />
            <ListToDos />
        </div> 
    </Fragment>;
}
export default ToDoMain;