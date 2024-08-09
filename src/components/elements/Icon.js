import React from "react";

export default function Icon({ as, className, style, type, onClick, children }) {
    const Component = as || "i";
    return (
        <Component style={ style } onClick={onClick} className={ className ? className : "material-icons" }>
            { type || children }
        </Component>
    )
}