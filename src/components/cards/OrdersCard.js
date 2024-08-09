import React from "react";
import { CardHeader } from ".";
import { OrdersChart } from "../charts";
import { Box, List, Item, Heading, Text, Icon } from "../elements";



const COLORS = [ 'purple', 'blue', 'green',  'yellow',   'red' ];
// const COLORS = [ '#de2fff', '#4094f1', '#27bf68', '#cc304f', '#edb213'];


        // { "name": "pending", "value": 547, "color": "purple", "icon": "pending" },
        // { "name": "shipped", "value": 398, "color": "blue", "icon": "add_circle" },
        // { "name": "recieved", "value": 605, "color": "green", "icon": "check_circle" },
        // { "name": "cancelled", "value": 249, "color": "brown", "icon": "cancel" },
        // { "name": "refunded", "value": 176, "color": "yellow", "icon": "error" }

export default function OrdersCard({ title, dotsMenu, items }) {
    return (
        <Box className="mc-card">
            <CardHeader title={title} dotsMenu={dotsMenu} />
            <OrdersChart chart={ items } />
            <List className="mc-order-card-list">
                {items.map((item, index) => (
                    <Item key={ index } className="mc-order-card-item">
                        <Icon className={`material-icons ${ COLORS[index] }`}>{ item.icon }</Icon>
                        <Text as="p" className={`status purple `}>{ item?._id }</Text>
                        <Heading as="h5">{ item?.soldItemCount }</Heading>
                    </Item>
                ))}
            </List>
        </Box>
    )
}

// purple
// ${ COLORS[index]}