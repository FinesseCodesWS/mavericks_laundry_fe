import React from "react";
import DotsMenu from "../DotsMenu";
import { Box, Icon, Text, Heading } from "../elements";
import Currency from "react-currency-formatter";

export default function EcommerceCard({ variant, trend, number, title, icon, percent, compare, dotsMenu }) { 
    return (
        <Box className={`mc-ecommerce-card ${ variant }`}>
            <Icon className="mc-ecommerce-card-trend material-icons">{ trend }</Icon>
            <Box className="mc-ecommerce-card-head my-0">
                <Heading as="h4" className="mc-ecommerce-card-meta my-0 py-0"  style={{fontSize: '22px'}}>
                    <Text className='mb-0 pb-0' as="" style={{fontSize: '12px'}}>{ title }</Text >
                    <div className='m-0 p-0' style={{maxWidth: '250px', wordBreak:'break-word'}}>
                        { (title === 'Total Revenue' || title === 'Today Total Revenue')  ? (
                            <Currency
                            style={{fontSize: '12px'}}
                            currency="NGN"  
                            quantity={ number || 0  } />
                        ) :  number }

                    </div>
                </Heading>
                <Icon className="mc-ecommerce-card-icon material-icons">{ icon }</Icon>
            </Box>
            <Box className="mc-ecommerce-card-foot my-0">
                <Box className="mc-ecommerce-card-compare">
                    <Text as="mark">{ percent }</Text>
                    <Text as="span">{ compare }</Text>
                </Box>
                <DotsMenu dots={ dotsMenu.dots } dropdown={ dotsMenu.dropdown } />
            </Box>
        </Box>
    );
}