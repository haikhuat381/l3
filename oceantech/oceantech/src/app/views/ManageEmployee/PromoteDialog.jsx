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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import PromotionLetter from "app/components/PromotionLetter/PromotionLetter";

import { updatePromoteHistoryAction } from "app/redux/actions/actions";
function PromoteDialog(props) {
  const dispatch = useDispatch();
  const promote = useSelector((state) => state.Employee.listPromoteHistory);

  const {
    handleClose,
    promoteDataDialog,
    idPromoteDialog,
    handleReloadPro,
    handleAllGet,
  } = props;

  const [saved, setSaved] = useState("none");
  const [promoteData, setPromoteData] = useState(promoteDataDialog);

  const handleValues = (data) => {
    setPromoteData(data);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     reason: promoteData?.reason || "",
  //     note: promoteData?.note || "",
  //     date: promoteData?.date
  //       ? moment(promoteData?.date).format("YYYY-MM-DD")
  //       : "",
  //     newPosition: promoteData?.newPosition || "",
  //   },
  //   validationSchema: Yup.object({
  //     reason: Yup.string().required("Không được bỏ trống"),
  //     note: Yup.string().required("Không được bỏ trống"),
  //     newPosition: Yup.string().required("Không được bỏ trống"),
  //     date: Yup.date().required("Vui lòng nhập ngày"),
  //   }),
  //   onSubmit: (values, { resetForm }) => {
  //     // console.log(values);
  //   },
  // });
  const handleSubmit = async () => {
    dispatch(
      updatePromoteHistoryAction(
        idPromoteDialog ? idPromoteDialog : promote[0]?.promotionId,
        promoteData
      )
    );
    // handleReloadPro("gui lanh dao ");
    handleAllGet();
  };

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
          <PromotionLetter
            promoteDataDialog={promoteDataDialog}
            status={false}
            handleValues={handleValues}
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
          <Button
            className="button-cancel"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Hủy
          </Button>
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
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </>
  );
}

export default PromoteDialog;
