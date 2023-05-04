import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Typography,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Icon, IconButton
} from "@mui/material";
import ReactToPrint from "react-to-print";
function ConfirmPrintDialog(props) {
  const { handleClose, componentRef } = props;

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle className="dialog-title">
        In biểu mẩu
        <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 20 }}>
        <Typography >Bạn muốn In biểu mẫu?</Typography>
      </DialogContent>
      <DialogActions className="dialog-action">
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary">
              Xác nhận
            </Button>
          )}
          onAfterPrint={handleClose}
          content={() => componentRef.current}
        />
        <Button variant="contained" onClick={handleClose} color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmPrintDialog;
