import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box, Item, Anchor } from "../../components/elements";
import { EcommerceCard, SalesCard, ProductsCard, RevenueCard, ClientsCard, ActivityCard, OrdersCard } from "../../components/cards";
import { FilterMenuByCategoryAction, FilterMenuByStatusAction, getAllMenuAction, getAllMenuCategoryAction } from "../../API/menu";
import { GetAnalyticsAction, GetTrendingAction, GetTrendingWithDateWithDateAction } from "../../API/analytics";
import { getAllSalesAction, getAllSalesByDateAction } from "../../API/sales";





const analyticsHeroes =  [
    {
        "variant": "yellow",
        "title": "Today Total Sales",
        "number": "",
        "icon": "shopping_bag",
        "trend": "trending_up",
        "percent": "",
        "compare": "",
        "dotsMenu": {
            "dots": "",
            "dropdown": [
                // { "icon": "history", "text": "last day" },
                // { "icon": "history", "text": "last week" },
                // { "icon": "history", "text": "last month" },
                // { "icon": "history", "text": "last year" }
            ]
        }
    },
    {
        "variant": "yellow",
        "title": "Today Total Revenue",
        "number": "",
        "icon": "shopping_cart",
        "trend": "trending_up",
        "percent": "",
        "compare": "",
        "dotsMenu": {
            "dots": "",
            "dropdown": [
                // { "icon": "history", "text": "last day" },
                // { "icon": "history", "text": "last week" },
                // { "icon": "history", "text": "last month" },
                // { "icon": "history", "text": "last year" }
            ]
        }
    },
    {
        "variant": "green",
        "title": "Total Sales",
        "number": "",
        "icon": "shopping_bag",
        "trend": "trending_up",
        "percent": "",
        "compare": "",
        "dotsMenu": {
            "dots": "",
            "dropdown": [
                // { "icon": "history", "text": "last day" },
                // { "icon": "history", "text": "last week" },
                // { "icon": "history", "text": "last month" },
                // { "icon": "history", "text": "last year" }
            ]
        }
    },
    {
        "variant": "purple",
        "title": "Total Revenue",
        "number": "",
        "icon": "shopping_cart",
        "trend": "trending_up",
        "percent": "",
        "compare": "",
        "dotsMenu": {
            "dots": "",
            "dropdown": [
                // { "icon": "history", "text": "last day" },
                // { "icon": "history", "text": "last week" },
                // { "icon": "history", "text": "last month" },
                // { "icon": "history", "text": "last year" }
            ]
        }
    },
    {
        "variant": "blue",
        "title": "Total Products",
        "number": "",
        "icon": "shopping_bag",
        "trend": "trending_up",
        "percent": "",
        "compare": "",
        "dotsMenu": {
            "dots": "",
            "dropdown": [
                // { "icon": "history", "text": "last day" },
                // { "icon": "history", "text": "last week" },
                // { "icon": "history", "text": "last month" },
                // { "icon": "history", "text": "last year" }
            ]
        }
    },
    // {
    //     "variant": "yellow",
    //     "title": "total reviews",
    //     "number": "166",
    //     "icon": "hotel_class",
    //     "trend": "trending_up",
    //     "percent": "+ 45%",
    //     "compare": "last month",
    //     "dotsMenu": {
    //         "dots": "more_vert",
    //         "dropdown": [
    //             { "icon": "history", "text": "last day" },
    //             { "icon": "history", "text": "last week" },
    //             { "icon": "history", "text": "last month" },
    //             { "icon": "history", "text": "last year" }
    //         ]
    //     }
    // }
]





const trending = {
    "title": "Trending Product",
    "dotsMenu": {
        "dots": "more_horiz",
        "dropdown": [
            // { "icon": "history", "text": "last day" },
            // { "icon": "history", "text": "last week" },
            // { "icon": "history", "text": "last month" },
            // { "icon": "history", "text": "last year" }
        ]
    },
    "items": [
        // { "name": "pending", "value": 547, "color": "purple", "icon": "pending" },
        // { "name": "shipped", "value": 398, "color": "blue", "icon": "add_circle" },
        // { "name": "recieved", "value": 605, "color": "green", "icon": "check_circle" },
        // { "name": "cancelled", "value": 249, "color": "brown", "icon": "cancel" },
        // { "name": "refunded", "value": 176, "color": "yellow", "icon": "error" }
    ]
}


const todayTrending = {
    "title": "Today Trending Sales",
    "dotsMenu": {
        "dots": "more_horiz",
        "dropdown": [
            // { "icon": "history", "text": "last day" },
            // { "icon": "history", "text": "last week" },
            // { "icon": "history", "text": "last month" },
            // { "icon": "history", "text": "last year" }
        ]
    },
    "items": [
        // { "name": "pending", "value": 547, "color": "purple", "icon": "pending" },
        // { "name": "shipped", "value": 398, "color": "blue", "icon": "add_circle" },
        // { "name": "recieved", "value": 605, "color": "green", "icon": "check_circle" },
        // { "name": "cancelled", "value": 249, "color": "brown", "icon": "cancel" },
        // { "name": "refunded", "value": 176, "color": "yellow", "icon": "error" }
    ]
}

































const trends = {
    "data": {
        "sales": [
            {
                "_id": "water",
                "count": 32,
                "revenue": 0
            },
            {
                "_id": "cake",
                "count": 30,
                "revenue": 0
            },
            {
                "_id": null,
                "count": 14,
                "revenue": 22800
            },
            {
                "_id": "sausages",
                "count": 6,
                "revenue": 0
            },
            {
                "_id": "croissant",
                "count": 4,
                "revenue": 0
            }
        ]
    }
}



const revenue = {
    "data": {
        "sales": [
            {_id: null, count: 17, revenue: 35300},
            {
                "_id": "Thu Feb 09 2023",
                "revenue": 79800,
                "count": 44
            },
            {
                "_id": "Fri Feb 10 2023",
                "revenue": 21000,
                "count": 6
            }

        ]
    }
}










export default function Ecommerce() {
    const [analyticsHeroesUi, setAnalyticsHeroesUi] = useState(analyticsHeroes)
    const [trendingUi, setTrendingUi] = useState(trending)
    const [trendingUiToday, setTrendingUiToday] = useState(todayTrending)
    
    const [curTotalRevenue, setCurTotalRevenue] = useState(null)
    const [curSalesCount, setCurSalesCount] = useState(null)
    const [trendingProductList, setTrendingProductList] = useState([])
    const [salesCount, setSalesCount] = useState([])
    const [salesAmount, setSalesAmount] = useState([])
    const [todaySalesCount, setTodaySalesCount] = useState([])
    const [todaySalesAmount, setTodaySalesAmount] = useState([])



    
    const getSales = async  (page)=>{
        const res =  await  getAllSalesAction(page || 1)
        //   console.log(res)
        if(res){
            let sAmount = 0
 
            setSalesCount(res?.count)
            res?.data?.salesList?.map((c)=>{
                sAmount += Number(c.quantity  * c.menuId?.unitPrice) })
                setSalesAmount(sAmount)

                setAnalyticsHeroesUi([...analyticsHeroesUi?.map(e=>{
                    if(e.title ===  "Total Sales"){
                        e.number = res?.count
                        return e
                    }
                    return e
                }) ])
        }
    }


//   by date
  const getSalesByDate = async  (page)=>{
    const today = new Date().toDateString()

    const res =  await  GetTrendingWithDateWithDateAction(page || 1, today)


    let result =   res?.data?.sales   
    // console.log(res)

          if(result){
                let sAmount = 0
                let sCount = 0
                await  res?.data?.sales?.map((c)=>{
                    sAmount += Number(c?.revenue) 
                    sCount += Number(c?.salesCount) 
                })
                
                    setAnalyticsHeroesUi([...analyticsHeroesUi?.map(e=>{
                        if (e.title === "Today Total Revenue"){
                            e.number = sAmount
                                return e    
                        } else if (e.title === "Today Total Sales"){
                            e.number = sCount 
                            return e    
                            }  
                        return e
                    }) ])
   
            let res1 = result?.splice(0, 5)
            // console.log(res1)

            setTrendingUiToday({...trendingUiToday, items: res1?.map((e, i)=>{
                    e.name = res1[i]?._id
                    e.value = res1[i]?.soldItemCount
                    e.icon = 'check_circle'

                    return e
            }) })



          }

  }



  useEffect(() => {
    getSales()
    getSalesByDate()
}, [])










    
    useEffect(() => {
        const getRevenueAnalytics = async ()=>{


            // const res = await GetTrendingAction(1)

            // console.log(res)   
            // if(res){
            //   const result = res?.data?.sales
          
            //   let totalA = 0 
            //     //   let totalC = 0
            //   result?.map((c)=>{
            //       totalA += Number(c?.revenue)
            //     //   totalC += Number(c?.soldItemCount)
            //    })

            //    setAnalyticsHeroesUi([...analyticsHeroesUi?.map(e=>{
            //     if (e.title === 'Total Revenue'){
            //        e.number = totalA 
            //    }  
            //         return e
            //     }) ])

            // }









          const res =   await GetAnalyticsAction(1)
          if(res){
            setCurTotalRevenue(res?.sales?.[0]?.revenue)
            setCurSalesCount(res?.sales?.[0]?.count)


            setAnalyticsHeroesUi([...analyticsHeroesUi?.map(e=>{
                 if (e.title === 'Total Revenue'){
                    e.number = res?.sales?.[0]?.revenue 
                }  
                return e
            }) ])
          }










        }
   
        getRevenueAnalytics()
    
      return () => {
        
      }
    }, [])



    useEffect(() => {
        const getAllProductList = async ()=>{
            const res = await getAllMenuAction()
  

            if(res){
                setAnalyticsHeroesUi([...analyticsHeroesUi?.map(e=>{
                    if(e.title ===  "Total Products"){
                        e.number = res?.count
                        return e
                    }
                    return e
                }) ])
            }
        }

        getAllProductList()
      return () => {
        
      }
    }, [])


// trending
    useEffect(() => {
        const getTrendingAnalitics = async ()=>{
          const ress = await GetTrendingAction(1)
          let res =   ress?.data?.sales   

          if(res){
   
             res = res?.splice(0, 5)

            setTrendingUi({...trendingUi, items: res?.map((e, i)=>{
                    e.name = res[i]?._id
                    e.value = res[i]?.soldItemCount
                    e.icon = 'check_circle'

                    return e
            }) })
          }

        }
   
        getTrendingAnalitics()
    
      return () => {
                    
      }
    }, [])















    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Box className="mc-card">
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb?.map((item, index) => (
                                <Item key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </Item>
                            ))}
                        </Breadcrumb>
                    </Box>
                </Col>


                <Col xs={12} xl={12}> 
                    <Row xs={1} sm={3}>
                        {analyticsHeroes?.map((item, index) => (
                            <Col key={index}>
                                <EcommerceCard
                                    icon={item.icon}
                                    trend={item.trend}
                                    title={item.title}
                                    number={item.number}
                                    variant={item.variant}
                                    percent={item.percent}
                                    compare={item.compare}
                                    dotsMenu={item.dotsMenu}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>


                {/* <Col xs={12} xl={6}>
                    <SalesCard
                        title={data?.sales.title}
                        amount={data?.sales.amount}
                        percent={data?.sales.percent}
                        trendIcon={data?.sales.trendIcon}
                        dotsMenu={data?.sales.dotsMenu}
                        compare={data?.sales.compare}
                        chart={data?.sales.chart}
                    />
                </Col> */}
                <Col xl={6}>
                    <OrdersCard
                        title={trendingUi?.title}
                        // dotsMenu={trendingUi?.dotsMenu}
                        items={trendingUi?.items}
                        />
                </Col>
                <Col xl={6}>
                    <OrdersCard
                        title={trendingUiToday?.title}
                        // dotsMenu={trendingUiToday?.dotsMenu}
                        items={trendingUiToday?.items}
                        />
                </Col>



























                {/* <Col xl={12}>
                    <ProductsCard
                        title={data?.products.title}
                        dotsMenu={data?.products.dotsMenu}
                        table={data?.products.table}
                    />
                </Col> */}

                {/* useful */}
                {/* <Col xl={8}>
                    <RevenueCard
                        title={data?.revenue.title}
                        field={data?.revenue.field}
                        report={data?.revenue.report}
                        chart={data?.revenue.chart}
                    />
                </Col> */}






                {/* <Col xl={6}>
                    <ClientsCard
                        title={data?.clients.title}
                        dotsMenu={data?.clients.dotsMenu}
                        table={data?.clients.table}
                    />
                </Col>
                <Col xl={6}>
                    <ActivityCard
                        title={data?.activity.title}
                        dotsMenu={data?.activity.dotsMenu}
                        items={data?.activity.items}
                    />
                </Col> */}









            </Row>
        </PageLayout>
    );
}
