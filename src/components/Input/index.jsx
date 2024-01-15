import React, { forwardRef } from "react";

export const InputM = (
    { label, required, error, renderInput = undefined, name = "", ...restInputProps },
    ref
) => {
    return (
        <div className="form-group">
            <label className="label" htmlFor={name}>
                {label} {required && <span>*</span>}
            </label>

            {renderInput?.({ ...restInputProps, ref: ref }) || (
                <input
                    ref={ref}
                    className={`form-control ${!!error ? "input-error" : ""}`}
                    name={name}
                    id={name}
                    {...restInputProps}
                />
            )}

            <p className="form-error" style={{ minHeight: 23 }}>
                {error || ""}
            </p>
        </div>
    );
};

export const Input = forwardRef(InputM);
