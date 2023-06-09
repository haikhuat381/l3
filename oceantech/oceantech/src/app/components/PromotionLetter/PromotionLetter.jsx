import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { otherFeature, citizenIdIssuanceDateAfterCurrentDate, formatDateSend } from "app/constant";
import FormSingle from "../FormSingle/FormSingle";
import Applicant from "../Application/Application";
import DayFormm from "../DayForm/DayForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PromotionLetter(props) {
  const { status, handleValues } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const promoteDataDialog = useSelector(
    (state) => state.ManageEmployee.fromoteHistory
  );
  const [promoteData, setPromoteData] = useState(promoteDataDialog);

  useEffect(() => {
    setPromoteData(promoteDataDialog)
  }, [promoteDataDialog])

  const handlechangeValuse = (event, method) => {
    const data = { ...promoteData };
    const today = formatDateSend(new Date())
    if (method === "date" && event.target.value > today) {
      toast.warning(citizenIdIssuanceDateAfterCurrentDate);
    }
    else {
      data[method] = event.target.value;
    }


    setPromoteData(data);
    handleValues(data);
  };
  return (
    <>
      <Grid className="single" container spacing={2}>
        <Grid container>
          <FormSingle title="Về việc tăng chức nhân viên" />
          <Grid
            container
            item
            sm={12}
            xs={12}
            spacing={1}
            className="container-form"
          >
            <Grid item container xs={6} spacing={1}>
              <Grid item xs="auto">
                <Typography>Chức vụ hiện tại: </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={otherFeature[employeeData?.employeeInfo?.teamId]?.name}
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={1}>
              <Grid item xs="auto">
                <Typography>Thăng chức lên:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  value={promoteData?.newPosition}
                  onChange={(event) => {
                    handlechangeValuse(event, "newPosition");
                  }}
                  InputProps={{
                    readOnly: status,
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            spacing={1}
            className="container-form"
          >
            <Grid item container sm={12} xs={12} spacing={1}>
              <Grid item xs="auto">
                <Typography>Lí do tăng chức: </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={promoteData?.reason}
                  InputProps={{
                    readOnly: status,
                  }}
                  onChange={(event) => {
                    handlechangeValuse(event, "reason");
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                />
              </Grid>
            </Grid>

          </Grid>
          <Grid container item sm={12} xs={12} className="container-form">
            <Typography>
              Rất mong bộ phận nhân sự, phòng kế toán và phòng quản lí thi hành
              thực hiện quyết định này trong thời gian sớm nhất!
            </Typography>
          </Grid>
          <DayFormm handlechangeValuse={handlechangeValuse} data={promoteDataDialog} />
        </Grid>
        <Applicant />
      </Grid>
    </>
  );
}

export default PromotionLetter;
