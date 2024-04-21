import React from "react";
import IncubatorListRow from "./IncubatorListRow";

const IncubatorList = () => {

    const [incubators, setIncubators] = React.useState([]);

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