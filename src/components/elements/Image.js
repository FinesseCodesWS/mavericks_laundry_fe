import React from "react";

export default function Image({ style, src, alt, className }) {
    return <img style={style} className={ className } src={ src } alt={ alt } />
}