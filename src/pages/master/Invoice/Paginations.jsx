







import React from "react";
import ReactPaginate from "react-paginate";
import { Box, Icon, Item, List, Text } from "../../../components/elements";

export default function Paginations({currentPage, handlePagination, count,  dataLenght, pageLimit}) {



    const nextPagination = (page)=>{
        handlePagination(page)
    }





    return (
        <Box className="mc-paginate">
            {
                dataLenght ? (
                    <Text className="mc-paginate-title">Showing <b>{dataLenght}</b> of <b>{count}</b> Results</Text>

                ) : <></>
            }
            {/* <List className="mc-paginate-list">
                <Item className="mc-paginate-item">
                    <Icon type="chevron_left" />
                </Item>
                <Item className="mc-paginate-item active">1</Item>
                <Item className="mc-paginate-item">2</Item>
                <Item className="mc-paginate-item">3</Item>
                <Item className="mc-paginate-item">...</Item>
                <Item className="mc-paginate-item">45</Item>
                <Item className="mc-paginate-item">
                    <Icon type="chevron_right" />
                </Item>
            </List> */}
            <ReactPaginate

                forcePage={currentPage}
                onPageChange={page => nextPagination(page)}
                pageCount={Math.ceil(count / pageLimit) || 1}
                breakLabel={'...'}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                activeClassName='mc-paginate-item active'
                pageClassName='mc-paginate-item'
                breakClassName='mc-paginate-item'
                nextLinkClassName='mc-paginate-item'
                // pageLinkClassName='mc-paginate-item'
                breakLinkClassName='mc-paginate-item'
                previousLinkClassName='mc-paginate-item'
                nextClassName='mc-paginate-item'
                
                previousLabel={
                    (
                        <Icon type="chevron_left" />
                    )
                }
                nextLabel={
                    (
                        <Icon type="chevron_right" />
                    )
                }
                previousClassName='page-item prev-item'
                containerClassName={'mc-paginate-list'}   
            />
        </Box>
    )
}



{/* <ReactPaginate
previousLabel={''}
nextLabel={''}
forcePage={currentPage}
onPageChange={page => handlePagination(page)}
pageCount={searchValue.length ? Math.ceil(filteredData.length / 20) : Math.ceil(count / 20) || 1}
breakLabel={'...'}
pageRangeDisplayed={2}
marginPagesDisplayed={2}
activeClassName='active'
pageClassName='page-item'
breakClassName='page-item'
nextLinkClassName='page-link'
pageLinkClassName='page-link'
breakLinkClassName='page-link'
previousLinkClassName='page-link'
nextClassName='page-item next-item'
previousClassName='page-item prev-item'
containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'}   
/>  */}