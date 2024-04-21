import React from "react";

const IncubatorListRow = (incubator) => {

    return (<tr>
        <td>{incubator.name}</td>
        <td>{incubator.code}</td>
        <td>{incubator.location}</td>
        <td>{incubator.level}</td>
        <td>
            <button type="button" className="btn btn-secondary">
                See Detail
            </button>
        </td>
    </tr>);
}

export default IncubatorListRow;