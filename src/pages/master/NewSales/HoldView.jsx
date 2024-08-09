




import React from "react";
import { Dropdown } from "react-bootstrap";
import { Copy } from "react-feather";

import { DuelText, RoundAvatar } from "..";
import { Box, Icon, Text } from "../../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../../components/elements/Table";



// import { Anchor } from "../elements";










export default function HoldView({draftData, onSelectDraft, onDeleteDraft, onDeleteAllDraft,  }) {
    // console.log(draftData?.draftList[0])









    return (
        <Dropdown className="mc-header-user">
            <Dropdown.Toggle className="mc-dropdown-toggle">
                {/* <RoundAvatar src={ image } alt="avatar" size="xs" />
                <DuelText title={ name } descrip={ username } size="xs" /> */}
                <div  className="d-flex align-items-center" id='hold' style={{postion: 'absolute'}}>
                        <span className="mx-1">

                        Draft List
                        </span>
                        <span  style={{postion: 'absolute', top: 0,  right: 0}} className="badge badge-primary bg-danger">{draftData?.draftList?.length || 0 }</span>
                </div>
            </Dropdown.Toggle>



            <Dropdown.Menu align="end" className="mc-dropdown-paper">
            <Box className="mc-table-responsive tableContainer border shadow">
            <Table className="mc-table theTable">
                <Thead className="mc-table-head table-head bg-secondary ">
                    <Tr>       
                            <Th>S/N</Th>
                            {/* <Th>Stock</Th>
                            <Th>Quantity</Th> */}
                            <Th>Items</Th>
                            <Th>
                            {/* <Icon style={{color: 'green', }} type={ 'copy' } /> */}
                                <Copy/> 

                            </Th>
                            <Th>X</Th>
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body table-body">
                    {draftData?.draftList?.map((item, index) => (
                 
                                <Tr  key={ index } className='t-row'> 
                                    <Td className='product-name-col'>

                                    { index +1 }
                                        {/* <Box className="mc-table-icon py-0">
                                
                                            <Text className='text-primary'
                                                title={ item[0]?.itemName }
                                            >{ item[0]?.itemName }</Text>
                                            
                                        </Box> */}
                                            {/* <Icon type={ item?.item_name?.icon } /> */}
                                    </Td>
                                    {/* <Td >{ item[0]?.quantity }</Td>
                                    <Td >{ item[0]?.quantity_bought }</Td> */}
                                    <Td >{ item?.length }</Td>
                                    <Td > <Copy style={{cursor: 'pointer'}} onClick={()=>onSelectDraft(index)}/> </Td>
                                    <Td>
                                <Box className="mc-table-icon d-flex justify-content-center">
                                    <Icon onClick={()=>onDeleteDraft(index)}  style={{color: 'red', cursor: 'pointer'}} type={ 'delete' } />
                                </Box>
                            </Td>
                                </Tr>
                    ))}
                </Tbody>
            </Table>
                    {
                        draftData?.draftList?.length > 0 && (
                    <div className="d-flex justify-content-center text-danger w-100">
                        <span onClick={onDeleteAllDraft} style={{cursor: 'pointer'}}>Delete All</span>
                    </div>

                        )
                    }
        </Box>
           
            </Dropdown.Menu>
        </Dropdown>
    )
}