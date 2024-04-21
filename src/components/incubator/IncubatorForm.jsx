
import React, { useState } from "react";

const IncubatorForm = () => {

    const [incubator, setIncubator] = useState({
        name: "",
        location: "",
        level: "International",
    });

    function handleIncubatorChange (event) {
        const newValue = event.target.value;
        const callerName = event.target.name;
        const callerId = event.target.id;

        setIncubator((prevValue) => {
            switch (callerName) {
                case "name":
                    return {...prevValue,name: newValue};
                case "location":
                    return { ...prevValue,location: newValue};
                case "level":
                    switch (callerId){
                        case "levelInternational":
                            return { ...prevValue, level: "International" };
                        case "levelNational":
                            return { ...prevValue, level: "National" };
                        case "levelProvince":
                            return { ...prevValue, level: "Province" };
                    }
                    break;
            }
        });
    }

    async function handleSubmit (event){
        event.preventDefault();

        console.log(incubator);

        try {
            const response = await fetch("http://localhost:5000/incubator", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(incubator)
            });

            alert("success creating new incubator");
            window.location = "/incubators";
        } catch (error) {
            console.error(error);
        }
    }


    return (<div className="container">
        <h1>Create New Incubator</h1>
        <h3>Please fill the form below to add a new Incubator!</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">The name of The Incubator?</label>
                <input type="text" className="form-control" value={incubator.name} name="name" onChange={handleIncubatorChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">The location of The Incubator?</label>
                <input type="text" className="form-control" value={incubator.location} name="location" onChange={handleIncubatorChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">The level of The Incubator?</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="level" id="levelInternational" value="International" onChange={handleIncubatorChange} checked={incubator.level === "International"}/>
                    <label className="form-check-label" htmlFor="levelInternational">
                        International
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="level" id="levelNational" value="National" onChange={handleIncubatorChange} checked={incubator.level === "National"} />
                    <label className="form-check-label" htmlFor="levelNational">
                        National
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="level" id="levelProvince" value="Province" onChange={handleIncubatorChange} checked={incubator.level === "Province"} />
                    <label className="form-check-label" htmlFor="levelProvince">
                        Province
                    </label>
                </div>
            </div>
            <button className="btn btn-success" type="submit">
                Submit
            </button>
            
        </form>
    </div>);
}

export default IncubatorForm;