import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { leaderAction } from "app/redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdditionalRequestDialog(props) {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state?.Employee?.employeeData);

  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const formik = useFormik({
    initialValues: {
      statusLog: "",
    },
    validationSchema: Yup.object({
      statusLog: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const isCheck = employeeData?.employeeInfo?.status
      values.status = isCheck === 3 ? 4 : 9
      isCheck === 3 ? dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values)) : dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values))
      handleChangeReload(employeeData?.employeeInfo?.employeeId)
      handleCloseAll();
      // handleClose();
      toast.success("Gửi yêu cầu bổ sung thành công");
    },
  });
  return (
    <>
      {" "}
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding:"9px 24px", boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}
        >
          Yêu cầu bổ sung
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 24 }}>
            <TextField
              fullWidth
              minRows={5}
              multiline
              name="statusLog"
              label="Yêu cầu bổ sung"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              value={formik.values.statusLog}
              error={formik.errors.statusLog && formik.touched.statusLog}
              helperText={formik.errors.statusLog}
            />
          </DialogContent>
          <DialogActions style={{justifyContent: 'center', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
            <Button variant="contained" color="primary" sx={{ }} type="submit">
              Xác nhận
            </Button>
            <Button variant="contained" onClick={handleClose} color="error">
              Hủy
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AdditionalRequestDialog;
