import React from "react";
import { Box, Text, Icon, Heading } from "../elements";
import Currency from "react-currency-formatter";

export default function FloatCard({ variant, digit, title, icon, naira}) {
    return (
        <Box className={`mc-float-card ${ variant }`}>
            <>
                {
                    naira ? (
                        <>
                            <Heading>
                                <Currency
                                    style={{fontSize: '12px'}}
                                    currency="NGN"  
                                    quantity={ digit  || 0  } />
                            </Heading>
                            <Text>{ title }</Text>
                            <Icon>{ icon }</Icon>
                        
                        </>

                    ):(
                    
                        <>
                            <Heading>{ digit }</Heading>
                            <Text>{ title }</Text>
                            <Icon>{ icon }</Icon>
                        
                        </>
                    )
                }
            
            
            
            </>
        </Box>
    )
}


