import React from "react";

const IncubatorListRow = (inc) => {

    const incubator = inc.incubator;

    return (<tr>
        <td>{incubator.name}</td>
        <td>{incubator.code}</td>
        <td>{incubator.location}</td>
        <td>{incubator.level}</td>
        <td>
            <a href={"/incubators/" + incubator.id} className="btn btn-secondary">
                See Detail
            </a>
        </td>
    </tr>);
}

export default IncubatorListRow;