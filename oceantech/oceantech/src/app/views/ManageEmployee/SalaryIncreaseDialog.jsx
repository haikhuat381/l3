import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Icon,
} from "@mui/material";
import SalarationLetter from "app/components/SalarationLetter/SalarationLetter";

import { useSelector, useDispatch } from "react-redux";
import { updateSalaryIncreaseAction } from "app/redux/actions/actions";
import { processingStatus, randomValue } from "app/constant";
import SendToLeadershipDialog from "../AddNewEmployee/SendToLeadershipDialog";
function SalaryIncreaseDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, dataIncreaseDialog, iDSalary, handleReloadPro, ID } =
    props;
  const listSalaryElment = useSelector(
    (state) => state.Employee.salaryIncreaseHistory
  );
  const [saved, setSaved] = useState("none");
  const [salaryData, setSalaryData] = useState(dataIncreaseDialog);
  const [shoulSendLeader, setShoulSendLeader] = useState(false);
  const handleValues = (data) => {
    setSalaryData(data);
  };
  const handleSubmit = () => {
    dispatch(
      updateSalaryIncreaseAction(
        iDSalary ? iDSalary : listSalaryElment[0]?.salaryId,
        salaryData
      )
    );
    handleReloadPro(randomValue());
  };
  const handleCloseAll = () => {
    handleClose();
    setShoulSendLeader(false);
  };
  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle className="dialog-title">
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SalarationLetter
            dataIncreaseDialog={dataIncreaseDialog}
            status={false}
            handleValues={handleValues}
          />
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button
            variant="contained"
            color="success"
            sx={{ display: saved }}
            onClick={() => setShoulSendLeader(true)}
          >
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
      </Dialog>
      {shoulSendLeader && (
        <SendToLeadershipDialog
          handleCloseAll={handleCloseAll}
          handleClose={() => {
            setShoulSendLeader(false);
          }}
          employeeId={ID}
          status={processingStatus}
        />
      )}
    </>
  );
}

export default SalaryIncreaseDialog;
