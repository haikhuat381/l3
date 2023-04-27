import React, { useState } from "react";
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
import { addRegistAction, updateEmployee } from "app/redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
function SendToLeadershipDialog(props) {
  const { handleClose, employeeId, handleCloseAll, status } = props;
  const dispatch = useDispatch();
  // const employee = useSelector((state) => state.Employee.employeeData);
  const leader = useSelector((state) => state?.Employee?.leader);
  const [position,setPosition] = useState()


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
      values.status = status === 1 || status === 4 || status === 6 ? 3 : null
      console.log("status dong 50", status)
      dispatch(addRegistAction(employeeId,values))

      handleCloseAll();
      // toast.success("Gửi lãnh đạo thành công");
    },
  });
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 24px",
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            zIndex: 10000
          }}>
        Gửi lãnh đạo
        <Box onClick={handleClose}>
          <Close color="error"></Close>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ paddingTop: 20 }}>
          <Grid container spacing={2}>
            <Grid item container>
              <TextField
                fullWidth
                name="registerDate"
                label="Ngày gửi"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.registerDate}
                error={formik.errors.registerDate && formik.touched.registerDate}
                // helperText={formik.errors.registerDate}
                helperText={formik.touched.registerDate && formik.errors.registerDate ? <div>{formik.errors.registerDate}</div> : null}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <TextField
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
                  // helperText={formik.errors.registerName}
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
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  // autoFocus
                  label="Chức Vụ"
                  name="registerPosition"
                  // value={formik.values.position}
                  value={position || ""}
                  onChange={formik.handleChange}
                  // error={formik.errors.position && formik.touched.position}
                  // helperText={formik.errors.position}
                />
                </Grid>
              {/* <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Chức Vụ"
                  name="position"
                  onChange={formik.handleChange}
                  // value={formik.values.position}
                  value={() => {
                    return leader.find(value => value.name === formik.values.name).position
                  }}
                  error={formik.errors.position && formik.touched.position}
                  helperText={formik.errors.position}
                />
              </Grid> */}
            </Grid>
            <Grid item container>
              <TextField
                fullWidth
                label="Nội dung"
                name="registerContent"
                multiline
                minRows={3}
                onChange={formik.handleChange}
                value={formik.values.registerContent}
                error={formik.errors.registerContent && formik.touched.registerContent}
                // helperText={formik.errors.registerContent}
                helperText={formik.touched.registerContent && formik.errors.registerContent ? <div>{formik.errors.registerContent}</div> : null}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
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
