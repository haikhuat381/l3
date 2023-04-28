import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  Icon,
  Typography,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import { useSelector } from "react-redux";
function ReleaseLetter(props) {
  const { employeeData, otherFeature } = props;
  //   const otherFeature = useSelector((state) => state.Employee.otherFeature);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // console.log("dâtta", employeeData);
  var today = new Date();

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          padding: 15,
        }}
      >
        <Grid container>
          <Grid container item sm={12} xs={12} justifyContent="center">
            <Typography
              variant="h5"
              textTransform="uppercase"
              fontFamily={"Times New Roman"}
              fontWeight="600"
            >
              Cộng hòa xã hội chủ nghĩa Việt Nam
            </Typography>
          </Grid>
          <Grid container item sm={12} xs={12} justifyContent="center">
            <Typography variant="h6">Độc lập - Tự do - Hạnh phúc</Typography>
          </Grid>
          <Grid container item sm={12} xs={12} justifyContent="center">
            <Typography>-------------------------------------</Typography>
          </Grid>
          <Grid
            sx={{ pt: 8, pb: 8 }}
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
          >
            <Typography
              variant="h3"
              fontWeight={"700"}
              fontFamily={"Times New Roman"}
            >
              ĐƠN XIN NGHỈ VIỆC
            </Typography>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            className=" container-form"
            sx={{ pl: 10, pr: 10, pb: 2 }}
          >
            <Grid item sm={12} xs={12} sx={{ pl: 10 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                fontFamily={"Times New Roman"}
              >
                Kính gửi: Ban giám đốc công ty OceanTech
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{ pl: 10, pr: 10, pb: 2 }}
            justifyContent="flex-start"
          >
            <Grid item sm={2.0} xs={2.0} sx={{ pl: 10 }}>
              <Typography>Tôi tên là:</Typography>
            </Grid>
            <Grid style={{}} item sm={5.5} xs={5.5}>
              <TextField
                className="luan"
                value={employeeData?.employeeInfo?.fullName}
                InputProps={{
                  readOnly: true,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{ pl: 10, pr: 10, pb: 2 }}
            justifyContent="flex-start"
          >
            <Grid item sm={2.6} xs={2.6}>
              <Typography>Hiện đang công tác tại vị trí:</Typography>
            </Grid>
            <Grid item sm={5.5} xs={8.5}>
              <TextField
                className="luan"
                // value={otherFeature[employeeData?.employeeInfo?.teamId]?.name}
                InputProps={{
                  readOnly: true,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{ pl: 10, pr: 10, mt: 1 }}
            justifyContent="flex-start"
          >
            <Grid item sm={3.4} xs={3.4}>
              <Typography>Tôi xin được phép nghỉ làm từ ngày:</Typography>
            </Grid>
            <Grid item sm={5.5} xs={8}>
              <TextField
                className="luan"
                InputProps={{
                  readOnly: true,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                value={"22/11/2003"}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{ pl: 10, pr: 10, pb: 2, mt: 2 }}
            justifyContent="flex-start"
          >
            <Grid item container sm={12} xs={12} spacing={2}>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography>
                    Tôi làm đơn này đề nghị ban giám đốc cho tôi xin nghỉ việc
                    vì lí do:
                  </Typography>
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    className="luan"
                    InputProps={{
                      readOnly: true,
                      style: { padding: 0 },
                    }}
                    id="standard-adornment-mount"
                    fullWidth
                    sx={{
                      "& fieldset": { border: "none", padding: 0 },
                    }}
                    value={"Vợ tôi bắt tôi nghỉ việc "}
                    // value={formik.values.terminateRequestDetail || ""}
                    // onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>

              <Grid item>
                <Typography lineHeight={2}>
                  Trong quá trình làm việc ở đây, tôi đã học hỏi được rất nhiều
                  điều từ quản lý cũng như đồng nghiệp. Tôi cảm thấy thực sự may
                  mắn khi được làm việc trong môi trường hòa đồng và chuyên
                  nghiệp. Tôi xin chân thành cảm ơn Công ty đã tin tưởng tôi
                  trong suốt thời gian vừa qua và chúc cho Công ty chúng ta sẽ
                  đạt được những thành công như mong muốn.
                </Typography>
              </Grid>
            </Grid>
            <Grid item sm={12} xs={12} sx={{ mt: 1 }}>
              <Typography>Tôi xin chân thành cảm ơn.</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{ pl: 10, pr: 10, mt: 1 }}
            justifyContent="flex-end"
          ></Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          xs={12}
          sx={{ pl: 10, pr: 10 }}
          justifyContent="flex-end"
        >
          <Grid
            item
            sm={4}
            xs={4}
            container
            direction="column"
            textAlign="center"
            spacing={1}
          >
            <Grid item>
              {/* <Typography>{`Hà Nội , 20-11-2002`}</Typography> */}
              <Typography>{`Hà Nội, Ngày ${today.getDate()} tháng ${
                today.getMonth() + 1
              } năm ${today.getFullYear()}`}</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: "bold" }}>
                Người làm đơn
              </Typography>
            </Grid>
            <Grid item>
              {" "}
              <Typography style={{ fontWeight: "bold", fontStyle: "italic" }}>
                {employeeData?.employeeInfo?.fullName.split(" ").pop()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: "bold" }}>
                {employeeData?.employeeInfo?.fullName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          xs={12}
          sx={{ pl: 10, pr: 10, mt: 3 }}
          justifyContent="flex-end"
        >
          <Grid item sm={3} xs={3}>
            <Typography
              className="font-15"
              style={{ fontWeight: "bold", textDecoration: "uppercase" }}
            ></Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ReleaseLetter;
