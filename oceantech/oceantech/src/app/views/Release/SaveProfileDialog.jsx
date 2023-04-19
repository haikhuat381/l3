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
import { leaderAction, updateEmployee } from "app/redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";


function SaveProfileDialog(props) {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const { handleClose, handleCloseAll } = props;
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

      toast.success("Lưu hồ sơ thành côngg");
      handleCloseAll();
    },
  });
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        Lưu hồ sơ
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 10 }}>
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
                helperText={formik.errors.date}
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
                helperText={formik.errors.storedProfileCode}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" sx={{ mb: 2 }} type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SaveProfileDialog;
