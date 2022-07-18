//React
import React, { useEffect, useState } from "react";

//react-router-dom
import { Link } from "react-router-dom";

//baseURL
import { baseURL } from "../../util/Config";

//html Parser
import parse from "html-react-parser";

//Actions
import { locationWiseImpression } from "../../Store/Impression/impression.action";
import { locationWiseClick } from "../../Store/Click/click.action";
import { getOwnAdByTime } from "../../Store/Advertisement/advertisement.action";

//react-redux
import { connect, useSelector } from "react-redux";
import { Carousel, CarouselItem } from "reactstrap";

// //datepicker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

//Dayjs
import dayjs from "dayjs";

const OwnAdViewDetails = (props) => {
  //Get data from LocalStorage
  const dialogData = JSON.parse(localStorage.getItem("ownAdViewDetails"));

  useEffect(() => {
    props.locationWiseImpression(dialogData._id);
    props.locationWiseClick(dialogData._id);
  }, []);

  //Define States
  const [data, setData] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  //useSelectors
  const { ownAd } = useSelector((state) => state.advertisement);

  const dateData = {
    startDate: "ALL",
    endDate: "ALL",
  };

  useEffect(() => {
    setData(data);
    props.getOwnAdByTime(dateData, dialogData._id);
  }, [data]);

  const adNext = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === dialogData.image.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const adPrev = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? dialogData.image.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const hostImageVideo = dialogData.image.map((imageVideo, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img
          class=" img mx-auto d-block"
          src={baseURL + imageVideo}
          draggable="false"
          alt=""
          style={{
            width: 160,
            height: 160,
            borderRadius: 10,
          }}
        />
      </CarouselItem>
    );
  });

  //Apply button function for analytic
  const handleApply = (event, picker) => {
    picker.element.val(
      picker.startDate.format("M/DD/YYYY") +
        " - " +
        picker.endDate.format("M/DD/YYYY")
    );
    const dayStart = dayjs(picker.startDate).format("M/DD/YYYY");

    const dayEnd = dayjs(picker.endDate).format("M/DD/YYYY");
    const date = {
      startDate: dayStart,
      endDate: dayEnd,
    };

    setStartDate(dayStart);
    setEndDate(dayEnd);

    props.getOwnAdByTime(date, dialogData._id);
  };

  //Cancel button function for analytic
  const handleCancel = (event, picker) => {
    picker.element.val("");
    props.getOwnAdByTime(dateData, dialogData._id);
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">CustomAd Details</h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/admin/customAd">CustomAd</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            CustomAd Details
          </li>
        </ol>
      </div>

      <div className="container-fluid mt-6">
        <div className="row">
          <div className="col-lg-5" style={{ borderRadius: "20" }}>
            <div className="card mb-4">
              <div className="card-body">
                <center className="mt-2">
                  <div className="form-group col-md-6 ">
                    <label className="styleForTitle">Publisher Details</label>
                  </div>
                  <img
                    src={
                      dialogData?.publisherLogo
                        ? baseURL + dialogData?.publisherLogo
                        : "https://eschola.codderlab.com/storage/profile.png"
                    }
                    draggable="false"
                    className="rounded-circle"
                    borderRadius="100%"
                    width="100"
                    height="100"
                    alt=""
                  />

                  <h4
                    className="card-title mt-2   mt-3"
                    style={{ color: "#6777ef" }}
                  >
                    {dialogData.publisherName != "undefined" &&
                    dialogData.publisherName !== "null"
                      ? "Name : " + dialogData.publisherName
                      : " "}
                  </h4>
                  <center></center>
                </center>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div
              className="card "
              style={{ height: 215, overflow: "auto", overflowX: "hidden" }}
            >
              <div className="card-body">
                <div className="form-row ">
                  <div className="form-group col-md-12">
                    <label
                      style={{ color: "black", fontWeight: 700, fontSize: 15 }}
                    >
                      Title :
                    </label>
                    <label>&nbsp; {dialogData?.title}</label>
                  </div>
                  <div className="form-group col-md-12">
                    <label
                      style={{ color: "black", fontWeight: 700, fontSize: 15 }}
                    >
                      Url :
                    </label>
                    <label>&nbsp;{dialogData?.url}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-6">
        <div className="row">
          <div class="col-md-5">
            <div class="card card-user">
              <div class="card-body">
                <center>
                  <div className="form-group col-md-6 ">
                    <label className="styleForTitle mb-3">CustomAd Image</label>
                  </div>
                </center>
                <Carousel
                  activeIndex={activeIndex}
                  next={adNext}
                  previous={adPrev}
                >
                  {hostImageVideo}
                </Carousel>
              </div>
              <center className="mb-3">
                <i
                  class="fas fa-dot-circle active cursor-pointer"
                  style={{ marginRight: "10px" }}
                  onClick={adPrev}
                ></i>

                <i
                  class="fas fa-dot-circle cursor-pointer"
                  onClick={adNext}
                ></i>
              </center>
            </div>
          </div>
          <div className="col-md-7">
            <div
              className="card"
              style={{ height: 235, overflow: "auto", overflowX: "hidden" }}
            >
              <div className="card-body">
                <div className="form-row ">
                  <div className="form-group col-md-12 ">
                    <label
                      style={{ color: "black", fontWeight: 700, fontSize: 15 }}
                    >
                      Description
                    </label>
                    :{parse(`${dialogData?.description}`)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="container-fluid">
            <div className="content-wrapper">
              <div className="row">
                <DateRangePicker
                  initialSettings={{
                    autoUpdateInput: false,
                    locale: {
                      cancelLabel: "Clear",
                    },
                    maxDate: new Date(),

                    buttonClasses: ["btn btn-dark"],
                  }}
                  onApply={handleApply}
                  onCancel={handleCancel}
                >
                  <input
                    type="text"
                    class="daterange form-control float-left "
                    placeholder="Select Date"
                    style={{ width: 180, fontWeight: 700 }}
                  />
                </DateRangePicker>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-6" style={{ position: "relative" }}>
        <div class="row">
          <div class="col-xl-6">
            <div class="card">
              <div class="card-body">
                <label className="styleForTitle d-flex justify-content-center">
                  Impressions
                </label>
                <div
                  class="table-responsive"
                  style={{ maxHeight: 500, overflow: "auto" }}
                >
                  <table
                    className="table align-items-center table-flush table-hover"
                    id="dataTableHover"
                  >
                    <thead className="text-black text-center">
                      <tr>
                        <th> Location </th>
                        <th> Total Impressions </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {ownAd?.impression?.length > 0 ? (
                        ownAd?.impression?.map((impressionData, index) => {
                          return (
                            <tr>
                              <td>{impressionData?._id}</td>
                              <td>{impressionData?.total}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            Impression does not found yet !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="card ">
              <div class="card-body">
                <label className="styleForTitle d-flex justify-content-center">
                  Clicks
                </label>
                <div
                  class="table-responsive"
                  style={{ maxHeight: 500, overflow: "auto" }}
                >
                  <table
                    className="table align-items-center table-flush table-hover"
                    id="dataTableHover"
                  >
                    <thead className="text-black text-center">
                      <tr>
                        <th> Location </th>
                        <th> Total Clicks </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {ownAd?.click?.length > 0 ? (
                        ownAd?.click?.map((clickData, index) => {
                          return (
                            <tr>
                              <td>{clickData?._id}</td>
                              <td>{clickData?.total}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            Click does not found yet !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  locationWiseImpression,
  locationWiseClick,
  getOwnAdByTime,
})(OwnAdViewDetails);
