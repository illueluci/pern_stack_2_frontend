import React, { useState } from "react";
import { useParams } from 'react-router';
import { useEffect } from "react";

const StartUpForm = () => {
    const params = useParams()
    const paramIncubatorId = params.incubatorId;
    const paramStartupId = params.startupId;

    const [incubator, setIncubator] = useState({
        name: "",
        location: "",
        level: "",
        code: "",
    });
    const [startup, setStartup] = useState({
        id: 0,
        startUpName: "",
        founderName: "",
        educationOfFounder: "SMA",
        roleOfFounder: "Hacker",
        dateFound: getFormattedDate(),
        incubatorId: "",
        valuation: 0
    });
    const educationChoices = ["SMA","S1","S2","S3"]

    async function getOneIncubator() {
        try {
            let url = "";
            if (paramStartupId){
                url = "http://localhost:5000/startup/" + paramStartupId;
            } else {
                url = "http://localhost:5000/incubator/" + paramIncubatorId;
                //agak aneh sih cuma demi dapetin namanya musti ke backend, tapi ya sudahlah
            }

            const response = await fetch(url);
            const jsonData = await response.json();
            

            if (paramStartupId){
                setIncubator(jsonData.Incubator);
                setStartup({
                    id: jsonData.id,
                    startUpName: jsonData.startUpName,
                    founderName: jsonData.founderName,
                    educationOfFounder: jsonData.educationOfFounder,
                    roleOfFounder: jsonData.roleOfFounder,
                    dateFound: jsonData.dateFound.slice(0,10),
                    incubatorId: jsonData.IncubatorId,
                    valuation: jsonData.valuation
                });
            } else {
                setIncubator(jsonData);
                setStartup((prevValue) => {
                    return { ...startup, incubatorId: jsonData.id };
                });
            }

            

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getOneIncubator();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        //console.log(startup);
        try {
            let method = ""
            if (paramStartupId){
                method = "PUT";
            } else {
                method = "POST";
            }

            const response = await fetch("http://localhost:5000/startup", {
                method: method,
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(startup)
            });

            if (response.ok) {
                alert(`success ${paramStartupId ? "updating" : "creating new"} startup`);
                window.location = `/incubators/${paramIncubatorId}`;
            } else {
                console.log(response);
                alert(response.statusText);
            }

        } catch (error) {
            console.error(error);
        }
    }

    function handleStartupChange(event) {
        const newValue = event.target.value;
        const callerName = event.target.name;
        const callerId = event.target.id;

        setStartup((prevValue) => {
            switch (callerName) {
                case "startUpName":
                    return { ...prevValue, startUpName: newValue };
                case "educationOfFounder":
                    return { ...prevValue, educationOfFounder: newValue };
                case "founderName":
                    return { ...prevValue, founderName: newValue };
                case "dateFound":
                    return { ...prevValue, dateFound: newValue };
                case "valuation":
                    return { ...prevValue, valuation: newValue };
                case "role":
                    switch (callerId) {
                        case "roleHacker":
                            return { ...prevValue, roleOfFounder: "Hacker" };
                        case "roleHipster":
                            return { ...prevValue, roleOfFounder: "Hipster" };
                        case "roleHustler":
                            return { ...prevValue, roleOfFounder: "Hustler" };
                    }
                    break;
            }
        });
    }

    function getFormattedDate(){
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd;
        return formattedToday;
    }

    function debugFunc(){
        console.log(startup);
    }

    return  (<div className="container">
        <h1>Add new Start-Up</h1>
        <h3>Incubator Name: {incubator.name}</h3>

        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Startup Name</label>
                        <input type="text" className="form-control" value={startup.startUpName} name="startUpName" onChange={handleStartupChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Education of Founder</label>
                        {/* <input type="text" className="form-control" value={startup.educationOfFounder} name="educationOfFounder" onChange={handleStartupChange} /> */}
                        <select className="form-select" name="educationOfFounder" onChange={handleStartupChange} value={startup.educationOfFounder}>
                            {educationChoices.map((x, index)=>{
                                return (<option value={x} key={index}>{x}</option>);
                            })}
                            {/* <option selected>Open this select menu</option> */}
                            {/* <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Founder Name</label>
                        <input type="text" className="form-control" value={startup.founderName} name="founderName" onChange={handleStartupChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Role of Founder</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="role" id="roleHacker" value="Hacker" onChange={handleStartupChange} checked={startup.roleOfFounder === "Hacker"} />
                                <label className="form-check-label" htmlFor="roleHacker">
                                    Hacker
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="role" id="roleHipster" value="Hipster" onChange={handleStartupChange} checked={startup.roleOfFounder === "Hipster"} />
                                <label className="form-check-label" htmlFor="roleHipster">
                                    Hipster
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="role" id="roleHustler" value="Hustler" onChange={handleStartupChange} checked={startup.roleOfFounder === "Hustler"} />
                                <label className="form-check-label" htmlFor="roleHustler">
                                    Hustler
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Date Found</label>
                        <input type="date" className="form-control" value={startup.dateFound} name="dateFound" onChange={handleStartupChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Valuaton</label>
                        <input type="number" className="form-control" value={startup.valuation} name="valuation" onChange={handleStartupChange} />
                    </div>
                </div>
            </div>
            
            
            <button className="btn btn-success" type="submit">
                Submit
            </button>
            <button type="button" onClick={debugFunc}>
                test
            </button>

        </form>

    </div>);
}
export default StartUpForm;