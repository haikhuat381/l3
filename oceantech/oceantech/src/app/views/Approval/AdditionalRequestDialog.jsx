import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  Box,
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
import { pendingStatus, needMoreInfoStatus , moreInfoEndingStatus, randomValue  } from "app/constant";


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
      const employeeStatus = employeeData?.employeeInfo?.status
      values.status = employeeStatus === pendingStatus ? needMoreInfoStatus : moreInfoEndingStatus 

      dispatch(leaderAction(employeeData?.employeeInfo?.employeeId, values, "Yêu cầu bổ sung"))
      handleChangeReload(randomValue())
      handleCloseAll();
      // handleClose();
    },
  });
  return (
    <>
      {" "}
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle className="dialog-title">
          Yêu cầu bổ sung
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent style={{ paddingTop: 24 }}>
            <TextField
              fullWidth
              minRows={5}
              multiline
              name="statusLog"
              label="Nội dung"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              value={formik.values.statusLog}
              error={formik.errors.statusLog && formik.touched.statusLog}
              helperText={formik.touched.statusLog && formik.errors.statusLog ? <div>{formik.errors.statusLog}</div> : null}
            />
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
    </>
  );
}

export default AdditionalRequestDialog;
