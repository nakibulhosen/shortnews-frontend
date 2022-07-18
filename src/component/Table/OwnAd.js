//react
import React, { useEffect, useState } from "react";

//react-router-dom
import { Link, useHistory } from "react-router-dom";

//MUI Switch
import IOSSwitch from "@material-ui/core/Switch";

//alert
import { permissionError, warningForText } from "../../util/Alert";

//Action
import {
  getOwnAd,
  deleteOwnAd,
  showOwnAd,
} from "../../Store/Advertisement/advertisement.action";

//react-redux
import { connect, useSelector, useDispatch } from "react-redux";

//type
import { OPEN_OWN_AD_DIALOG } from "../../Store/Advertisement/advertisement.type";

//Pagination
import TablePaginationActions from "./Pagination";
import { TablePagination } from "@material-ui/core";

const OwnAd = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //define state
  const { ownAd } = useSelector((state) => state.advertisement);
  const hasPermission = useSelector((state) => state.admin.flag);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    props.getOwnAd();
  }, []);

  useEffect(() => {
    setData(ownAd);
  }, [ownAd]);

  const handleOpenInsert = () => {
    localStorage.removeItem("updateOwnAdData");
    localStorage.removeItem("ownAdViewDetails");
    history.push("/admin/customAd/customAdDialog");
  };

  //update button
  const handleOpenUpdate = (value) => {
    localStorage.removeItem("ownAdViewDetails");
    dispatch({ type: OPEN_OWN_AD_DIALOG, payload: value });
    localStorage.setItem("updateOwnAdData", JSON.stringify(value));

    history.push("/admin/customAd/customAdDialog");
  };

  // Delete Function
  const handleOpenDelete = (value) => {
    let text;

    text = `Total ${
      value.impressions == undefined ? 0 : value.impressions
    } impressions and ${
      value.clicks == undefined ? 0 : value.clicks
    } clicks will be deleted !`;

    const data = warningForText(text);
    data
      .then((isDeleted) => {
        if (isDeleted) {
          if (!hasPermission) return permissionError();

          props.deleteOwnAd(value._id);
        }
      })
      .catch((err) => console.log(err));
  };

  //Handle Change Show
  const handleChangeShow = (id) => {
    if (!hasPermission) return permissionError();

    props.showOwnAd(id);
  };

  //View Details Function
  const handleViewDetails = (value) => {
    localStorage.removeItem("updateOwnAdData");
    dispatch({ type: OPEN_OWN_AD_DIALOG, payload: value });
    localStorage.setItem("ownAdViewDetails", JSON.stringify(value));
    history.push("/admin/customAd/customAdViewDetails");
  };

  //Paggination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Handle search function

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = ownAd.filter((data) => {
        return (
          data?.title?.toUpperCase()?.indexOf(value) > -1 ||
          data?.impressions?.toString()?.indexOf(value) > -1 ||
          data?.clicks?.toString()?.indexOf(value) > -1 ||
          data?.publisherName?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(ownAd);
    }
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Own Ad</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li class="breadcrumb-item active">Custom Ad</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-row align-items-center justify-content-between ">
                <button
                  type="button"
                  className="btn  text-white  px-2"
                  style={{ backgroundColor: "#2a3042" }}
                  onClick={handleOpenInsert}
                >
                  <i class="fas fa-plus fa-md"></i>&nbsp; New
                </button>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 float-right mt-3 mb-2 mt-lg-0 mt-xl-0">
                  <form className="app-search">
                    <input
                      type="search"
                      placeholder="Searching for..."
                      aria-describedby="button-addon4"
                      className="form-control"
                      onChange={handleSearch}
                    />
                    <a className="srh-btn">
                      <i className="ti-search"></i>
                    </a>
                  </form>
                </div>
              </div>
              <div class="table-responsive ">
                <table class="table mb-0">
                  <thead class="table-light ">
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Publisher Name</th>
                      <th>Impressions</th>
                      <th>Clicks</th>
                      <th>Active/Inactive</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    {data.length > 0 ? (
                      (rowsPerPage > 0
                        ? data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((value, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>

                            <td>{value?.title}</td>
                            <td>
                              {value?.publisherName != "undefined" &&
                              value?.publisherName != "null"
                                ? value?.publisherName
                                : "-"}
                            </td>
                            <td className="text-center">
                              {value.impressions ? value.impressions : 0}
                            </td>
                            <td className="text-center">
                              {value.clicks ? value.clicks : 0}
                            </td>
                            <td className="text-center">
                              <IOSSwitch
                                checked={value?.show}
                                color="primary"
                                onClick={() => handleChangeShow(value._id)}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary btn-rounded text-white"
                                onClick={() => handleOpenUpdate(value)}
                              >
                                <i class="fas fa-pencil-alt fa-xs"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-rounded text-white"
                                onClick={() => handleOpenDelete(value)}
                              >
                                <i class="far fa-trash-alt fa-sm"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-success btn-rounded text-white"
                                onClick={() => handleViewDetails(value)}
                              >
                                <i class="fas fa-eye fa-sm"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No data found !
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  50,
                  100,
                  { label: "All", value: data.length },
                ]}
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getOwnAd, deleteOwnAd, showOwnAd })(OwnAd);
