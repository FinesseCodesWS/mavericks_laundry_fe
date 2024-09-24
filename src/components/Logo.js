import React from "react";
import { Link } from "react-router-dom";
import { Text, Image } from "./elements";

export default function Logo({ src, alt, name, href, className }) {
    return (
        <>
            {name ?
                <Link to={ href } className={`mc-logo-group ${ className }`}>
                    <Image src={ src } alt={ alt } style={{width: "60px", height: "60px"}}/>
                    <Text as="span">{ name }</Text>
                </Link>
            :
                <Link to={ href } className={`mc-logo ${ className }`}>
                    <Image src={ src } alt={ alt } style={{width: "70px", height: "70px"}}/>
                </Link>
            }
        </>
    )
}