import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import FormSingle from "../FormSingle/FormSingle";
import Applicant from "../Application/Application";
import DayFormm from "../DayForm/DayForm";
import { otherFeature, citizenIdIssuanceDateAfterCurrentDate, formatDateSend } from "app/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SalarationLetter(props) {
  const { handleValues, status } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const dataIncreaseDialog = useSelector(
    (state) => state.ManageEmployee.increaseHistory
  );
  const [dataIncrease, setDataIncrease] = useState(dataIncreaseDialog);

  useEffect(() => {
    setDataIncrease(dataIncreaseDialog);
  }, [dataIncreaseDialog])

  const handlechangeValuse = (event, method) => {

    const data = { ...dataIncrease };
    const today = formatDateSend(new Date())
    if (method === "date" && event.target.value > today) {
      toast.warning(citizenIdIssuanceDateAfterCurrentDate);
    }
    else {
      data[method] = event.target.value;
    }

    setDataIncrease(data);
    handleValues(data);
  };

  return (
    <>
      <Grid className="single" container spacing={2}>
        <Grid container>
          <FormSingle title=" Về việc điều chỉnh tăng lương cho Nhân viên" />
          <Grid
            className="container-form"
            container
            item
            sm={12}
            xs={12}
            spacing={1}
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
                <Typography>Số lương được tăng: </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={`${Number(dataIncrease?.salary).toLocaleString()} đ`}
                  onChange={(event) => {
                    handlechangeValuse(event, "salary");
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className="container-form" container item sm={12} xs={12}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs="auto">
                <Typography>Lý do tăng lương:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  value={dataIncrease?.reason}
                  onChange={(event) => {
                    handlechangeValuse(event, "reason");
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
          <Grid className="container-form" container item sm={12} xs={12}>
            <Typography>
              Căn cứ vào bộ luật lao động năm 2019, hợp đồng lao động số
              HĐLĐ001, thỏa ước lao động và tình hình thực tế của công ty, đề
              xuất ban hành chính thi hành để đảm bảo công bằng cũng như là lời
              động viên, tạo ra động lực để tôi làm việc tốt hơn .
            </Typography>
          </Grid>

          <DayFormm handlechangeValuse={handlechangeValuse} data={dataIncreaseDialog} />
        </Grid>
        <Applicant />

      </Grid >
    </>
  );
}

export default SalarationLetter;
