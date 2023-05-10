import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Icon,
} from "@mui/material";
import SendToLeadershipDialog from "../AddNewEmployee/SendToLeadershipDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { ReleaseManageAction } from "app/redux/actions/actions";
import ReleaseLetter from "app/components/ReleaseLetter/ReleaseLetter";
import { pendingEndStatus } from "app/constant";

function ReleaseDialog(props) {
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const dispatch = useDispatch();
  const [shouldSenToLeader, setShouldSenToLeader] = useState(false);
  const employeeData = useSelector((state) => state.Employee.employeeData);

  const [dataReleaseDialog, setDataReleaseDialog] = useState({
    status: "8",
    terminateRequestDetail:
      employeeData?.employeeInfo?.terminateRequestDetail ||
      employeeData?.terminateRequestDetail ||
      "",
  });
  const handleValues = (data) => {
    setDataReleaseDialog(data);
  };
  const id = employeeData?.employeeInfo?.employeeId;
  const handlesubmit = async () => {
    dispatch(ReleaseManageAction(id, dataReleaseDialog));
    setShouldOpenTime();
  };
  function setShouldOpenTime() {
    setTimeout(() => {
      handleCloseAll();
    }, 1500);
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle className="dialog-title">
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Biểu Mẫu Đơn Xin Thôi Việc */}
          </div>
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <ReleaseLetter
            dataReleaseDialog={dataReleaseDialog}
            employeeData={employeeData}
            handleValues={handleValues}
            status={false}
          />
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button
            className="button-confirm1"
            variant="contained"
            color="success"
            type="submit"
            onClick={async () => {
              handlesubmit();
              handleChangeReload(id);
            }}
          >
            Trình lãnh đạo
          </Button>
          <Button
            className="button-cancel"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      {shouldSenToLeader && (
        <SendToLeadershipDialog
          handleCloseAll={handleCloseAll}
          handleClose={() => {
            setShouldSenToLeader(false);
          }}
          employeeId={employeeData?.employeeInfo?.employeeId}
          // status={employeeData?.employeeInfo?.status}
          status={pendingEndStatus}
        />
      )}
    </>
  );
}

export default ReleaseDialog;
