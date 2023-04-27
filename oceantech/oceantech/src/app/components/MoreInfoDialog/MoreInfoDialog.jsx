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
} from "@mui/material";
function MoreInfoDialog(props) {
  const { handleClose, openEditDialog, openViewDialog, display, title, rowDataInfo, handleEditPromote } = props;
  const employeeData = useSelector((state) => state?.Employee?.employeeData?.employeeInfo);

  console.log("haikhuat");
  console.log(employeeData);
  console.log("rowDataInfo",rowDataInfo);
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 24px",
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            zIndex: 10000 
            }}>
          {
            employeeData?.status === 6 ? "Từ chối" : "Yêu cầu bổ sung"
          }
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 20 }}>
        <Typography>
          {
            employeeData?.status === 6 ? "Lý do:" : "Nội dung:"
          }{" "}
          {
            employeeData?.status === 6 ? employeeData?.rejectedReason : employeeData?.statusLog
          }
        </Typography>
        <Typography></Typography>
      </DialogContent>
      <DialogActions style={{justifyContent: 'center', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
        <Button
          variant="contained"
          color="primary"
          sx={{display: employeeData?.status === 6 ?  "none" : ""}}
          onClick={openEditDialog}
          // onClick={employeeData?.status === 6 ? openViewDialog : openEditDialog}
          // onClick={rowDataInfo !== undefined ? handleEditPromote() : openEditDialog }
        >
            {/* employeeData?.status === 6 ? "Xem hồ sơ" : "Bổ sung thông tin" */}
          {
            "Bổ sung thông tin"
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
