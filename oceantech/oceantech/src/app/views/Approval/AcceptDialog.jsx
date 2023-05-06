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
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
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
      isCheck === 3 ? dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values, "Phê duyệt"))
       : dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values,  "Phê duyệt"))
      // handleChangeReload(employeeData?.employeeInfo?.employeeId)
      handleChangeReload(Math.random().toString(36).slice(-5))
      // toast.success("Phê duyệt thành công");
      handleCloseAll();
    },
  });
  return (
    <>
      {" "}
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle className="dialog-title">
          Xác nhận phê duyệt
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
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
          <DialogActions className="dialog-action">
            <Button variant="contained" color="primary" type="submit">
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
