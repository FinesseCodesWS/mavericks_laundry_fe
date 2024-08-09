import React from "react";
import { Fieldset, Legend, Select, Option, Input } from "../elements";

export default function LegendField({ title, type, value, placeholder, fieldSize, option, className, name, onChange, activeOption, ...rest }) {
    return (
        <Fieldset className={`mc-fieldset ${ className ? className : "" }`}>
            <Legend>{ title || "legend" }</Legend>
            {option ? 
                <Select className={`${ fieldSize || "w-100 h-md" }`}>
                    <Option>{ activeOption || "Select Option" }</Option>
                    {option.map((item, index)=> (
                        <Option key={ index } value={ item }>{ item }</Option>
                    ))}
                </Select>
            :
                <Input 
                onChange={onChange}
                name={name}
                    type = { type || "text" } 
                    defaultValue = { value } 
                    placeholder = { placeholder || "Type here..." }
                    className = {`${ fieldSize || "w-100 h-md" }`}
                    { ...rest } 
                />
            }
        </Fieldset>
    )
}