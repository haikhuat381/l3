import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
function ReleaseLetter(props) {
  const { employeeData, handleValues, status, dataReleaseDialog } = props;
  var today = new Date();
  const otherFeature = useSelector((state) => state.Employee.otherFeature);
  console.log("chao bn ", employeeData);
  const [dataRelease, setDataRelease] = useState({
    status: "8",
    terminateRequestDetail:
      employeeData?.employeeInfo?.terminateRequestDetail ||
      employeeData?.terminateRequestDetail ||
      "",
  });

  console.log(" gui quan li  ", dataRelease);

  const handlechangeValuse = (event, method) => {
    const data = { ...dataRelease };
    data[method] = event.target.value;
    setDataRelease(data);
    handleValues(data);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          padding: 15,
          marginTop: 30,
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
            <Typography fontFamily={"Times New Roman"} variant="h6">
              Độc lập - Tự do - Hạnh phúc
            </Typography>
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
              variant="h4"
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
            <Grid item sm={12} xs={12}>
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
            <Grid item sm={1} xs={1.0}>
              <Typography>Tôi tên là:</Typography>
            </Grid>
            <Grid sm={11} xs={11}>
              <TextField
                className="luan"
                value={
                  employeeData?.employeeInfo?.fullName || employeeData?.fullName
                }
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
            <Grid item sm={2.7} xs={2.7}>
              <Typography>Hiện đang công tác tại vị trí:</Typography>
            </Grid>
            <Grid item sm={9.3} xs={9.3}>
              <TextField
                className="luan"
                value={
                  otherFeature[employeeData?.employeeInfo?.teamId]?.name ||
                  otherFeature[employeeData?.teamId]?.name
                }
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
            <Grid item sm={8.6} xs={8.6}>
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
                <Grid item xs={12} sm={12}>
                  <Typography>
                    Tôi làm đơn này đề nghị ban giám đốc cho tôi xin nghỉ việc
                    vì lí do:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className="luan"
                    InputProps={{
                      readOnly: status,
                      style: { padding: 0 },
                    }}
                    id="standard-adornment-mount"
                    fullWidth
                    sx={{
                      "& fieldset": { border: "none", padding: 0 },
                    }}
                    value={dataRelease?.terminateRequestDetail}
                    // value={formik.values.terminateRequestDetail || ""}
                    onChange={(event) =>
                      handlechangeValuse(event, "terminateRequestDetail")
                    }
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
              <Typography
                style={{ fontStyle: "italic" }}
              >{`Hà Nội, ngày ${today.getDate()} tháng ${
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
                {employeeData?.employeeInfo?.fullName.split(" ").pop() ||
                  employeeData?.fullName.split(" ").pop()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: "bold" }}>
                {employeeData?.employeeInfo?.fullName || employeeData?.fullName}
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
