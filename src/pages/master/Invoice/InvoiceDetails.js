import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Box, Text, List, Item, Image, Anchor, Heading } from "../../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../../components/elements/Table";
import CardLayout from "../../../components/cards/CardLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/invoiceDetails.json";
import { useLocation, useNavigate } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
import  Currency  from 'react-currency-formatter';
import { useSelector } from "react-redux";
import { X } from "react-feather";










export default function InvoiceDetails() {
    const user = useSelector(state => state.auth.userPOSData)

    const [invoicedata, setInvoicedata] = useState(null)

    const [grandTotal, setGrandTotal] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [dimension, setDimension] = React.useState(0)
    const [height, setHeight] = React.useState(0)

    const componentRef = useRef();
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        setDimension(componentRef?.current?.clientHeight)
        setHeight(invoicedata?.items?.length  <= 2 ?  1.5 : invoicedata?.items?.length  <= 4   ? 1.8 : invoicedata?.items?.length  <= 7 ? 2 :  invoicedata?.items?.length  <= 10 ? 2.5 :  invoicedata?.items?.length  <= 15 ? 3 :  3.5)
        // console.log(dimension, height)
    
        // console.log(dimension)
        // console.log(componentRef?.current?.clientHeight)
        return () => {
          setDimension(0)
          setHeight(0)
        }
      }, [componentRef?.current?.clientHeight])

      
    const handlePrint =  useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@media print{
        @page {
            size: 120mm ${dimension /height}mm;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 20px;
            margin-top: 0 !important;
            line-height: 1px;
            background-color: red !important;
        }
        html, body {
            background-color: red !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }
    }
    `
    // 366
    // size: 80mm ${componentRef?.current?.clientHeight}mm;
    // pageStyle: `{ size: 1in 1in }`
    // pageStyle: `{ size: 3in 4in }`
    // pageStyle: `{ size: 2.5in 4in }`
    // 80mm
    });


    


    useEffect(() => {

        const calculateSalesTotal = async ()=>{
            if(invoicedata?.items.length > 0){
                let  totalG  = 0
                let  totalQ  = 0
                let  totalA  = 0
                let  totalD  = 0
                    
                invoicedata?.items?.map((c)=>{
                    totalG += Number(c.menuId?.unitPrice * c.quantity - ( (c?.menuId?.unitPrice * c?.quantity) * (c?.discount || 0 )/100)  )})
                    setGrandTotal(totalG)
    
                invoicedata?.items?.map((c)=>{totalA += Number(c.menuId?.unitPrice * c.quantity)})
                setTotalAmount(totalA)


            }else{
                setTotalQuantity(0)
                setTotalAmount(0)
                setTotalDiscount(0)
                setGrandTotal(0)
            }
        }
    
        calculateSalesTotal()

    
      return () => {
                 setTotalQuantity(0)
                setTotalAmount(0)
                setTotalDiscount(0)
                setGrandTotal(0)
      }
    }, [invoicedata])
    


    useEffect(() => {
        
        const setpage= () => {
            if(location?.state){
                // console.log(location?.state?.invoice)
                setInvoicedata(location?.state?.invoice)
            }
        }

        setpage()
    
      return () => {
   
      }
    }, [location?.state])
    











 const back = ()=>{
    navigate(-1)
 }



    return (
        <PageLayout>
            <Row className=''  style={{width:'70vw'}}>
                <div style={{width: '20px'}} onClick={back}>
                    <button  className='btn btn-dark btn-sm'><X></X></button> 
                </div>
            {/* <Breadcrumb title={ 'Sales Details' } className='bg-white'>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : 'Sales Details' }
                                </Item>
                            ))}
            </Breadcrumb> */}

                <Col xl={12}  className="mt-0"   ref={componentRef}>
      
                    <CardLayout className="p-md-5 p-0">
                        <Box className="mc-invoice-head">
                            {/* <Image src={"images/product/single/maverick_logos.png" } alt={ data?.logo.alt } /> */}
                    <Heading as="h2">Maverick's</Heading>
                        </Box>




                        <Box className="mc-invoice-group mx-3">
                            <Box className="mc-invoice-recieved">
                                <Heading as="h6">Invoice: {invoicedata?.invoiceId}</Heading>
                                {/* <Text>Name:  Walk-In Customer </Text> */}
                                {/* <Text>Mobile:  09082827272</Text> */}
                          
                            </Box>
                        </Box>
                        {/* <Text>User: {userPhoneNumber?.value || "Walk-In Customer" }  </Text>
                        {/* <Text>Mobile:  09082827272</Text> */}
                        {/* <Text>Seller: {user?.role}</Text> */} 










                        <Box className="mc-table-responsive mx-0 px-0" >
                            <Table className="mc-table p-0">
                                <Thead className="mc-table-head">
                                    <Tr>
                                        {data.table.thead.map((item, index) => (
                                            item !== 'X' ?   <Th
                                            style={{ fontWeight: 'bolder', fontSize: '16px'}}
                                             key={ index }>{ item }</Th> : <></>
                                        
                                        ))}




                                    </Tr>
                                </Thead>
                                <Tbody className="mc-table-body">
                                    {invoicedata?.items?.map((item, index) => (
                                        <Tr style={{fontSize: '15px'}} key={ index }>
                                            {/* <Td>{ item?.salesId }</Td> */}
                                            <Td
                                            style={{fontSize: '15.5px'}}
                                            >{ item?.menuId?.itemName }
                                                {/* <Box className="mc-table-product sm">
                                                    <Image src={ item?.menuId?.image  ||  'images/food-icons.jpg' } alt={ 'img' } />
                                                    <Text>{ item?.menuId?.itemName }</Text>
                                                </Box> */}
                                            </Td>
                                            <Td
                                                style={{fontSize: '15.5px'}}
                                            >{ item?.menuId?.unitPrice }</Td>
                                            {/* <Td>{ item?.discount || 0 }</Td> */}
                                            <Td 
                                                style={{fontSize: '15.5px'}}
                                            >{ item?.quantity }</Td>
                                            <Td
                                            
                                            style={{fontSize: '15.5px'}}
                                            >{ Number(item?.menuId?.unitPrice * item?.quantity) - ( (item?.menuId?.unitPrice * item?.quantity ) * (item?.discount || 0 )/100) }</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                        <Box className="mc-invoice-list-group">
                            <List className="mc-invoice-list">

                                 
                                <Item>
                                    <Text as="span" className="title"  style={{ width: '70px'}}>Subtotal : </Text>
                                
                                    <Text as="span"  className='digit' >
                                    <Currency
                                        quantity={totalAmount}      
                                        currency="NGN"            
                                    />
                                       </Text>
                                </Item>
                                {/* <Item>
                                    <Text as="span" className="title">Discount</Text>
                                    <Text as="span" className="clone">:</Text>
                                    <Text as="span"  className='digit' >{0}</Text>
                                </Item> */}

                                {
                                   invoicedata?.discount  >= 1 && (
                                    <Item>
                                        <Text as="span" className="title" style={{ width: '70px'}}>Coupon :</Text>
                                      
                                        <Text as="span"  className='digit' >
                                        <Currency
                                            quantity={invoicedata?.discount}      
                                            currency="NGN"            
                                        />
                                        </Text>
                                    </Item>

                                   ) 
                                }


                                {
                                    invoicedata?.vat >= 1 && (
                                        <Item>
                                            <Text as="span" className="title"  style={{ width: '70px'}}>Tax :</Text>
                                           
                                            <Text as="span"  className='digit' >
                                            <Currency
                                                quantity={invoicedata?.vat}      
                                                currency="NGN"            
                                            /> <>{`(${invoicedata?.vat *100 / totalAmount}%)`}</>
                                            </Text>
                                        </Item>
                                    )
                                }
                                <Item>
                                    <Text as="span" className="title" style={{ width: '70px'}}>Total :</Text>
                                    
                                    <Text as="span"  className='digit total' >
                                        {
                                            (invoicedata?.discount >= 1 && invoicedata?.vat >= 1) ?(
                                                <Currency
                                                quantity={(grandTotal +  invoicedata?.vat) -  invoicedata?.discount}    
                                                currency="NGN"            
                                            />
                                            ): 
                                            invoicedata?.discount >= 1  ?  
                                            (
                                                <Currency
                                                quantity={grandTotal - invoicedata?.discount}   
                                                currency="NGN"            
                                            />
                                            ) :  invoicedata?.vat >= 1 ?  
                                            (
                                                <Currency
                                                quantity={grandTotal + invoicedata?.vat}      
                                                currency="NGN"            
                                            />
                                            ) : (
                                                <Currency
                                                quantity={grandTotal}      
                                                currency="NGN"            
                                            />
                                            )
                                        }
                                 
                                       </Text>
                                </Item>
                                <Item>
                                    <Text as="span" className="title"  style={{ width: '70px'}}>Status :</Text>
                                   
                                    <Text as="span"  className='status purple' >complete</Text>
                                </Item>




                            
                            </List>
                        </Box>
                        <Text style={{fontSize:'12px'}}>
                        Thank you for patronizing us.
                        
                        
                        {/* (VAT has been calculated as per GO 02/Mushak/2019).  */}
                        
                        {/* This is a sytem generated invoice and no signature or seal is required. */}
                        </Text>
                        <Text className="m-0 p-0 " style={{fontSize:'12px'}}>
                            <i>You were served by <b>{ user?.emergencyContact?.fullName ||  `the ${user?.role}`  }</b>.</i>
                        </Text>
                        
                    </CardLayout>
                </Col>

                <Col>

                <CardLayout>

                        <Box className="mc-invoice-btns">
                            <Anchor 
                                onClick={handlePrint}
                                href={'#' }
                                icon={'print' }
                                text={ 'print this receipt' }
                                className={ 'btn btn-success' }
                            /> 

                        </Box>
                </CardLayout>

                </Col>
            </Row>
        </PageLayout>
    )
}