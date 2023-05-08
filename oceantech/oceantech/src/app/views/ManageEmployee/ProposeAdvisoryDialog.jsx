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

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";
import PropostionLetter from "app/components/PropostionLetter/PropostionLetter";

function ProposeAdvisoryDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, proposeDataDialog, handleReloadPro, idProposal } = props;
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
    handleReloadPro(Math.random().toString(36).slice(-5));
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
            {/* Biểu Mẫu Đề Xuẩ Tham Mưu */}
          </div>
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
        <DialogActions
          style={{
            justifyContent: "center",
            gap: "-8px",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        >
          <Button variant="contained" color="success" sx={{ display: saved }}>
            Trình lãnh đạo
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ display: saved === "none" ? "block" : "none" }}
            onClick={() => {
              setSaved("block"), handleSubmit();
            }}
          >
            Lưu
          </Button>
          <Button
            className="button-cancel"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Hủy
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </>
  );
}

export default ProposeAdvisoryDialog;
