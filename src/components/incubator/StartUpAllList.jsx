import React, { useState, useEffect } from "react";

const StartUpAllList = () => {

    const [startUps, setStartUps] = useState([]);

    const [roleFilter, setRoleFilter] = useState("");

    const currencyDisplaySetting = {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    async function getStartUps(role) {
        try {
            const response = await fetch("http://localhost:5000/startup/getWithRoleFilter?roleFilter=" + role);
            const jsonData = await response.json();

            setStartUps(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleRoleFilterChange(event){
        
        const callerId = event.target.id;
        let newValue = "";
        switch (callerId) {
            case "roleAll":
                newValue = "";
                break;
            case "roleHustler":
                newValue = "Hustler";
                break;
            case "roleHipster":
                newValue = "Hipster";
                break;
            case "roleHacker":
                newValue = "Hacker";
                break;
        }
        setRoleFilter(newValue);
        getStartUps(newValue);
    }


    async function deleteStartup(startup) {
        try {
            if (window.confirm("Are you sure you want to delete this startup?")) {
                const response = await fetch("http://localhost:5000/startup/" + startup.id, {
                    method: "DELETE",
                    headers: { "Content-type": "application/json" },
                });

                if (response.ok) {
                    getStartUps(roleFilter);
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
        getStartUps(roleFilter);
    }, []);


    return (<div className="container">
        <h1>Start-Up</h1>

        <div className="btn-group" role="group">
            <input type="radio" className="btn-check" name="btnradio" id="roleAll" onChange={handleRoleFilterChange} checked={roleFilter === ""} />
            <label className="btn btn-outline-primary" htmlFor="roleAll">All</label>

            <input type="radio" className="btn-check" name="btnradio" id="roleHustler" onChange={handleRoleFilterChange} checked={roleFilter === "Hustler"} />
            <label className="btn btn-outline-primary" htmlFor="roleHustler">Hustler</label>

            <input type="radio" className="btn-check" name="btnradio" id="roleHipster" onChange={handleRoleFilterChange} checked={roleFilter === "Hipster"} />
            <label className="btn btn-outline-primary" htmlFor="roleHipster">Hipster</label>

            <input type="radio" className="btn-check" name="btnradio" id="roleHacker" onChange={handleRoleFilterChange} checked={roleFilter === "Hacker"} />
            <label className="btn btn-outline-primary" htmlFor="roleHacker">Hacker</label>
        </div>


        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Start-Up and Founder Name</th>
                    <th>Role of Founder</th>
                    <th>Valuation</th>
                    <th>Incubator Code</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    
                    startUps.map((x) => {
                        return (<tr key={x.id}>
                            <td>{x.startUpName} - {x.founderName}</td>
                            <td>{x.roleOfFounder}</td>
                            <td>{x.valuation.toLocaleString("id", currencyDisplaySetting)}</td>
                            <td>{x.Incubator.code}</td>
                            <td><button type="button" className="btn btn-outline-danger" onClick={() => { deleteStartup(x) }}>Delete</button></td>
                        </tr>);
                    })
                }
            </tbody>
        </table>

    </div>);
}
export default StartUpAllList;