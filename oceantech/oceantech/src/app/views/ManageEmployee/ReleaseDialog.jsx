import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Icon,
} from "@mui/material";
import SendToLeadershipDialog from "app/components/RecordComponents/SendToLeadershipDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ReleaseLetter from "app/components/ReleaseLetter/ReleaseLetter";
import { pendingEndStatus } from "app/constant";
import TabsLetter from "app/components/TabsLetter/TabsLetter";
function ReleaseDialog(props) {
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const [shouldSenToLeader, setShouldSenToLeader] = useState(false);
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const [saved, setSaved] = useState("block");
  useEffect(() => {
    if (employeeData?.employeeInfo?.status === pendingEndStatus) {
      setSaved("none")
    }
  }, [employeeData])
  const [dataReleaseDialog, setDataReleaseDialog] = useState({
    status: pendingEndStatus,
    terminateRequestDetail:
      employeeData?.employeeInfo?.terminateRequestDetail ||
      employeeData?.terminateRequestDetail ||
      "",
  });

  const handleValues = (data) => {
    setDataReleaseDialog(data);
  };

  const idRegister = employeeData?.employeeInfo?.employeeId;


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
      <Dialog open={true} maxWidth={"lg"} fullWidth className="manager-employee-dialog"  >
        <DialogTitle className="dialog-title" >
          Biểu mẫu
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent className="dialog-content">
          <TabsLetter title={"Đơn xin nghỉ việc"}
            element={<ReleaseLetter
              dataReleaseDialog={dataReleaseDialog}
              employeeData={employeeData}
              handleValues={handleValues}
              status={false}
            />} />

        </DialogContent>
        <DialogActions className="dialog-action">
          <Button
            className="button-confirm1"
            variant="contained"
            color="success"
            type="submit"
            sx={{ display: saved }}
            onClick={async () => {

              setShouldSenToLeader("true")
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
          employeeId={idRegister}
          status={pendingEndStatus}
          content={dataReleaseDialog}
          handleChangeReload={handleChangeReload}
        />
      )}

    </>
  );
}

export default ReleaseDialog;
