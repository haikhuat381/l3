import React, { useState } from "react";
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
  MenuItem,
  Icon, IconButton
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addRegistAction } from "app/redux/actions/actions";
function SendToLeadershipDialog(props) {
  const { handleClose, employeeId, handleCloseAll, status } = props;
  const dispatch = useDispatch();
  // const employee = useSelector((state) => state.Employee.employeeData);
  const leader = useSelector((state) => state?.Employee?.leader);
  const [position, setPosition] = useState()


  const formik = useFormik({
    initialValues: {
      registerName: "",
      registerDate: "",
      registerPosition: "",
      registerContent: "",
    },
    validationSchema: Yup.object({
      registerName: Yup.string()
        .min(5, "Hãy nhập đầy tên nhân viên")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      registerContent: Yup.string()
        .min(5, "Hãy nhập đầy đủ nội dung ")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      registerDate: Yup.date().required("Vui lòng nhập ngày"),
      // registerPosition: Yup.string().required("Nhập vị trí"),
    }),
    onSubmit: (values) => {
      values.registerPosition = position
      // values.status = status === 1 || status === 4 || status === 6 ? 3 : null
      values.status = status
      dispatch(addRegistAction(employeeId, values))

      handleCloseAll();
      toast.success("Gửi lãnh đạo thành công");
    },
  });
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">
        Gửi lãnh đạo
        <IconButton onClick={handleClose}>
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 20 }}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  fullWidth
                  name="registerDate"
                  label="Ngày gửi"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.registerDate}
                  error={formik.errors.registerDate && formik.touched.registerDate}
                  helperText={formik.touched.registerDate && formik.errors.registerDate ? <div>{formik.errors.registerDate}</div> : null}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  select
                  fullWidth
                  name="registerName"
                  label="Tên lãnh đạo"
                  // onChange={formik.handleChange}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setPosition(leader?.find(value => value.name === e.target.value)?.position)
                  }}
                  value={formik.values.registerName}
                  error={formik.errors.registerName && formik.touched.registerName}
                  helperText={formik.touched.registerName && formik.errors.registerName ? <div>{formik.errors.registerName}</div> : null}
                >
                  {leader?.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Chức Vụ"
                  name="registerPosition"
                  value={position || ""}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Grid item container>
              <TextField
                fullWidth
                label="Nội dung"
                name="registerContent"
                multiline
                minRows={4}
                onChange={formik.handleChange}
                value={formik.values.registerContent}
                error={formik.errors.registerContent && formik.touched.registerContent}
                helperText={formik.touched.registerContent && formik.errors.registerContent ? <div>{formik.errors.registerContent}</div> : null}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button variant="contained" type="submit" color="primary">
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

export default SendToLeadershipDialog;
