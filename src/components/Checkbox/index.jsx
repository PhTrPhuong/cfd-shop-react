import React from "react";

const Checkbox = ({ id, label, ...restInputProps }) => {
    return (
        <>
            <div className="custom-control custom-checkbox">
                <input
                    id={id}
                    type="checkbox"
                    className="custom-control-input"
                    {...restInputProps}
                />
                <label className="custom-control-label" htmlFor={id}>
                    {label}
                </label>
            </div>
            {/* <span className="item-count">9</span> */}
        </>
    );
};

export default Checkbox;
