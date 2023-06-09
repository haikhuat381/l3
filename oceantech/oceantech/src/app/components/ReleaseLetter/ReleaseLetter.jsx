import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { formatDateView, otherFeature } from "app/constant";
import Applicant from "../Application/Application";
function ReleaseLetter(props) {
  const { employeeData, handleValues, status } = props;
  const [dataRelease, setDataRelease] = useState({
    status: "8",
    terminateRequestDetail:
      employeeData?.employeeInfo?.terminateRequestDetail ||
      employeeData?.terminateRequestDetail ||
      "",
  });
  const today = new Date();
  const handlechangeValuse = (event, method) => {
    const data = { ...dataRelease };
    data[method] = event.target.value;
    setDataRelease(data);
    handleValues(data);
  };

  return (
    <>
      <Grid className="single" container spacing={2} >
        <Grid container>
          <Grid className="content" container item sm={12} xs={12}>
            <Grid container item sm={12} xs={12}>
              <Grid textTransform="uppercase" sm={12} xs={12} fullWidth>
                <Typography className="banner" variant="h5">
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
            <Typography className="banner" variant="h5">
              ĐƠN XIN NGHỈ VIỆC
            </Typography>
          </Grid>

          <Grid
            className="container-form"
            container
            item
            sm={12}
            xs={12}
            sx={{ mt: 2 }}
            spacing={1}
          >
            <Grid className="self-items" item containe md={6} xs={12} spacing={1}>
              <Grid item xs="auto">
                <Typography>Tôi tên là : </Typography>
              </Grid>
              <Grid item xs={true} fullWidth>
                <TextField

                  className="rs-noReadonly "
                  value={
                    employeeData?.employeeInfo?.fullName ||
                    employeeData?.fullName
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid className="self-items" item container md={6} xs={12} spacing={1}>
              <Grid item xs="auto">
                <Typography>Sinh ngày: </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={
                    formatDateView(employeeData?.employeeInfo?.dateOfBirth) ||
                    formatDateView(employeeData?.dateOfBirth)
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                ></TextField>
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
            <Grid item container md={6} xs={12} spacing={1}>
              <Grid item xs="auto">
                <Typography>Số CMND/CCCD: </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  value={
                    employeeData?.employeeInfo?.citizenId ||
                    employeeData?.citizenId
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container md={6} xs={12} spacing={1}>
              <Grid item xs="auto">
                <Typography>Địa chỉ: </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  value={
                    employeeData?.employeeInfo?.address || employeeData?.address
                  }
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
                <Typography>Chức vụ hiện tại: </Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={
                    otherFeature[employeeData?.employeeInfo?.teamId]?.name ||
                    otherFeature[employeeData?.teamId]?.name
                  }
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
            <Typography>
              Tôi làm đơn này đề nghị ban giám đốc cho tôi xin nghỉ việc với lý
              do:
            </Typography>
          </Grid>
          <Grid className="container-form" container item sm={12} xs={12}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly "
                  value={dataRelease?.terminateRequestDetail}
                  onChange={(event) =>
                    handlechangeValuse(event, "terminateRequestDetail")
                  }
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
              Trong quá trình làm việc ở đây, tôi đã học hỏi được rất nhiều điều
              từ quản lý cũng như đồng nghiệp. Tôi cảm thấy thực sự may mắn khi
              được làm việc trong môi trường hòa đồng và chuyên nghiệp. Tôi xin
              chân thành cảm ơn Công ty đã tin tưởng tôi trong suốt thời gian
              vừa qua và chúc cho Công ty chúng ta sẽ đạt được những thành công
              như mong muốn.
            </Typography>
          </Grid>
          <Grid className="container-form" container item sm={12} xs={12}>
            <Typography>Tôi xin chân thành cảm ơn.</Typography>
          </Grid>
          <Grid
            className="container-title"
            container
            item
            sm={12}
            xs={12}
            justifyContent="flex-end"
            mt={2}
          >
            <Grid
              item
              sm={6}
              xs={6}
              container
              direction="column"
              textAlign="center"
              spacing={1}
            >
              <Grid item mr={'-84px'} mb={1}>
                <Typography variant="body1" >
                  {`Hà Nội, ngày ${today.getDate()} tháng ${today.getMonth() + 1
                    } năm ${today.getFullYear()}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Applicant />
        </Grid>
      </Grid>
    </>
  );
}

export default ReleaseLetter;
