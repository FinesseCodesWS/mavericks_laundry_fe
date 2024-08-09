
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Text, List, Item, Image, Anchor, Heading, Icon, Button } from "../../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../../components/elements/Table";
import CardLayout from "../../../components/cards/CardLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/invoiceDetails.json";
import { useLocation, useNavigate } from "react-router-dom";
import { DivideTitle } from "../../../components";
import { CustomerReview, RatingAnalytics } from "../../../components/review";
import { LabelTextarea } from "../../../components/fields";
import datas from "../../../data/master/productView.json";
import { X } from "react-feather";
import Currency from "react-currency-formatter";





export default function SalesInvenortyDetails() {

    const location = useLocation()

    const [salesdata, setSalesdata] = useState(null)
    const navigate = useNavigate()
    


    useEffect(() => {
        
        const setpage= () => {
            if(location?.state){
                // console.log(location?.state?.sales)
                setSalesdata(location?.state?.sales)
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
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb className=' d-flex bg-drk' title={ 'Sales Inventory Details' }>
                    
                
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : 'Sales Inventory Details' }
                                </Item>
                            ))}
                  
                        </Breadcrumb>
                    </CardLayout>
                </Col>   
                         <div style={{width: '20px'}} onClick={back}>
                            <botton  className='btn btn-dark btn-sm'><X></X></botton> 
                        </div>
                <CardLayout className="p-lg-5 mt-2">
                <Row>
                    <Col xl={4}>
                        <DivideTitle title="Details" className="mb-4" />
                        <Box className="" >
                             <Image style={{maxWidth: '250px'}} src={ salesdata?.image ||  'images/food-icons.jpg'} alt={ 'img' } />
                             
                        </Box>
                    </Col>



                    <Col xl={7} className=''>
                    <DivideTitle title="" className="mb-4 mt-2" />
                        <Box className="mc-product-view-info-group">        
                            
                                <Box className="mc-product-view-meta w-100">
                                    {/* <Icon type={ 'star' } /> */}
                                    <Heading as="h5">Product Name</Heading>
                                    <Text as="span">:</Text>
                                     <Text as="p">{   salesdata?._id  }</Text> 
                                
                                </Box>
                                <Box className="mc-product-view-meta">
                                    {/* <Icon type={ 'star'  } /> */}
                                    <Heading as="h5">Quantity</Heading>
                                    <Text as="span">:</Text>
                                     <Text as="p">
                                     {salesdata?.count}

                                     </Text> 
                                
                                </Box>
                                <Box className="mc-product-view-meta">
                                    {/* <Icon type={ 'star'  } /> */}
                                    <Heading as="h5">Unit Price</Heading>
                                    <Text as="span">:</Text>
                                     <Text as="p">
                                     <Currency
                                        quantity={salesdata?.unitPrice}
                                        currency="NGN"
                                     />

                                     </Text> 
                                
                                </Box>
                                <Box className="mc-product-view-meta">
                                    {/* <Icon type={ 'star'  } /> */}
                                    <Heading as="h5">Revenue</Heading>
                                    <Text as="span">:</Text>
                                     <Text as="p">{   salesdata?.revenue   }</Text> 
                                
                                </Box>
                            
                               
                        </Box>
                    </Col>
                
                </Row>
            </CardLayout>

{/* 
                                { item?.list &&
                                    <List>
                                        {item.list.map((item, index) => (
                                            <Item key={ index }>{ item }</Item>
                                        ))}
                                    </List>
                                } */}









            </Row>
        </PageLayout>
    )
}