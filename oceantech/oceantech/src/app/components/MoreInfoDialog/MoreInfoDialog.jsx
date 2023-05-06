import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Icon,
  IconButton,
} from "@mui/material";
function MoreInfoDialog(props) {
  const {
    handleClose,
    openEditDialog,
    openViewDialog,
    display,
    title,
    rowDataInfo,
    handleEditPromote,
  } = props;
  const employeeData = useSelector(
    (state) => state?.Employee?.employeeData?.employeeInfo
  );
  
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">
        {employeeData?.status === 6 || employeeData?.status === 11 ? "Từ chối" : "Yêu cầu bổ sung"}

        <IconButton onClick={handleClose}>
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 20 }}>
        <Typography>
          {employeeData?.status === 6 ? "Lý do:" : "Nội dung:"}{" "}
          {employeeData?.status === 6
            ? employeeData?.rejectedReason
            : employeeData?.statusLog}
        </Typography>
        <Typography></Typography>
      </DialogContent>
      <DialogActions className="dialog-action">
        <Button
          variant="contained"
          color="primary"
          sx={{ display: employeeData?.status === 6 ? "none" : "" }}
          onClick={openEditDialog}
          // onClick={employeeData?.status === 6 ? openViewDialog : openEditDialog}
          // onClick={rowDataInfo !== undefined ? handleEditPromote() : openEditDialog }
        >
          {/* employeeData?.status === 6 ? "Xem hồ sơ" : "Bổ sung thông tin" */}
          {"Bổ sung thông tin"}
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MoreInfoDialog;
