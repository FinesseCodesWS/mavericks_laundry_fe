import React from "react";

export default function Heading({ as, style,  children, className }) {
    const Component = as || "h3";
    return <Component style={style} className={ className }>{ children }</Component>
}