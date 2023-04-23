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
function RefuseDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const formik = useFormik({
    initialValues: {
      rejectedReason: "",
      date: "",
    },
    validationSchema: Yup.object({
      date: Yup.date().required("Vui lòng nhập ngày"),
      rejectedReason: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const isCheck = employeeData?.employeeInfo?.status
      values.status = isCheck === 3 ? 6 : 11
      console.log("hai tu choi")
      console.log(employeeData?.employeeInfo?.employeeId)
      console.log(values)
      // isCheck === 3 ? dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values)) : dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values))
      isCheck === 3 ? dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, {status: values.status, rejectedReason: values.rejectedReason })) : dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, {status: values.status}))
      handleChangeReload(employeeData?.employeeInfo?.employeeId)

      // employee.status = "Từ chối";
      // dispatch(updateEmployee(employee));
      handleCloseAll();
      toast.success("Từ chối thành công");
    },
  });
  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          Từ chối phê duyệt
          <Box onClick={handleClose}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 10 }}>
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
                  helperText={formik.errors.date}
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
                  helperText={formik.errors.rejectedReason}
                ></TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
            <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} type="submit">
              Xác nhận
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default RefuseDialog;
