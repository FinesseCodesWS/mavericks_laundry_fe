import React from "react";

export default function Input({ type, onSubmit, onKeyDown, onChange, name,  placeholder, disableed, className, ...rest }) {
    return <input type={ type || "text" } disabled={disableed} onKeyDown={onKeyDown} onSubmit={onSubmit} placeholder={ placeholder } className={ className } onChange={onChange} { ...rest } name={name} />
}