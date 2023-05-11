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
import { updateProposalConsult } from "app/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import PropostionLetter from "app/components/PropostionLetter/PropostionLetter";
import { processingStatus, randomValue } from "app/constant";
import SendToLeadershipDialog from "../AddNewEmployee/SendToLeadershipDialog";


function ProposeAdvisoryDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, proposeDataDialog, handleReloadPro, idProposal, ID } =
    props;
  const listPropose = useSelector(
    (state) => state.Employee.proposalConsulHistory
  );
  const [proposeData, setProposeData] = useState(proposeDataDialog);
  const [saved, setSaved] = useState("none");
  const [shoulSendLeader, setShoulSendLeader] = useState(false);
  const handleValues = (data) => {
    setProposeData(data);
  };

  const handleSubmit = async () => {
    dispatch(
      updateProposalConsult(
        idProposal ? idProposal : listPropose[0].proposalConsultationId,
        proposeData
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
          <PropostionLetter
            proposeDataDialog={proposeDataDialog}
            handleValues={handleValues}
            status={false}
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

export default ProposeAdvisoryDialog;
