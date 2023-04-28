import React from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";
import PropostionLetter from "app/components/PropostionLetter/PropostionLetter";
function RegisterDocumentDialog(props) {
  const { handleClose, registerDataDialog } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var day = new Date(registerDataDialog.date);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      id: registerDataDialog.id,
      // reason: employeeData.promoteRequest?.reason || "",
      // date: employeeData.promoteRequest?.date || "",
    },
    validationSchema: Yup.object({
      // reason: Yup.string().required("Không được bỏ trống"),
      // date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values) => {
      // console.log("values");
      // console.log(values);
      employeeData.listRegister = {
        ...values,
        date: registerDataDialog.date,
        content: registerDataDialog.content,
        document: registerDataDialog.document,
      };
      employeeData.listRegister.forEach((propose) => {
        if (propose.id === registerDataDialog.id) {
          propose.status = "Chờ duyệt";
        }
      });
      employeeData.status = "Chờ duyệt";
      employeeData.releaseRequest = null;
      dispatch(updateEmployee(employeeData));
      // handleCloseAll();
      handleClose();
      toast.success("Gửi lãnh đạo thành công");
    },
  });
  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {/* <PropostionLetter
              registerDataDialog={registerDataDialog}
              status={false}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button
              className="button-cancel"
              variant="contained"
              sx={{ mb: 2, background: "#FF9E43" }}
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button
              className="button-confirm1"
              variant="contained"
              type="submit"
              sx={{ mb: 2 }}
              color="primary"
            >
              Trình lãnh đạo
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default RegisterDocumentDialog;
