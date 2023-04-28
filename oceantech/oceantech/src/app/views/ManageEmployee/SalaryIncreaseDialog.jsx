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
import SalarationLetter from "app/components/SalarationLetter/SalarationLetter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";

import { updateSalaryIncreaseAction } from "app/redux/actions/actions";
function SalaryIncreaseDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, dataIncreaseDialog, iDSalary, handleAllGet } = props;
  const listSalaryElment = useSelector(
    (state) => state.Employee.salaryIncreaseHistory
  );
  console.log(" data cân gui", listSalaryElment[0]?.salaryId);
  const [saved, setSaved] = useState("none");
  const [salaryData, setSalaryData] = useState(dataIncreaseDialog);
  const handleValues = (data) => {
    setSalaryData(data);
  };
  const handleSubmit = async () => {
    dispatch(
      updateSalaryIncreaseAction(
        iDSalary ? iDSalary : listSalaryElment[0]?.salaryId,
        salaryData
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
          <SalarationLetter
            dataIncreaseDialog={dataIncreaseDialog}
            status={false}
            handleValues={handleValues}
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
        {/* {shouldOpenSalaryIncreaseDialog && (
                    <SalaryIncreaseDialog
                        handleClose={() => setShouldOpenSalaryIncreaseDialog(false)}
                        handleCloseAll={handleClose}
                    />
                )} */}
      </Dialog>
    </>
  );
}

export default SalaryIncreaseDialog;
