import React from "react";

const Select = ({ options, error, ...restProps }) => {
    return (
        <div className="select-custom">
            <select
                className={`form-control ${!!error ? "input-error" : ""}`}
                {...restProps}
            >
                {options?.map((option, index) => (
                    <option key={option?.value || index} value={option?.value}>
                        {option?.label || ""}
                    </option>
                ))}

                {/* {options?.map(({ value, label }, index) => {
                    return (
                        <option key={value || index} value={value}>
                            {label || ""}
                        </option>
                    );
                })} */}
            </select>
        </div>
    );
};

export default Select;
