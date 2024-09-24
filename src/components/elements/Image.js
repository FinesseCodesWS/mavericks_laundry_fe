import React from "react";

export default function Image({ style, src, alt, className }) {
    console.log(style, src);
    return <img style={style} className={ className } src={ src } alt={ alt } />
}