import React from "react";

//pagination
import TablePagination from "react-js-pagination";

const ServerPagination = (props) => {
  const handlePage = (page) => {
    props.handlePageChange(page);
  };

  const handleRowsPerPage = (value) => {
    props.handleRowsPerPage(value);
  };
  return (
    <>
      <div className="d-md-flex justify-content-between ">
        <div className="d-flex">
          <span className="m-auto mx-0">Rows</span>
          <select
            class="form-select form-control mr-3 ml-2 mb-2 mb-md-0 mb-lg-0 pagination-dropdown"
            style={{ marginLeft: 5, marginTop: 22 }}
            onChange={(e) => {
              handleRowsPerPage(e.target.value);
            }}
          >
            <option class="text-dark" value="5">
              5
            </option>
            <option class="text-dark" value="10" selected>
              10
            </option>
            <option class="text-dark" value="25">
              25
            </option>
            <option class="text-dark" value="50">
              50
            </option>
            <option class="text-dark" value="100">
              100
            </option>
            <option class="text-dark" value="200">
              200
            </option>
            <option class="text-dark" value="500">
              500
            </option>
            <option class="text-dark" value="1000">
              1000
            </option>
            <option class="text-dark" value={props.userTotal}>
              ALL
            </option>
          </select>
        </div>
        <div className="align-middle mt-3">
          <TablePagination
            activePage={props.activePage}
            itemsCountPerPage={props.rowsPerPage}
            totalItemsCount={props.userTotal}
            pageRangeDisplayed={2}
            onChange={(page) => handlePage(page)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </>
  );
};

export default ServerPagination;
