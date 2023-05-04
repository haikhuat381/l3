import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  Icon,
  Typography,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import SendToLeadershipDialog from "../AddNewEmployee/SendToLeadershipDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";

import { ReleaseManageAction } from "app/redux/actions/actions";
import ReleaseLetter from "app/components/ReleaseLetter/ReleaseLetter";
import { async } from "regenerator-runtime";
function ReleaseDialog(props) {
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const dispatch = useDispatch();
  const [shouldSenToLeader, setShouldSenToLeader] = useState(false);
  const employeeData = useSelector((state) => state.Employee.employeeData);

  const [dataReleaseDialog, setDataReleaseDialog] = useState({});
  const handleValues = (data) => {
    setDataReleaseDialog(data);
  };
  console.log("chao bn ", dataReleaseDialog);
  const id = employeeData?.employeeInfo?.employeeId;
  const handlesubmit = async () => {
    dispatch(ReleaseManageAction(id, dataReleaseDialog));
  };
  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle
          sx={{
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            padding: "12px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Biểu Mẫu Đơn Xin Thôi Việc
          </div>
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <ReleaseLetter
            employeeData={employeeData}
            handleValues={handleValues}
            status={false}
          />
        </DialogContent>
        <DialogActions
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            justifyContent: "center",
          }}
        >
          <Button
            className="button-cancel"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            className="button-confirm1"
            variant="contained"
            color="success"
            type="submit"
            onClick={async () => {
              handlesubmit();
              handleChangeReload(id);
              // handleClose();
              handleCloseAll();
              // setShouldSenToLeader(true);
            }}
          >
            Trình lãnh đạo
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
          status="8"
        />
      )}
    </>
  );
}

export default ReleaseDialog;
