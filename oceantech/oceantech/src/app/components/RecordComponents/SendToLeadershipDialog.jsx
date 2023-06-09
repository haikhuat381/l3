import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Icon,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addRegistAction, releaseManageAction } from "app/redux/actions/actions";
import { formatDateSend, leader } from "app/constant";

function SendToLeadershipDialog(props) {
  const { handleClose, employeeId, handleCloseAll, status, content, handleChangeReload } = props;
  const dispatch = useDispatch();
  const [position, setPosition] = useState();

  const formik = useFormik({
    initialValues: {
      registerName: "",
      registerDate: formatDateSend(new Date()),
      registerPosition: "",
      registerContent: "",
    },
    validationSchema: Yup.object({
      registerName: Yup.string()
        .required("Không được để trống tên lãnh đạo"),
      registerContent: Yup.string()
        .max(200, "Nhập tối đa 200 kí tự")
        .required("Không được để trống nội dung"),
      registerDate: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values) => {
      if (content) {
        dispatch(releaseManageAction(employeeId, content));
        handleChangeReload({});
      }
      else {
        values.registerPosition = position;
        values.status = status;
        dispatch(addRegistAction(employeeId, values));
      }

      handleCloseAll();
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
                  error={
                    formik.errors.registerDate && formik.touched.registerDate
                  }
                  helperText={
                    formik.touched.registerDate &&
                      formik.errors.registerDate ? (
                      <div>{formik.errors.registerDate}</div>
                    ) : null
                  }
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
                  onChange={(e) => {
                    formik.handleChange(e);
                    setPosition(
                      leader?.find((value) => value.name === e.target.value)
                        ?.position
                    );
                  }}
                  value={formik.values.registerName}
                  error={
                    formik.errors.registerName && formik.touched.registerName
                  }
                  helperText={
                    formik.touched.registerName &&
                      formik.errors.registerName ? (
                      <div>{formik.errors.registerName}</div>
                    ) : null
                  }
                >
                  {leader?.map((item, index) => (
                    <MenuItem key={item.name} value={item.name}>
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
                error={
                  formik.errors.registerContent &&
                  formik.touched.registerContent
                }
                helperText={
                  formik.touched.registerContent &&
                    formik.errors.registerContent ? (
                    <div>{formik.errors.registerContent}</div>
                  ) : null
                }
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
