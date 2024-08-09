import React from "react";
import { Box, List, Heading } from "./elements";

export default function Breadcrumb({ title, children, className, subtitle }) {
    return (
        <Box className={`mc-breadcrumb ${ className ? className : "" }`}>
            
            <Heading className="mc-breadcrumb-title text-w">{ title }
            <h6>{subtitle}</h6>
            </Heading>
            <List className="mc-breadcrumb-list">{ children }</List>
        </Box>
    )
}