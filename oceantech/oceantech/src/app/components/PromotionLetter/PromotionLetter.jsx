import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
function PromotionLetter(props) {
  const dispatch = useDispatch();
  const { promoteDataDialog, status, handleValues } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const [promoteData, setPromoteData] = useState(promoteDataDialog);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var today = new Date();

  const handlechangeValuse = (event, method) => {
    const data = { ...promoteData };
    data[method] = event.target.value;
    setPromoteData(data);
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
          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "0 80px",
            }}
          >
            <Grid container item sm={7} xs={7} sx={{ pt: 2, pb: 2 }}>
              <Grid
                variant="h5"
                textTransform="uppercase"
                sm={12}
                xs={12}
                fullWidth
                textAlign="center"
              >
                <Typography
                  variant="h5"
                  sm={12}
                  xs={12}
                  sx={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Cộng hòa xã hội chủ ngĩa Việt Nam
                </Typography>
              </Grid>
              <Grid variant="h6" sm={12} xs={12} fullWidth textAlign="center">
                <Typography
                  variant="h6"
                  sm={12}
                  xs={12}
                  fontFamily={"Times New Roman"}
                >
                  Độc lập - Tự do - Hạnh phúc
                </Typography>
              </Grid>
              <Grid sm={12} xs={12} fullWidth textAlign="center">
                <Typography variant="h6" sm={12} xs={12}>
                  -------------------------------------
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            sx={{ pt: 1, mt: 4 }}
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold" }}
              sm={12}
              xs={12}
              fontFamily={"Times New Roman"}
            >
              QUYẾT ĐỊNH
            </Typography>
          </Grid>
          <Grid
            sx={{ pt: 1, pb: 3, mb: 2 }}
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
          >
            <Typography
              variant="h6"
              sm={12}
              xs={12}
              fontFamily={"Times New Roman"}
            >
              Về việc thăng chức cán bộ, công chức
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
            <Grid item sm={8} xs={8}>
              <Typography>
                - Căn cứ tại quy chế, điều lệ của Công ty OceanTech
              </Typography>
            </Grid>
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
              <Typography>
                - Căn cứ vào hợp đồng lao động với người lao động
              </Typography>
            </Grid>
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
              <Typography>
                - Xét những đóng góp của người lao động và đề nghị của trưởng
                phòng nhân sự
              </Typography>
            </Grid>
          </Grid>
          <Grid
            sx={{ pt: 4, pb: 4 }}
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
          >
            <Typography
              variant="h5"
              style={{ fontWeight: "bold" }}
              fontFamily={"Times New Roman"}
            >
              GIÁM ĐỐC CÔNG TY QUYẾT ĐỊNH
            </Typography>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            className=" container-form"
            sx={{ pl: 10, pr: 10, pb: 2 }}
            lineHeight={2}
          >
            <Grid item sm={1.5} xs={1.5}>
              <Typography>Điều 1: Tính từ:</Typography>
            </Grid>
            <Grid item sm={1.5} xs={1.5}>
              <TextField
                className="luan "
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                value={moment(promoteData?.date).format("DD-MM-YYYY")}
                onChange={(event) => {
                  handlechangeValuse(event, "date");
                }}
              />
            </Grid>
            <Grid item sm={2} xs={2} sx={{ paddingLeft: "1px" }}>
              <Typography>, quyết định ông (bà):</Typography>
            </Grid>
            <Grid item sm={2} xs={2}>
              <TextField
                className="luan "
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
            <Grid item sm={1.9} xs={1.9}>
              <Typography>, sẽ thăng chức lên: </Typography>
            </Grid>

            <Grid item sm={1.9} xs={1.9}>
              <TextField
                className="luan "
                value={promoteData?.newPosition}
                onChange={(event) => {
                  handlechangeValuse(event, "newPosition");
                }}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
              />
            </Grid>
            <Grid item sm={0.1} xs={0.1}>
              <Typography>, </Typography>
            </Grid>
            <Grid item sm={0.9} xs={1}>
              <Typography>với lí do: </Typography>
            </Grid>
            <Grid item sm={10.1} xs={10.1}>
              <TextField
                className="luan"
                value={promoteData?.reason}
                onChange={(event) => {
                  handlechangeValuse(event, "reason");
                }}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
              />
            </Grid>
            <Grid item sm={0.1} xs={0.1} sx={{ paddingLeft: "1px" }}>
              <Typography>.</Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            sm={12}
            xs={12}
            className=" container-form"
            sx={{ pl: 10, pr: 5, pb: 2 }}
            lineHeight={2}
          >
            <Grid item sm={4.65} xs={4.65}>
              <Typography>
                Điều 2: Bộ phận nhân sự, phòng kế toán và ông (bà):{" "}
              </Typography>
            </Grid>
            <Grid item sm={2} xs={2}>
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
            <Grid item sm={5} xs={5} sx={{ paddingLeft: "10px" }}>
              <Typography>thi hành thực hiện quyết định này.</Typography>
            </Grid>
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
                <Typography style={{ fontStyle: "italic" }}>
                  {`Hà Nội, Ngày ${today.getDate()} tháng ${
                    today.getMonth() + 1
                  } năm ${today.getFullYear()}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Người làm đơn
                </Typography>
              </Grid>
              <Grid item>
                {" "}
                <Typography
                  style={{ fontWeight: "bold", fontStyle: "italic" }}
                  fontFamily={"Times New Roman"}
                >
                  {employeeData?.employeeInfo?.fullName.split(" ").pop()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  {employeeData?.employeeInfo?.fullName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PromotionLetter;
