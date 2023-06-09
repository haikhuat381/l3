import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Icon,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

function RegisterDocumentDialog(props) {
  const { handleClose, registerDataDialog } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);

  const formik = useFormik({
    initialValues: {
      id: registerDataDialog.id,
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
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
          <DialogContent></DialogContent>
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
