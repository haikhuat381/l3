import React, { useState } from "react";
import SalarationLetter from "app/components/SalarationLetter/SalarationLetter";
import { useSelector, useDispatch } from "react-redux";
import { updateSalaryIncreaseAction } from "app/redux/actions/actions";
import DialogForm from "app/components/DialogForm/DialogForm";
function SalaryIncreaseDialog(props) {
  const dispatch = useDispatch();
  const { handleClose, dataIncreaseDialog, iDSalary, idRegister } = props;
  const listSalaryElment = useSelector(
    (state) => state.ManageEmployee.salaryIncreaseHistory
  );



  const [salaryData, setSalaryData] = useState(dataIncreaseDialog);
  const handleValues = (data) => {
    setSalaryData(data);
  };

  const handleSubmit = () => {
    dispatch(
      updateSalaryIncreaseAction(
        iDSalary ? iDSalary : listSalaryElment[0]?.salaryId,
        salaryData,
        idRegister
      )
    );
  };
  return (
    <DialogForm
      title={"Tăng lương"}
      componet={
        <SalarationLetter
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

export default SalaryIncreaseDialog;
