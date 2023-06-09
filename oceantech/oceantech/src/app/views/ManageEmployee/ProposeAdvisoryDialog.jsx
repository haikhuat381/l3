import React, { useState } from "react";
import { updateProposalConsult } from "app/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import PropostionLetter from "app/components/PropostionLetter/PropostionLetter";
import DialogForm from "app/components/DialogForm/DialogForm";
import "react-toastify/dist/ReactToastify.css";
function ProposeAdvisoryDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, proposeDataDialog, idProposal, idRegister } = props;
  const listPropose = useSelector(
    (state) => state.ManageEmployee.proposalConsulHistory
  );

  const [proposeData, setProposeData] = useState(proposeDataDialog);

  const handleValues = (data) => {
    setProposeData(data);
  };

  const handleSubmit = async () => {

    dispatch(
      updateProposalConsult(
        idProposal ? idProposal : listPropose[0].proposalConsultationId,
        proposeData,
        idRegister
      )
    );


  };
  return (
    <DialogForm
      title={"Đề xuất tham mưu"}
      componet={
        <PropostionLetter
          status={false}
          handleValues={handleValues}
        />
      }
      handleClose={handleClose}
      idRegister={idRegister}
      handleSubmit={handleSubmit}
    />
  );
}

export default ProposeAdvisoryDialog;
