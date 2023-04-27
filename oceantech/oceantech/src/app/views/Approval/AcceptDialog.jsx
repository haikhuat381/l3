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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateEmployee } from "app/redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
import { leaderAction } from "app/redux/actions/actions";
import "react-toastify/dist/ReactToastify.css";


function AcceptDialog(props) {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const formik = useFormik({
    initialValues: {
      appointmentDate: "",
    },
    validationSchema: Yup.object({
      appointmentDate: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values) => {
      const isCheck = employeeData?.employeeInfo?.status
      values.status = isCheck === 3 ? 5 : 10
      if(isCheck === 8) {
        values.terminatedDate = values.appointmentDate
        delete values.appointmentDate
      }
      isCheck === 3 ? dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values, "Phê duyệt")) : dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values,  "Phê duyệt"))
      handleChangeReload(employeeData?.employeeInfo?.employeeId)
      
      // toast.success("Phê duyệt thành công");
      handleCloseAll();
    },
  });
  return (
    <>
      {" "}
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding:"9px 24px", boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}
        >
          Xác nhận phê duyệt
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: "32px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Ngày hẹn"
                  variant="outlined"
                  name="appointmentDate"
                  value={formik.values.appointmentDate}
                  onChange={formik.handleChange}
                  error={formik.errors.appointmentDate && formik.touched.appointmentDate}
                  helperText={formik.errors.appointmentDate}
                />
              </Grid>
              <Grid item xs={12}>
                {" "}
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Đã đủ điều kiện phê duyệt"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{justifyContent: 'center', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
            <Button variant="contained" color="primary" sx={{}} type="submit">
              Xác nhận
            </Button>
            <Button variant="contained" onClick={handleClose} color="error" >
              Hủy
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AcceptDialog;
