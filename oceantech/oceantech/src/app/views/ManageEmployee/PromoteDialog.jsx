import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PromotionLetter from "app/components/PromotionLetter/PromotionLetter";
import { updatePromoteHistoryAction } from "app/redux/actions/actions";
import DialogForm from "app/components/DialogForm/DialogForm";

function PromoteDialog(props) {
  const { handleClose, idPromoteDialog, idRegister } = props;
  const dispatch = useDispatch();
  const promote = useSelector(
    (state) => state.ManageEmployee.listPromoteHistory
  );
  const promoteDataDialog = useSelector(
    (state) => state.ManageEmployee.fromoteHistory
  );

  const [promoteData, setPromoteData] = useState(promoteDataDialog);

  const handleValues = (data) => {
    setPromoteData(data);
  };

  const handleSubmit = () => {
    dispatch(
      updatePromoteHistoryAction(
        idPromoteDialog ? idPromoteDialog : promote[0]?.promotionId,
        promoteData,
        idRegister
      )
    );
  };




  return (
    <DialogForm
      title={"Tăng chức"}
      componet={
        <PromotionLetter
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

export default PromoteDialog;
