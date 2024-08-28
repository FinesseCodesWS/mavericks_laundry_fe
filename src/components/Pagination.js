import React from "react";
import ReactPaginate from "react-paginate";
import { Box, Icon, Item, List, Text } from "./elements";

export default function Paginate({
  currentPage,
  handlePagination,
  data,
  setCurrentPageCoupon,
  currentPageCoupon,
  setPageCountCoupon,
  pageCountCoupon,
  setCurrentPageStaff,
  currentPageStaff,
  setPageCountStaff,
  pageCountStaff,
  setCurrentPageInvoice,
  currentPageInvoice,
  setPageCountInvoice,
  pageCountInvoice,
  setCurrentPageLog,
  currentPageLog,
  setPageCountLog,
  pageCountLog,
  setCurrentPageCustomer,
  currentPageCustomer,
  setPageCountCustomer,
  pageCountCustomer,
  setCurrentPageMenu,
  currentPageMenu,
  setPageCountMenu,
  pageCountMenu,
  setCurrentPageInventory,
  currentPageInventory,
  setPageCountInventory,
  pageCountInventory,
  setCurrentPageTrending,
  currentPageTrending,
  setPageCountTrending,
  pageCountTrending,
}) {
  const nextPagination = (page, string) => {
    if (string === "coupon") {
      return setCurrentPageCoupon(page.selected + 1);
    } else if (string === "staff") {
      return setCurrentPageStaff(page.selected + 1);
    } else if (string === "invoice") {
      return setCurrentPageInvoice(page.selected + 1);
    } else if (string === "log") {
      return setCurrentPageLog(page.selected + 1);
    } else if (string === "customer") {
      return setCurrentPageCustomer(page.selected + 1);
    } else if (string === "menu") {
      return setCurrentPageMenu(page.selected + 1);
    } else if (string === "inventory") {
      return setCurrentPageInventory(page.selected + 1);
    } else if (string === "trending") {
      return setCurrentPageTrending(page.selected + 1);
    }
  };

  return (
    <Box className="mc-paginate">
      <Text className="mc-paginate-title">
        Showing{" "}
        <b>
          {currentPageCoupon ||
            currentPageStaff ||
            currentPageInvoice ||
            currentPageLog ||
            currentPageCustomer ||
            currentPageMenu ||
            currentPageInventory ||
            currentPageTrending}
        </b>{" "}
        of{" "}
        <b>
          {pageCountCoupon ||
            pageCountStaff ||
            pageCountInvoice ||
            pageCountLog ||
            pageCountCustomer ||
            pageCountMenu ||
            pageCountInventory ||
            pageCountTrending}
        </b>{" "}
        Results
      </Text>

      <ReactPaginate
        // forcePage={currentPageInvoice}
        onPageChange={(page) => {
          if (currentPageCoupon) {
            nextPagination(page, "coupon");
          } else if (currentPageStaff) {
            nextPagination(page, "staff");
          } else if (currentPageInvoice) {
            nextPagination(page, "invoice");
          } else if (currentPageLog) {
            nextPagination(page, "log");
          } else if (currentPageCustomer) {
            nextPagination(page, "customer");
          } else if (currentPageMenu) {
            nextPagination(page, "menu");
          } else if (currentPageInventory) {
            nextPagination(page, "inventory");
          } else if (currentPageTrending) {
            nextPagination(page, "trending");
          }
        }}
        pageCount={
          Math.ceil(
            (pageCountCoupon ||
              pageCountStaff ||
              pageCountInvoice ||
              pageCountLog ||
              pageCountCustomer ||
              pageCountMenu ||
              pageCountInventory ||
              pageCountTrending) / 20
          ) || 1
        }
        breakLabel={"..."}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="mc-paginate-item active"
        pageClassName="mc-paginate-item"
        breakClassName="mc-paginate-item"
        nextLinkClassName="mc-paginate-item"
        // pageLinkClassName='mc-paginate-item'
        breakLinkClassName="mc-paginate-item"
        previousLinkClassName="mc-paginate-item"
        nextClassName="mc-paginate-item"
        previousLabel={<Icon type="chevron_left" />}
        nextLabel={<Icon type="chevron_right" />}
        previousClassName="page-item prev-item"
        containerClassName={"mc-paginate-list"}
      />
    </Box>
  );
}
