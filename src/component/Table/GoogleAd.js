//react
import React, { useState, useEffect } from "react";

//MUI
import IOSSwitch from "@material-ui/core/Switch";

//react-router-dom
import { Link } from "react-router-dom";

//actions
import {
  getGoogleAd,
  showGoogleAd,
  updateGoogleAd,
} from "../../Store/Advertisement/advertisement.action";

//react-redux
import { connect, useSelector } from "react-redux";
import { permissionError } from "../../util/Alert";

const GoogleAd = (props) => {
  //useSelector
  const { googleAd } = useSelector((state) => state.advertisement);
  const hasPermission = useSelector((state) => state.admin.flag);

  //Define state
  const [data, setData] = useState([]);
  const [industrialId, setIndustrialId] = useState("");
  const [bannerId, setBannerId] = useState("");
  const [nativeId, setNativeId] = useState("");
  const [appOpenId, setAppOpenId] = useState("");
  const [mongoId, setMongoId] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.getGoogleAd();
  }, []);

  useEffect(() => {
    setData(googleAd);
  }, [googleAd]);

  //Load data while updating
  useEffect(() => {
    if (googleAd) {
      setMongoId(googleAd?._id);
      setIndustrialId(googleAd?.industrialId);
      setBannerId(googleAd?.bannerId);
      setNativeId(googleAd?.nativeId);
      setAppOpenId(googleAd?.appOpenId);
      setShow(googleAd?.show);
    }
  }, [googleAd]);

  //Handle Submit Function
  const handleSubmit = () => {
    const content = {
      industrialId: industrialId,
      bannerId: bannerId,
      nativeId: nativeId,
      appOpenId: appOpenId,
    };

    setMongoId(googleAd?._id);

    if (!hasPermission) return permissionError();

    props.updateGoogleAd(mongoId, content);
  };

  //Handle Change Show
  const handleChangeShow = () => {
    if (!hasPermission) return permissionError();

    props.showGoogleAd(mongoId);
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Google Ad</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li class="breadcrumb-item active">Google Ad</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <form className="form-horizontal form-material ">
            <div className="row">
              <span
                className="col-md-11"
                style={{
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                Google Ad
              </span>

              <div className="col-md-1 pl-5">
                <IOSSwitch
                  onChange={handleChangeShow}
                  checked={show}
                  color="primary"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt-3">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-12">
                      <span
                        className="form-control-label"
                        style={{
                          fontWeight: 600,
                          fontSize: 15,
                        }}
                      >
                        Industrial Id
                      </span>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={industrialId}
                        onChange={(e) => {
                          setIndustrialId(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span
                        className="form-control-label"
                        style={{
                          fontWeight: 600,
                          fontSize: 15,
                        }}
                      >
                        Banner Id
                      </span>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={bannerId}
                        onChange={(e) => {
                          setBannerId(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span
                        className="form-control-label"
                        style={{
                          fontWeight: 600,
                          fontSize: 15,
                        }}
                      >
                        Native Id
                      </span>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={nativeId}
                        onChange={(e) => {
                          setNativeId(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span
                        className="form-control-label"
                        style={{
                          fontWeight: 600,
                          fontSize: 15,
                        }}
                      >
                        AppOpen Id
                      </span>
                      <input
                        type="text"
                        id="input-username"
                        className="form-control mt-2"
                        value={appOpenId}
                        onChange={(e) => {
                          setAppOpenId(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-12 mt-3 text-end">
                      <button
                        className="btn mx-auto  mx-md-0 mt-2 text-white px-4"
                        type="button"
                        style={{ backgroundColor: "#2a3042" }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getGoogleAd, updateGoogleAd, showGoogleAd })(
  GoogleAd
);
