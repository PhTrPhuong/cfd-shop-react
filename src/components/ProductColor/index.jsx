import React, { forwardRef, useImperativeHandle, useState } from "react";

const ProductColor = ({ colors, defaultColor, onChange }, ref) => {
    const [selectedColor, setSelectedColor] = useState(defaultColor);

    useImperativeHandle(ref, () => {
        return {
            value: selectedColor,
            reset: () => {
                setSelectedColor(defaultColor);
            },
        };
    });

    const _onColorChange = (e, color) => {
        e?.stopPropagation();
        setSelectedColor(color);
        onChange?.(color);
    };

    return (
        <div className="product-nav product-nav-dots">
            {colors?.map((color, index) => (
                <div
                    key={index}
                    className={`product-nav-item ${
                        selectedColor === color ? "active" : ""
                    }`}
                    style={{ background: `${color}` }}
                    onClick={(e) => _onColorChange(e, color)}
                >
                    <span className="sr-only">{color}</span>
                </div>
            ))}
        </div>
    );
};

export default forwardRef(ProductColor);
