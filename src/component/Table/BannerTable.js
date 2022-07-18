//react
import React, { useEffect, useState } from "react";

//react-redux
import { connect, useDispatch, useSelector } from "react-redux";

//action
import { getBanner, deleteBanner } from "../../Store/Banner/banner.action";

// alert
import { permissionError, warning } from "../../util/Alert";

//MUI
import { TablePagination } from "@material-ui/core";

//dayjs
import dayjs from "dayjs";

//Pagination
import TablePaginationActions from "./Pagination";

//react-router-dom
import { Link } from "react-router-dom";

//types
import { OPEN_BANNER_DIALOG } from "../../Store/Banner/banner.type";

//dialogs
import BannerDialog from "../Dialog/BannerDialog";

const BannerTable = (props) => {
  const dispatch = useDispatch();

  //define states
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  //useSelector
  const { banner } = useSelector((state) => state.banner);
  const hasPermission = useSelector((state) => state.admin.flag);

  console.log(hasPermission);

  //useEffect for Get Data
  useEffect(() => {
    props.getBanner();
  }, []);

  //Set Data after Getting
  useEffect(() => {
    setData(banner);
  }, [banner]);

  //Open Dialog
  const handleOpen = () => {
    dispatch({ type: OPEN_BANNER_DIALOG });
  };

  //Update Dialog
  const updateDialogOpen = (data) => {
    dispatch({ type: OPEN_BANNER_DIALOG, payload: data });
  };

  // delete sweetAlert
  const openDeleteDialog = (value) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          if (!hasPermission) return permissionError();

          props.deleteBanner(value._id);
        }
      })
      .catch((err) => console.log(err));
  };

  //handle Search Function
  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = banner.filter((data) => {
        return data?.url?.toUpperCase()?.indexOf(value) > -1;
      });
      setData(data);
    } else {
      return setData(banner);
    }
  };

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Banner Table</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li class="breadcrumb-item active">Banner Table</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <div className="row my-3">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 float-left">
                  <button
                    type="button"
                    className="btn  text-white  px-2"
                    style={{ backgroundColor: "#2a3042" }}
                    onClick={handleOpen}
                  >
                    <i class="fas fa-plus fa-md"></i>&nbsp; New
                  </button>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 float-right mt-3 mb-2 mt-lg-0 mt-xl-0">
                  <form action="">
                    <div className="input-group  border rounded-pill">
                      <input
                        type="search"
                        placeholder="Searching for..."
                        aria-describedby="button-addon4"
                        className="form-control bg-none border-0 rounded-pill searchBar"
                        onChange={handleSearch}
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Url</th>
                      <th>Created At</th>
                      <th>Edit</th>
                      <th>Delete</th>
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
                            <td>
                              <img
                                className="shadow p-1 mb-2 bg-white rounded "
                                src={value?.image}
                                draggable="false"
                                height="50px"
                                width="50px"
                                alt="BannerImage"
                              />
                            </td>
                            <td>{value?.url}</td>
                            <td>
                              {dayjs(value?.createdAt).format("DD MMM YYYY")}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary btn-rounded text-white"
                                onClick={() => updateDialogOpen(value)}
                              >
                                <i class="fas fa-pencil-alt fa-xs"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-rounded text-white"
                                onClick={() => openDeleteDialog(value)}
                              >
                                <i class="far fa-trash-alt fa-sm"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
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
        <BannerDialog />
      </div>
    </>
  );
};

export default connect(null, { getBanner, deleteBanner })(BannerTable);
