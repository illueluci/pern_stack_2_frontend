import React, { Fragment, useState } from "react";

const InputToDo = ()=>{

    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            //console.log(response);
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }

        
    };

    return <Fragment>
        <h1 className="text-center mt-5">Input Todo</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>

            
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => {setDescription(e.target.value)}}
                    />
                <button className="btn btn-success">Add</button>
            </div>
        </form>
    </Fragment>
    
    
    
};
export default InputToDo;