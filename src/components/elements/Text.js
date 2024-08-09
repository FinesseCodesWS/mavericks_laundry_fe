import React from "react";

export default function Text({ as, style, children, className, title }) {
    const Component = as || "p";
    return <Component title={title} className={ className } style={ style }>{ children }</Component>
}