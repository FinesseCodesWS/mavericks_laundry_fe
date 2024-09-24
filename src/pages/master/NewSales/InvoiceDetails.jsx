import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Text,
  List,
  Item,
  Image,
  Anchor,
  Heading,
} from "../../../components/elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../../components/elements/Table";
import CardLayout from "../../../components/cards/CardLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/invoiceDetails.json";

import { useReactToPrint } from "react-to-print";
import { makeSalesAction, makeSalesWithCouponAction } from "../../../API/sales";

import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";

export default function InvoiceDetails({
  tableList,
  grandTotal,
  totalDiscount,
  totalAmount,
  setAlertModal,
  clearCurrentTable,
  getAllMenu,
  userPhoneNumber,
  paymentMode,
  userDetails,
  clearUserData

}) {
  // const [alertModal, setAlertModal] = React.useState(false);
  const [invoiceId, setInvoiceId] = React.useState(null);
  const user = useSelector(state => state.auth.userPOSData)
  const [dimension, setDimension] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const ref = useRef(null)

  // console.log(paymentMode, userDetails)

  const componentRef = useRef();

  
  useEffect(() => {
    setDimension(componentRef?.current?.clientHeight)
    setHeight(tableList?.tbody?.length  <= 2 ?  1.5 : tableList?.tbody?.item?.length  <= 4   ? 1.8 : tableList?.tbody?.length  <= 7 ? 2 :  tableList?.tbody?.length  <= 10 ? 2.5 :  tableList?.tbody?.length  <= 15 ? 3 :  3.5)
    // console.log(dimension, height)

    // console.log(componentRef?.current?.clientHeight)
    console.log(paymentMode)
    return () => {
      setDimension(0)
      setHeight(0)
    }
  }, [componentRef?.current?.clientHeight])

  

  // setDimension(componentRef?.current?.clientHeight)
  // const list = [].l 
  const handlePrint =  useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@media print{
      @page {
        size: 80mm ${dimension / height }mm;
        margin: 0px !important;
        padding: 0px !important;
        font-size: 20px;
        margin-top: 0px !important;
        line-height: 1px;
      }

    }
    `

    // overflow-x: hidden;
    // size: 120mm ${dimension}mm;



    // height: ${dimension}
    // 366
    // size: 80mm ${componentRef?.current?.clientHeight}mm;
    // pageStyle: `{ size: 1in 1in }`
    // pageStyle: `{ size: 3in 4in }`
    // pageStyle: `{ size: 2.5in 4in }`
    // 80mm
  });

  const makeSale = async () => {
    setIsLoading(true)
    const theUser = userPhoneNumber?.value === "Walk In Customer" ? null : userPhoneNumber?.value

    if(tableList?.item?.coupon?.couponId){
      // const res = await makeSalesWithCouponAction(tableList?.allSales, theUser, tableList?.coupon?.couponId);
      const res = await makeSalesWithCouponAction(tableList?.allSales, userDetails?.phone, tableList?.coupon?.couponId, userDetails?.name, paymentMode[0]);
      console.log(res);
      if (res) {
        let data = { ...tableList };
        data.invoiceId = res?.invoice?.invoiceId;
  
        setInvoiceId(res?.invoice?.invoiceId);
  
        setTimeout(() => {
          setIsLoading(false)
          handlePrint();
          setAlertModal(false);
          clearCurrentTable();
          clearUserData()
          getAllMenu();
        }, 1000);
      }else {
        setIsLoading(false)
      }
    }else {
      const ress = await makeSalesAction(tableList?.allSales, userDetails?.phone, userDetails?.name, paymentMode[0]);
      if (ress) {
        let data = { ...tableList };
        data.invoiceId = ress?.invoice?.invoiceId;
  
        setInvoiceId(ress?.invoice?.invoiceId);
  
        setTimeout(() => {
          setIsLoading(false)
          handlePrint();
          setAlertModal(false);
          clearCurrentTable();
          clearUserData()
          getAllMenu();
        }, 1000);
      }else{
        setIsLoading(false)
      }
    }






   
  };     
//  style={{ fontSize: '12px'}}
  return (
    <Row className="mt-0" style={{width:'25vw', fontSize: '15px' }}>
      <Col className="mt-0 pt-0" xl={12} ref={componentRef} style={{ fontSize: '15px'}}>
        <CardLayout className=" mt-0 pt-3" style={{ fontSize: '15px'}}>
          <Box className="mc-invoice-head mt-0" style={{ fontSize: '12px'}}>
            {/* <Image
            className='mt-0'
              style={{width: '35px', height: '35px', boxFit:'cover'}}
              src={"images/product/single/maverick_logos_dark.png"}
              alt={data?.logo?.alt}
            /> */}
            <Heading style={{fontWeight: 'bolder'}} as="h5">Maverick's Laundry</Heading>
          </Box>

          <Box className="mc-invoice-group m-0">
            <Box className="mc-invoice-recieved mx-3">
              {invoiceId && <Heading style={{ fontWeight: 'bold', fontSize: '10px'}} as="h6">Invoice: {invoiceId}</Heading>}
              {/* <Text>User: {userPhoneNumber?.value || "Walk-In Customer" }  </Text> */}
              {/* <Text>Mobile:  09082827272</Text> */}
              {/* <Text>Seller: {user?.role}</Text> */}
            </Box>
          </Box>

          <Box className="mc-table-responsive" style={{ fontWeight: 'bolder', overFlow: 'hidden'}} >
            <Table className="mc-table "   style={{ overFlow: 'hidden'}}>
            {/* minWidth:'20vw',  */}
              <Thead style={{lineHeight: '2px', overFlow: 'hidden'}} className="mc-table-head ">
                <Tr>
                  {data.table.thead.map((item, index) =>
                    item !== "X" ? <Th className='' style={{ fontWeight: 'bolder', fontSize: '9px'}} key={index}>{item}</Th> : <></>
                  )}
                </Tr>
              </Thead>
              <Tbody style={{lineHeight: '1px', overFlow: 'hidden'}} className="mc-table-body ">
                {tableList.tbody.map((item, index) => (
                  <Tr key={index} style={{fontSize: '9px'}}>
        
                    <Td className=''  style={{fontWeight: 'bold', fontSize: '9px', maxWidth: '25px'}}>
                      {/* <Box className="mc-table-product sm">
                        <Image
                          src={item?.image || item?.default_image}
                          alt={item?.alt}
                        />
                      </Box> */}
                        {/* <Text>  {item?.itemName}</Text> */}
                        {item?.item?.itemName}
                    </Td>
                    <Td style={{fontWeight: 'bold', fontSize: '9px'}} className='' >{item?.price?.price}</Td>
                    {/* <Td>{item?.discount}</Td> */}
                    <Td style={{fontWeight: 'bold', fontSize: '9px'}} className='' >{item?.item?.quantity_bought}</Td>
                    <Td style={{fontWeight: 'bold',  fontSize: '9px'}} className='' >
                      {Number((item?.price?.price * item?.item?.quantity_bought) + (item?.addonPrice * item?.item?.quantity_bought)) -
                        (item?.price?.price *
                          item?.item?.quantity_bought *
                          item?.item?.discount) /
                          100}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Box className="mc-invoice-list-group">
            <List className="mc-invoice-list">
              <Item>
                <Text as="span"  style={{ fontWeight: 'bold', width: '75px', fontSize: '11px'}} className="">
                  Subtotal:     
                </Text>
                {/* <Text as="span" className="clone">
                  :
                </Text> */}
                <Text as="span" style={{  fontWeight: 'bold', fontSize: '11px'}}  className="digit">
                  <Currency quantity={tableList?.totalAmount} currency="NGN" />
                </Text>
              </Item>
              {/* <Item>
                <Text as="span" className="title">
                  Discount
                </Text>
                <Text as="span" className="clone">
                  :
                </Text>
                <Text as="span" className="digit">
                  <Currency
                    quantity={Number(tableList?.totalDiscount)}
                    currency="NGN"
                  />
                </Text>
              </Item> */}

              {
                tableList?.coupon?.amount && (
                    <Item>

                        <Text style={{ fontWeight: 'bold', width: '70px', fontSize: '11px'}}  as="span" className="">
                        Coupon : 
                        </Text>
                        {/* <Text as="span" className="clone">
                        :
                        </Text> */}
                        <Text style={{  fontWeight: 'bold', fontSize: '11px'}}  as="span" className="digit">
                        {tableList?.coupon?.amount &&
                        tableList?.coupon?.type === "percentage" ? (
                            <>
                            <span style={{marginRight: '3px', fontSize: '11px'}}>
                                <Currency
                                
                                quantity={
                                    (tableList?.totalAmount * tableList?.coupon?.amount) /
                                    100
                                }
                                currency="NGN"
                                />

                            </span>
                            <span style={{ fontSize: '11px'}}>({`${tableList?.coupon?.amount}%`})</span>

                            </>
                        ) : tableList?.coupon?.type === "absolute" ? (
                            <Currency
                            quantity={tableList?.coupon?.amount}
                            currency="NGN"
                            />
                        ) : (
                            <></>
                        )}
                        </Text>
                    </Item>

                )
              }

              {/* <>
              
                 { tableList?.tax?.amount}
              
              
              </> */}
              {
                (tableList?.tax?.amount >= 1) && 
                ( tableList?.totalAmount >=   tableList?.tax?.threshold) &&
                 (
                    <Item>

                        <Text style={{ fontWeight: 'bold', width: '70px', fontSize: '11px'}}  as="span" className="">
                        Tax :
                        </Text>
                        {/* <Text as="span" className="clone">
                        :
                        </Text> */}
                        <Text style={{ fontWeight: 'bold', fontSize: '11px'}}  as="span" className="">

                          <span  style={{marginRight: '3px', fontWeight: 'bold', fontSize: '11px'}}>
                          <Currency
                                  
                                  quantity={

                                   tableList?.taxValue
                                  }
                                  currency="NGN"
                                  />

                          </span>
                          <span style={{ fontWeight: 'bold', fontSize: '11px'}}>({`${tableList?.tax?.amount}%`})</span>
                        </Text>
                    </Item>

                )
              }
              <Item className=''>
                <Text style={{  fontWeight: 'bold', width: '70px', fontSize: '12px'}} as="span" className=" ">
                  Total :
                </Text>
                {/* <Text as="span" className="clone">
                  :
                </Text> */}
                <Text style={{ fontWeight: 'bolder', fontSize: '12px'}} as="span" className=" total">
                  {tableList?.coupon?.amount &&
                  tableList?.coupon?.type === "percentage" ? (
                    <Currency
                      quantity={
                      (  (tableList?.totalAmount >=   tableList?.tax?.threshold) ? tableList?.taxValue : 0 ) +   (tableList?.grandTotal -
                        (tableList?.totalAmount * tableList?.coupon?.amount) /
                          100)   
                      }
                      currency="NGN"
                    />
                  ) : tableList?.coupon?.type === "absolute" ? (
                    <Currency
                    currency="NGN"
                      quantity={
                        (  (tableList?.totalAmount >=   tableList?.tax?.threshold) ? tableList?.taxValue : 0 ) +   
                       ( tableList?.grandTotal - tableList?.coupon?.amount)
                      }
                    
                    />
                  ) :   tableList?.tax?.amount ?  
                  <Currency
                  currency="NGN"
                    quantity={
                      (  (tableList?.totalAmount >=   tableList?.tax?.threshold) ?
                      tableList?.taxValue : 0 ) +  (tableList?.grandTotal ) 

                    } />
                  
                  
                  : (
                    <Currency quantity={tableList?.grandTotal} currency="NGN" />
                  )
                  
                  }
                </Text>
              </Item>

              {invoiceId && (
                <Item className="mt-0 pt-0">
                  <Text  style={{ fontWeight: 'bold', width: '70px', fontSize: '12px'}} as="span" className=" mt-0 pt-0">
                    Status :
                  </Text>
                  {/* <Text as="span" className="clone">
                    :
                  </Text> */}
                  <Text  style={{ fontWeight: 'bold', fontSize: '12px'}} as="span" className="status purple mx-0">
                    complete
                  </Text>
                </Item>
              )}
            </List>
          </Box>
          <Text className=" mt-0 pt-0"  style={{fontSize:'11px'}}>
            Thank you for patronizing us.
            {/* (VAT has been calculated as per GO 02/Mushak/2019).  */}
            {/* This is a sytem generated invoice and no signature or seal is required. */}
          </Text>
          <Text className="m-0 p-0 " style={{fontSize:'11px'}}>
            <i>You were served by <b>{ user?.emergencyContact?.fullName ||  `the ${user?.role}` }</b>.</i>
          </Text>
        </CardLayout>
      </Col>

      <Col className=''>
        <CardLayout className="d-flex justify-content-end px-0 ">
          <Row className="justify-content-center justify-items-center text-center w-100 px-0">
            <Col xs={12} sm={6} md={5} xl={4}  >
              <Box className="mc-invoice-btns mx-1`">
                <Anchor
                  style={{ fontSize: '10px'}}
                  onClick={() => setAlertModal(false)}
                  href={"#"}
                  icon={"cancel"}
                  text={"cancel"}
                  className={"btn btn-danger px-2"}
                />
              </Box>
            </Col>

            <Col xs={12} sm={6} md={7} xl={8}  className="mx-0 ">
              <Box className="mc-invoice-btns mx-1"  style={{ fontSize: '12px', fontWeight: 'bolder'}}>
                {
                  isLoading ? (
                    <Anchor
                    style={{ fontSize: '10px', cursor:'not-allowed'}}
                    //  onClick={makeSale}
                     href={"#"}
                     icon={"refresh"}
                     text={"loading.........."}
                     className={"btn btn-success disabled px-1 mx-0"}
                   />
                  ) : (
                    <Anchor
                    style={{ fontSize: '10px'}}
                     onClick={makeSale}
                     href={"#"}
                     icon={"print"}
                     text={"confirm transaction"}
                     className={"btn btn-success px-1 mx-0"}
                   />
                  )
                }
                {/* <Anchor
                 style={{ fontSize: '10px'}}
                  onClick={makeSale}
                  href={"#"}
                  icon={"print"}
                  text={"confirm transaction"}
                  className={"btn btn-success px-1 mx-0"}
                /> */}
              </Box>
            </Col>
          </Row>
        </CardLayout>
      </Col>

      
    </Row>
  );
}
