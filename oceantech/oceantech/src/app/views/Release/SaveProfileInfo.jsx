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
  Typography,
  Icon, 
  IconButton
} from "@mui/material";
function SaveProfileInfo(props) {
  const { handleClose, openEditDialog, openViewDialog } = props;
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  console.log(employeeData);
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">
        Thông tin nộp lưu
        <IconButton onClick={handleClose}>
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {" "}
            <Typography>
              Ngày Lưu: 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Số lưu: {employeeData?.employeeInfo?.storedProfileCode}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="dialog-action">
      <Button
          variant="contained"
          color="primary"
          onClick={openViewDialog}
        >
          Xem hồ sơ
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaveProfileInfo;
