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
} from "@mui/material";
import ReactToPrint from "react-to-print";
function ConfirmPrintDialog(props) {
  const { handleClose, componentRef } = props;

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 24px",
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            zIndex: 10000 }}>
        In biểu mẩu
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 20 }}>
        <Typography >Bạn muốn In biểu mẫu?</Typography>
      </DialogContent>
      <DialogActions style={{justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
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
