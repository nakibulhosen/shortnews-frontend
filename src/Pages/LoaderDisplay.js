import React, { createRef } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI
import Dialog from "@material-ui/core/Dialog";

//Loader
import { BounceLoader } from "react-spinners";

const LoaderDisplay = () => {
  const ref = createRef();
  const open = useSelector((state) => state.spinner.networkProgressDialog);

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      PaperComponent="div"
      ref={ref}
      style={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <BounceLoader size={60} color="#2a3042" loading={open} />
    </Dialog>
  );
};

export default React.memo(LoaderDisplay);
