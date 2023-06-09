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
import "react-toastify/dist/ReactToastify.css";
import { pendingStatus, rejectedStatus, rejectedEndStatus, messageSuccess, formatDateSend } from "app/constant";


function RefuseDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const formik = useFormik({
    initialValues: {
      rejectedReason: "",
      date: formatDateSend(new Date()),
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày"),
      rejectedReason: Yup.string()
        .max(200, "Nhập tối đa 200 kí tự")
        .required("Không được để trống lý do"),
    }),
    onSubmit: (values) => {
      const employeeStatus = employeeData?.employeeInfo?.status
      values.status = employeeStatus === pendingStatus ? rejectedStatus : rejectedEndStatus
      const rejectedStatusData = { status: values.status, rejectedReason: values.rejectedReason }
      const rejectedEndStatusData = { status: values.status }

      employeeStatus === pendingStatus ? dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, rejectedStatusData, messageSuccess?.rejectProfile))
        : dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, rejectedEndStatusData, messageSuccess?.rejectProfile))
      handleChangeReload({})

      handleCloseAll();
    },
  });
  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 24px", boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}
        >
          Từ chối phê duyệt
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 24 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Thời gian"
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
                  minRows={5}
                  multiline
                  name="rejectedReason"
                  label="Lý do "
                  onChange={formik.handleChange}
                  value={formik.values.rejectedReason}
                  error={formik.errors.rejectedReason && formik.touched.rejectedReason}
                  helperText={formik.touched.rejectedReason && formik.errors.rejectedReason ? <div>{formik.errors.rejectedReason}</div> : null}
                ></TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}>
            <Button variant="contained" color="primary" type="submit">
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

export default RefuseDialog;
