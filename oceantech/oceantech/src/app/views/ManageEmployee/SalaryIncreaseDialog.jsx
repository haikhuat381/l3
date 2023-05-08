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

import { useSelector, useDispatch } from "react-redux";

import { updateSalaryIncreaseAction } from "app/redux/actions/actions";
function SalaryIncreaseDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, dataIncreaseDialog, iDSalary, handleReloadPro } = props;
  const listSalaryElment = useSelector(
    (state) => state.Employee.salaryIncreaseHistory
  );
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
    handleReloadPro(Math.random().toString(36).slice(-5));
  };
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
            {/* Biểu Mẫu Tăng Lương */}
          </div>
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
