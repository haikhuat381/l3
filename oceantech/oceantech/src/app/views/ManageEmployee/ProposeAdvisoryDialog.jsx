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
import { updateProposalConsult } from "app/redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";
import PropostionLetter from "app/components/PropostionLetter/PropostionLetter";

function ProposeAdvisoryDialog(props) {
  const dispatch = useDispatch();
  const {
    handleClose,
    proposeDataDialog,
    handleReloadPro,
    idProposal,
    handleAllGet,
  } = props;
  const listPropose = useSelector(
    (state) => state.Employee.proposalConsulHistory
  );
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const [proposeData, setProposeData] = useState(proposeDataDialog);
  const [saved, setSaved] = useState("none");
  const handleValues = (data) => {
    setProposeData(data);
  };

  const handleSubmit = async () => {
    // console.log(" cap nhat de xaut tham muu ", proposeData);
    dispatch(
      updateProposalConsult(
        idProposal ? idProposal : listPropose[0].proposalConsultationId,
        proposeData
      )
    );
    // handleReloadPro("gui lanh dao ");
    handleAllGet();
  };
  const formik = useFormik({
    initialValues: {
      id: proposeDataDialog.id,
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
      // employeeData.proposeRequest = {
      //   ...values,
      //   date: proposeDataDialog.date,
      //   content: proposeDataDialog.content,
      //   type: proposeDataDialog.type,
      // };
      // employeeData.listPropose.forEach((propose) => {
      //   if (propose.id === proposeDataDialog.id) {
      //     propose.status = "Chờ duyệt";
      //   }
      // });
      // employeeData.status = "Chờ duyệt";
      // employeeData.releaseRequest = null;
      // dispatch(updateEmployee(employeeData));
      // // handleCloseAll();
      // handleClose();
      // toast.success("Gửi lãnh đạo thành công");
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
        {/* <form onSubmit={formik.handleSubmit}> */}
        <DialogContent>
          <PropostionLetter
            proposeDataDialog={proposeDataDialog}
            handleValues={handleValues}
            status={false}
          />
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
            sx={{ mb: 2, display: saved }}
            color="primary"
          >
            Trình lãnh đạo
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ display: saved === "none" ? "block" : "none", mb: 2 }}
            onClick={() => {
              setSaved("block"), handleSubmit();
            }}
          >
            Lưu
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </>
  );
}

export default ProposeAdvisoryDialog;
