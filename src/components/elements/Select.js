import React from "react";

export default function Select({ children, className, onChange, ...rest }) {
    return <select className={ className } onChange={ onChange }  { ...rest }>{ children }</select>
}