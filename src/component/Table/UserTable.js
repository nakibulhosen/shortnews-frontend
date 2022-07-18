//react
import React, { useEffect, useState } from "react";

//dayjs
import dayjs from "dayjs";

//react-redux
import { useSelector, connect } from "react-redux";
//react-router-dom
import { Link } from "react-router-dom";

//actions
import { getUserPagination, search } from "../../Store/User/user.action";

//Dummy Profile
import dummyProfile from "../../assets/images/dummyProfile.png";

//Pagination
import ServerPagination from "../../Pages/ServerPagination";

const UserTable = (props) => {
  //Define States
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [searchTerm, setSearchTerm] = useState("ALL");

  const { user, total } = useSelector((state) => state.user);

  useEffect(() => {
    if (searchTerm === "ALL") {
      props.getUserPagination(page, size);
    }
  }, [page, size]);

  //Set User Data
  useEffect(() => {
    setData(user);
  }, [user]);

  //For searching
  const searchData = (search, page, size) => {
    props.search(search, page, size);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value) => {
    setPage(1);
    setSize(value);
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">User Table</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li class="breadcrumb-item active">User Table</li>
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
                <div></div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 float-right mt-3 mb-2 mt-lg-0 mt-xl-0">
                  <form className="app-search">
                    <div class="input-group mb-3">
                      <input
                        type="search"
                        id="searchBar"
                        autoComplete="off"
                        placeholder="Searching for..."
                        className="form-control bg-none border-0 rounded-pill searchBar"
                        onChange={(e) => searchData(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div class="table-responsive ">
                <table class="table mb-">
                  <thead class="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    {data?.length > 0 ? (
                      data.map((value, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              {value?.image === null ? (
                                <div
                                  style={{ width: "50px" }}
                                  className="text-center"
                                >
                                  <img
                                    className="shadow p-1 mb-2 bg-white rounded "
                                    src={dummyProfile}
                                    draggable="false"
                                    height="50px"
                                    width="50px"
                                    alt="userImage"
                                  />
                                </div>
                              ) : (
                                <img
                                  className="shadow p-1 mb-2 bg-white rounded "
                                  src={value?.image}
                                  draggable="false"
                                  height="50px"
                                  width="50px"
                                  alt="userImage"
                                />
                              )}
                            </td>
                            <td>
                              {value?.name ? (
                                value?.name
                              ) : (
                                <div
                                  style={{ width: "50px" }}
                                  className="text-center"
                                >
                                  -
                                </div>
                              )}
                            </td>
                            <td>{value?.email}</td>
                            <td>
                              {value?.location ? (
                                value?.location
                              ) : (
                                <div
                                  style={{ width: "50px" }}
                                  className="text-center"
                                >
                                  -
                                </div>
                              )}
                            </td>
                            <td>
                              {dayjs(value?.createdAt).format("DD MMM YYYY")}
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
              <ServerPagination
                activePage={page}
                rowsPerPage={size}
                userTotal={total}
                handleRowsPerPage={handleRowsPerPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getUserPagination, search })(UserTable);
