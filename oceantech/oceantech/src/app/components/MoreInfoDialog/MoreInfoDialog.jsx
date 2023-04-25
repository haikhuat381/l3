import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close, UndoRounded } from "@mui/icons-material";
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
  MenuItem,
  Typography,
} from "@mui/material";
function MoreInfoDialog(props) {
  const { handleClose, openEditDialog, display, title, rowDataInfo, handleEditPromote } = props;
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
        {/* {rowDataInfo === undefined ? (employeeData.refuseInfo ? "Từ chối" : "Yêu cầu bổ sung") : 
          ( rowDataInfo?.status) } */}
          {
            employeeData?.status === 6 ? "Từ chối" : "Yêu cầu bổ sung"
          }
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>

      <DialogContent style={{ paddingTop: 10 }}>
        <Typography>
          {/* {rowDataInfo === undefined ? (employeeData.refuseInfo ? "Lý do:" : "") :  ( rowDataInfo?.status === "Từ chối" ? "Lý do:" : "") }{" "}
          { rowDataInfo?.content || employeeData.refuseInfo?.content || employeeData.additionalRequest?.content} */}
          
          
          {
            employeeData?.status === 6 ? "Lý do:" : ""
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
          // sx={{ mb: 2, display:  employeeData?.status === 6 ?  "none" : ""}}
          // sx={{ mb: 2}}
          onClick={openEditDialog}
          // onClick={rowDataInfo !== undefined ? handleEditPromote() : openEditDialog }
        >
          {
            employeeData?.status === 6 ? "Sửa thông tin" : "Bổ sung thông tin"
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
