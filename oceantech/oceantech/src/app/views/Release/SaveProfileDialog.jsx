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
  Icon,
  IconButton
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { leaderAction } from "app/redux/actions/actions";


function SaveProfileDialog(props) {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const { handleClose, handleCloseAll,handleChangeReload } = props;
  const formik = useFormik({
    initialValues: {
      date: "",
      storedProfileCode: "",
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Vui lòng nhập ngày"),
      storedProfileCode: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      values.status = 13
      console.log("nop luu ho soooooooooo")
      console.log(employeeData?.employeeInfo?.employeeId)
      console.log(values)
      // dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values))
      dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, {status: values.status, storedProfileCode:values.storedProfileCode}, "Lưu hồ sơ"))
      // handleChangeReload(employeeData?.employeeInfo?.employeeId)
      handleChangeReload(Math.random().toString(36).slice(-5))
      // toast.success("Lưu hồ sơ thành côngg");
      handleCloseAll();
    },
  });
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">
        Lưu hồ sơ
        <IconButton onClick={handleClose}>
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 24 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label="Ngày lưu"
                variant="outlined"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.errors.date && formik.touched.date}
                helperText={formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Số lưu"
                variant="outlined"
                name="storedProfileCode"
                value={formik.values.storedProfileCode}
                onChange={formik.handleChange}
                error={formik.errors.storedProfileCode && formik.touched.storedProfileCode}
                helperText={formik.touched.storedProfileCode && formik.errors.storedProfileCode ? <div>{formik.errors.storedProfileCode}</div> : null}

              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button variant="contained" color="primary" type="submit">
            Xác nhận
          </Button>
          <Button variant="contained" onClick={handleClose} color="error">
            Hủy
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SaveProfileDialog;
