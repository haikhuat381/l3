import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  Button,
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
import { formatDateSend, messageSuccess, savedStatus } from "app/constant";


function SaveProfileDialog(props) {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const formik = useFormik({
    initialValues: {
      date: formatDateSend(new Date()),
      storedProfileCode: "",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày"),
      storedProfileCode: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(12, "Nhập tối đa 12 kí tự")
        .required("Không được để trống số lưu"),
    }),
    onSubmit: (values) => {
      values.status = savedStatus
      const idLeader = employeeData?.employeeInfo?.employeeId
      const dataLeader = { status: values.status, storedProfileCode: values.storedProfileCode }
      dispatch(leaderAction(idLeader, dataLeader, messageSuccess?.saveProfile))
      handleChangeReload({})
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
