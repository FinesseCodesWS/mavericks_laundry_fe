import React from "react";

export default function Box({ as, children, className, style, ref }) {
    const Component = as || "div";
    return <Component style={ style }  ref={ref} className={ className }>{ children }</Component>
}