import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  InputAdornment,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
function SaveProfileInfo(props) {
  const { handleClose, openEditDialog } = props;
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  console.log(employeeData);
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 24px",
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            zIndex: 10000
             }}>
        Thông tin nộp lưu
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {" "}
            <Typography>
              Ngày Lưu: 
              {/* Ngày Lưu: {employeeData.saveProfileInfo.date.split("-").reverse().join("-")}{" "} */}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Số lưu: {employeeData?.employeeInfo?.storedProfileCode}</Typography>
            {/* <Typography>Số lưu: {employeeData.saveProfileInfo.numberSave} </Typography> */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{justifyContent: 'center', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
        <Button variant="contained" onClick={handleClose} color="error">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaveProfileInfo;
