import React from "react";

export const WeekCard = ({ value }) => {

    return (
        <div className="weekcard">
            <div className="weekholder">
                <div className="week">
                    <h1>Week Of</h1>
                    <p>{value.week}</p>
                </div>
            </div>
            <div className="holder">
                <div className="weekhours">
                    <h1>Hours</h1>
                    <p>{value.hours}</p>
                </div>
                <div className="weektips">
                    <h1>Tips</h1>
                    <p>{value.tips}</p>
                </div>
            </div>
        </div>
    )
}