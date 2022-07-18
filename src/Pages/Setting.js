//react
import React, { useEffect, useState } from "react";

//react-redux
import { useSelector, connect } from "react-redux";

//react-router-dom
import { Link } from "react-router-dom";

//action
import { getSetting, updateSetting } from "../Store/Setting/setting.action";
import { permissionError } from "../util/Alert";

const Setting = (props) => {
  const [privacyLink, setPrivacyLink] = useState("");
  const [mongoId, setMongoId] = useState("");

  useEffect(() => {
    props.getSetting();
  }, []);

  const { setting } = useSelector((state) => state.setting);
  const hasPermission = useSelector((state) => state.admin.flag);

  useEffect(() => {
    if (setting) {
      setPrivacyLink(setting?.privacyLink);
      setMongoId(setting?._id);
    }
  }, [setting]);

  const handleSubmit = () => {
    const data = {
      privacyLink: privacyLink,
    };

    if (!hasPermission) return permissionError();

    props.updateSetting(data, mongoId);
  };

  return (
    <>
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Setting</h4>

            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li class="breadcrumb-item active">Setting</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <form className="form-horizontal form-material ">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="form-group">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span
                        className="form-control-label"
                        style={{
                          fontWeight: 600,
                          fontSize: 15,
                        }}
                      >
                        Privacy Link
                      </span>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={privacyLink}
                        onChange={(e) => {
                          setPrivacyLink(e.target.value);
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

export default connect(null, { getSetting, updateSetting })(Setting);
