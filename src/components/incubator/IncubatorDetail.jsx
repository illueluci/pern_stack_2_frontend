import React, { useState } from "react";
import { useParams } from 'react-router';
import { useEffect } from "react";

const IncubatorDetail = () => {

    const paramId = useParams().incubatorId;

    const [incubator, setIncubator] = useState({
        name: "",
        location: "",
        level: "",
        code: "",
        valuation: 0,
        Startups: []
    });

    const [deletedStartup, setDeletedStartup] = useState({
        startUpName: "",
        founderName: "",
    })

    const currencyDisplaySetting = {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    }

    async function getOneIncubator() {
        try {
            const response = await fetch("http://localhost:5000/incubator/getIncubatorWithItsStartups/" + paramId);
            const jsonData = await response.json();

            setIncubator(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    function getYearDifference(stringDate1, stringDate2) {
        const date1 = new Date(stringDate1);
        const date2 = new Date(stringDate2);
        const diffTime = Math.abs(date2 - date1);
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        return diffYears;
    }

    async function deleteStartup(startup){
        try {
            if (window.confirm("Are you sure you want to delete this startup?")){
                const response = await fetch("http://localhost:5000/startup/" + startup.id, {
                    method: "DELETE",
                    headers: { "Content-type": "application/json" },
                });

                if (response.ok) {
                    setDeletedStartup({
                        startUpName: startup.startUpName,
                        founderName: startup.founderName,
                    });
                    getOneIncubator();

                } else {
                    console.log(response);
                    alert(response.statusText);
                }
            }

        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        getOneIncubator();
    }, []);


    return (<div className="container">
        <h1>{incubator.name}</h1>
        <h3>Code of Incubator: {incubator.code}</h3>
        {deletedStartup.startUpName ? <p className="text-danger fw-bold">Start-Up {deletedStartup.startUpName} with {deletedStartup.founderName} as founder has been removed.</p> : null}
        <p>Click <span>
                <a href={`/incubators/${incubator.id}/startup/add`} className="btn btn-dark">
                    Add
                </a>
            </span> to add StartUp
        </p>
        {incubator?.startups?.length === 0 ? <p>There is no startup yet</p> :null}

        {/* insert table here */}
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Start-Up Name</th>
                    <th>Founder Name</th>
                    <th>Age</th>
                    <th>Education</th>
                    <th>Role of Founder</th>
                    <th>Valuation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    incubator.Startups.map((startup) =>{
                        //console.log(startup.dateFound);
                        return (<tr key={startup.id}>
                            <td>{startup.startUpName}</td>
                            <td>{startup.founderName}</td>
                            <td>{getYearDifference(startup.dateFound.slice(0,10), new Date().toISOString().slice(0,10))}</td>
                            <td>{startup.educationOfFounder}</td>
                            <td>{startup.roleOfFounder}</td>
                            <td>{startup.valuation.toLocaleString("id", currencyDisplaySetting)}
                            </td>
                            <td>
                                <div className="d-flex gap-1">
                                    <a type="button" className="btn btn-outline-secondary" href={`/incubators/${incubator.id}/startup/${startup.id}/edit`}>Edit</a>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => {deleteStartup(startup)}}>Delete</button>
                                </div>
                            </td>
                        </tr>);
                    })
                }

                
            </tbody>
        </table>

        <h3>Valuation All Startup: {incubator.valuation.toLocaleString("id", currencyDisplaySetting)}</h3>
    </div>);
}
export default IncubatorDetail;