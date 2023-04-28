import React, { useState } from "react";
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
  IconButton,
  Icon,
  Typography,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import SendToLeadershipDialog from "./SendToLeadershipDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";
import ReleaseLetter from "app/components/ReleaseLetter/ReleaseLetter";
function ReleaseDialog(props) {
  const { handleClose, handleCloseAll, handleChangeReload } = props;
  const [shouldSenToLeader, setShouldSenToLeader] = useState(false);
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const otherFeature = useSelector((state) => state.Employee.otherFeature);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // console.log("dâtta", employeeData);
  var today = new Date();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      terminateRequestDetail: "",
      date: employeeData.releaseRequest?.date || "",
    },
    validationSchema: Yup.object({
      terminateRequestDetail: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values) => {
      // employeeData.releaseRequest = values;
      // employeeData.status = "Chờ duyệt";
      // dispatch(updateEmployee(employeeData));
      // handleCloseAll();
      // toast.success("Gửi lãnh đạo thành công");
    },
  });
  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle
          sx={{
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            padding: "12px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Biểu Mẫu Đơn Xin Thôi Việc
          </div>
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <ReleaseLetter
              employeeData={employeeData}
              otherFeature={otherFeature}
            />
          </form>
        </DialogContent>
        <DialogActions
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            justifyContent: "center",
          }}
        >
          <Button
            className="button-cancel"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            className="button-confirm1"
            variant="contained"
            color="success"
            type="submit"
            onClick={() => setShouldSenToLeader(true)}
          >
            Trình lãnh đạo
          </Button>
        </DialogActions>
      </Dialog>
      {shouldSenToLeader && (
        <SendToLeadershipDialog
          handleClose={handleCloseAll}
          employeeId={employeeData?.employeeInfo?.employeeId}
          handleChangeReload={handleChangeReload}
        />
      )}
    </>
  );
}

export default ReleaseDialog;
