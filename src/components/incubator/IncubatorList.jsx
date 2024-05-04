import React from "react";
import IncubatorListRow from "./IncubatorListRow";
import { useEffect } from "react";

const IncubatorList = () => {

    const [incubators, setIncubators] = React.useState([]);

    async function getIncubators() {
        try {
            const response = await fetch("http://localhost:5000/incubator");
            const jsonData = await response.json();

            setIncubators(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getIncubators();
    }, []);

    

    return (<div className="container">
        
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Location</th>
                    <th>Level</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    incubators.map((x) => {
                        return <IncubatorListRow incubator={x} key={x.id}/>
                    })
                }
            </tbody>
        </table>
    </div>);
}

export default IncubatorList;