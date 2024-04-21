import React, { Fragment, useState } from "react";

const EditToDo = ({toDo}) => {
    //note: toDo is destructured

    const [description, setDescription] = useState(toDo.description);

    const updateDescription = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos/" + toDo.todo_id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    //console.log(toDo);

    return <Fragment>
        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${toDo.todo_id}`}>
            Edit
        </button>

        <div 
            className="modal" 
            id={`id${toDo.todo_id}`}
            onClick={() => { setDescription(toDo.description) }}
            >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>{setDescription(toDo.description)}}></button>
                    </div>

                    <div className="modal-body">
                        <input type="text"  className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>

                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-warning" 
                            data-bs-dismiss="modal"
                            onClick={e => updateDescription(e)}
                            >
                            Edit
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            data-bs-dismiss="modal" 
                            onClick={() => { setDescription(toDo.description) }}>
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>

    </Fragment>
};
export default EditToDo;