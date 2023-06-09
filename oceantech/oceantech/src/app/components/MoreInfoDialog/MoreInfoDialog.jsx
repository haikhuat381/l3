import React from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Icon,
  IconButton,
} from "@mui/material";
import { rejectedStatus, rejectedEndStatus } from "app/constant";


function MoreInfoDialog(props) {
  const {
    handleClose,
    openEditDialog
  } = props;
  const employeeData = useSelector(
    (state) => state?.Employee?.employeeData?.employeeInfo
  );
  const statusOfReject = employeeData?.status === rejectedStatus || employeeData?.status === rejectedEndStatus;

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">
        {statusOfReject ? "Từ chối" : "Yêu cầu bổ sung"}

        <IconButton onClick={handleClose}>
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 20 }}>
        <Typography>
          {statusOfReject ? "Lý do từ chối:" : "Nội dung yêu cầu:"}{" "}
          {statusOfReject
            ? employeeData?.rejectedReason
            : employeeData?.statusLog}
        </Typography>
        <Typography></Typography>
      </DialogContent>
      <DialogActions className="dialog-action">
        <Button
          variant="contained"
          color="primary"
          onClick={openEditDialog}
        >
          {
            statusOfReject ? "Chỉnh sửa thông tin" : "Bổ sung thông tin"
          }
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MoreInfoDialog;
