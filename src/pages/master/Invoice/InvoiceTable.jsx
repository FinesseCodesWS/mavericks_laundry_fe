



import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../../../components/elements/Table";
import { Heading, Anchor, Icon, Box, Text, Input, Image, Button } from "../../../components/elements";
import { useNavigate } from "react-router-dom";

const InvoiceTable = ({ thead, tbody, actionhandler }) => {




    const [alertModal, setAlertModal] = React.useState(false);
    const [curID, setCurID] = React.useState(null);
    const [data, setData] = useState([]);



    const navigate = useNavigate()


    useEffect(()=> { setData(tbody) }, [tbody]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if(name === "allCheck") {
            const checkData = data?.map((item)=> {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((item) => 
                item.name === name ? {...item, isChecked: checked} : item
            );
            setData(checkData);
        }
    }


    const openModal = (id)=>{
        setAlertModal(true)
        setCurID(id)
    }


    const modaltap = ()=>{
        actionhandler('DELETE', curID)
        setAlertModal(false)
    }



    const goToDetails = (data)=>{
        navigate('/invoice-details', {state: { invoice: data }})
    }



    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
                    <Tr>
                        {/* <Th>
                            <Box className="mc-table-check">
                                <Input 
                                    type="checkbox" 
                                    name="allCheck"
                                    checked={ data?.filter((item)=> item.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
                                />
                                <Text>uid</Text>
                            </Box>
                        </Th> */}
                        {thead.map((item, index) => (
                            <Th key={ index }>{ item }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {data?.map((item, index) => (
                        <Tr key={ index }> 
                            {/* <Td>
                                <Box className="mc-table-check">
                                    <Input 
                                        type="checkbox" 
                                        name={item.name} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    />
                                    <Text>{ item.id }</Text>
                                </Box>
                            </Td> */}




                            <Td>{ item?.invoiceId }</Td>
                          
                            {/* <Td>{ item?.menuId?.unitPrice }</Td> */}
                            <Td>{ item?.totalQuantity }</Td>
                            <Td>{ item?.totalAmount}</Td>
                            <Td>{ item?.modeOfPayment?.join(', ')}</Td>
                            <Td>{ item?.updatedAt?.substring(0, 10) }</Td>
                            <Td>
                                <Box className="mc-table-action">

                                <Button title="View"  onClick={()=>goToDetails(item)}
                                    className="material-icons view">visibility</Button>

                                    {/* <Anchor title="View"
                                        onClick={()=>goToDetails(item)}
                                    
                                    className="material-icons view">visibility</Anchor> */}
                                    {/* <Anchor title="Download" href="#" className="material-icons download" download>download</Anchor> */}
                                    {/* <Button title="Delete" className="material-icons delete" onClick={()=> openModal(item?._id)}>delete</Button> */}
                                </Box>
                            </Td>
                            {/* 
                            <Td><Text className={`mc-table-badge primary`}>{ 'complete' }</Text></Td> */}
                          
                        </Tr>
                    ))}
                </Tbody>
            </Table>




            
            <Modal show={ alertModal } onHide={()=> setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this sales record?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setAlertModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={modaltap}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    )
}

export default InvoiceTable





