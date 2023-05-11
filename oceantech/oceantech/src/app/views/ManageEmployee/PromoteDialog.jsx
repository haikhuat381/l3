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

import { useSelector, useDispatch } from "react-redux";
import PromotionLetter from "app/components/PromotionLetter/PromotionLetter";
import SendToLeadershipDialog from "../AddNewEmployee/SendToLeadershipDialog";
import { updatePromoteHistoryAction } from "app/redux/actions/actions";
import { processingStatus, randomValue } from "app/constant";
function PromoteDialog(props) {
  const dispatch = useDispatch();
  const promote = useSelector((state) => state.Employee.listPromoteHistory);

  const {
    handleClose,
    promoteDataDialog,
    idPromoteDialog,
    handleReloadPro,
    ID,
  } = props;
  const [shoulSendLeader, setShoulSendLeader] = useState(false);
  const [saved, setSaved] = useState("none");
  const [promoteData, setPromoteData] = useState(promoteDataDialog);

  const handleValues = (data) => {
    setPromoteData(data);
  };

  const handleSubmit = () => {
    dispatch(
      updatePromoteHistoryAction(
        idPromoteDialog ? idPromoteDialog : promote[0]?.promotionId,
        promoteData
      )
    );
    toast;
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
          <PromotionLetter
            promoteDataDialog={promoteDataDialog}
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

export default PromoteDialog;
