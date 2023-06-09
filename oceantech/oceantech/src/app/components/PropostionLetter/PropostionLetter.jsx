import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Applicant from "../Application/Application";
import SingleInfo from "../FormSingle/SingleInfo";
import { otherFeature, citizenIdIssuanceDateAfterCurrentDate, formatDateSend } from "app/constant";
import DayFormm from "../DayForm/DayForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PropostionLetter(props) {
  const { status, handleValues } = props;
  const proposeDataDialog = useSelector(
    (state) => state.ManageEmployee.consulHistory
  );
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const [proposeData, setProposeData] = useState(proposeDataDialog);

  useEffect(() => {
    setProposeData(proposeDataDialog)
  }, [proposeDataDialog])

  const handlechangeValuse = (event, method) => {
    const data = { ...proposeData };

    const today = formatDateSend(new Date())
    if (method === "date" && event.target.value > today) {
      toast.warning(citizenIdIssuanceDateAfterCurrentDate);
    }
    else {
      data[method] = event.target.value;
    }

    setProposeData(data);
    handleValues(data);
  };
  return (
    <>
      <Grid className="single" container spacing={2}>
        <Grid container>
          <Grid className="content" container item sm={12} xs={12} spacing={1}>
            <Grid container item sm={12} xs={12}>
              <Grid textTransform="uppercase" sm={12} xs={12} fullWidth>
                <Typography variant="h5" className="banner">
                  Cộng hòa xã hội chủ nghĩa Việt Nam
                </Typography>
              </Grid>
              <Grid variant="h6" sm={12} xs={12} fullWidth>
                <Typography variant="h6">
                  Độc lập - Tự do - Hạnh phúc
                </Typography>
              </Grid>
              <Grid sm={12} xs={12} fullWidth>
                <Typography variant="h6">
                  -------------------------------------
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item sm={12} xs={12} justifyContent="center">
            <Typography variant="h5" className="banner">
              ĐƠN ĐỀ XUẤT Ý KIẾN THAM MƯU
            </Typography>
          </Grid>
          <Grid container item sm={12} xs={12} padding={-20}>
            <SingleInfo employeeData={employeeData} />
          </Grid>

          <Grid
            className="container-form"
            container
            item
            sm={12}
            xs={12}
            spacing={1}
          >
            <Grid item container xs={12} spacing={1}>
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
          </Grid>
          <Grid
            className="container-form"
            container
            item
            sm={12}
            xs={12}
            spacing={1}
          >
            <Grid item container xs={12} spacing={1}>
              <Grid item xs="auto">
                <Typography>
                  Tôi viết đơn này đề nghị công ty xem xét và giải quyết vấn đề:
                </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={proposeData?.type}
                  onChange={(event) => {
                    handlechangeValuse(event, "type");
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
              Nội dung vấn đề cần xem xét và giải quyết vấn đề:
            </Typography>
          </Grid>
          <Grid className="container-form" container item sm={12} xs={12}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={proposeData?.content}
                  onChange={(event) => {
                    handlechangeValuse(event, "content");
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
              Kính mong công ty/cá nhân có thẩm quyền xem xét đơn đề nghị và
              giải quyết vấn đề mà tôi đã nêu ở trên. Tôi xin cam đoan những
              thông tin trên hoàn toàn đúng sự thật. Nếu có gì sai sót, tôi xin
              chịu trách nhiệm trước công ty và trước pháp luật.
            </Typography>
          </Grid>
          <Grid className="container-form" container item sm={12} xs={12}>
            <Typography>Tôi xin chân thành cảm ơn!</Typography>
          </Grid>
          <DayFormm handlechangeValuse={handlechangeValuse} data={proposeDataDialog} />
        </Grid>
        <Applicant />

      </Grid >
    </>
  );
}

export default PropostionLetter;
