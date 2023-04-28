import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";
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
              justifyContent: "space-between",
              margin: "0 80px",
              border: "1px solid #DDDDDD",
            }}
          >
            <Grid
              container
              item
              sm={5}
              xs={12}
              justifyContent="center"
              sx={{ borderRight: "1px solid #DDDDDD", padding: "10px 0" }}
            >
              <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Công ty OceanTech
                </Typography>
              </Grid>
              <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography variant="h7" fontFamily={"Times New Roman"}>
                  Số: 10/QĐ- BN
                </Typography>
              </Grid>
            </Grid>
            <Grid container item sm={7} xs={12} sx={{ padding: "10px 0" }}>
              <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Cộng hòa xã hội chủ nghĩa Việt Nam
                </Typography>
              </Grid>
              <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography
                  variant="h7"
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Độc lập - Tự do - Hạnh phúc
                </Typography>
              </Grid>
              <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography>-------------------------------------</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            sm={12}
            xs={12}
            sx={{ pl: 10, pr: 10, pt: 2, pb: 6 }}
            justifyContent="flex-end"
          >
            <Typography fontFamily={"Times New Roman"}>
              {`Hà Nội, Ngày ${today.getDate()} tháng ${
                today.getMonth() + 1
              } năm ${today.getFullYear()}`}
            </Typography>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
            fontFamily={"Times New Roman"}
          >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              QUYẾT ĐỊNH
            </Typography>
          </Grid>
          <Grid
            sx={{ pb: 2 }}
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
          >
            <Typography
              variant="h6"
              style={{ fontWeight: "bold" }}
              fontFamily={"Times New Roman"}
            >
              Về việc Thăng chức Cán bộ, Công chức
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
                Căn cứ tại quy chế, điều lệ của Công ty OceanTech
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
                Căn cứ vào hợp đồng lao động với người lao động
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
                Xét những đóng góp của người lao động và đề nghị của trưởng
                phòng nhân sự
              </Typography>
            </Grid>
          </Grid>
          <Grid
            sx={{ pt: 4, pb: 2 }}
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
            <Grid item sm={1.2} xs={1.2}>
              <Typography>Điều 1: Tính từ</Typography>
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
            <Grid item sm={2.0} xs={2.0} sx={{ paddingLeft: "15px" }}>
              <Typography>, quyết định ông (bà):</Typography>
            </Grid>
            <Grid item sm={2.2} xs={2.2}>
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
            <Grid item sm={2} xs={12}>
              <Typography>, sẽ thăng chức lên: </Typography>
            </Grid>

            <Grid item sm={2} xs={12}>
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
            <Grid item sm={1.2} xs={12}>
              <Typography>, với lí do :</Typography>
            </Grid>
            <Grid item sm={5} xs={5}>
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
            <Grid item sm={5} xs={12}>
              <Typography>
                Điều 2: Bộ phận nhân sự, phòng kế toán và ông (bà):{" "}
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12}>
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
            <Grid item sm={2} xs={12} sx={{ paddingLeft: "10px" }}>
              <Typography>thi hành thực hiện</Typography>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Typography>quyết định này.</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "15px 80px",
              border: "1px solid #DDDDDD",
            }}
          >
            <Grid
              container
              item
              sm={5}
              xs={12}
              justifyContent="center"
              sx={{
                borderRight: "1px solid #DDDDDD",
                padding: "10px 30px",
              }}
            >
              <Grid container item sm={12} xs={12} justifyContent="flex-start">
                <Typography
                  variant="h7"
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Nơi nhận:
                </Typography>
              </Grid>
              <Grid
                container
                item
                sm={12}
                xs={12}
                justifyContent="flex-start"
                fontFamily={"Times New Roman"}
              >
                <Typography variant="h7"> - Như Điều 2</Typography>
              </Grid>
              <Grid
                container
                item
                sm={12}
                xs={12}
                justifyContent="flex-start "
                fontFamily={"Times New Roman"}
              >
                <Typography variant="h7"> - Lưu VP</Typography>
              </Grid>
            </Grid>
            <Grid container item sm={7} xs={12} sx={{ padding: "10px 0" }}>
              <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  GIÁM ĐỐC
                </Typography>
              </Grid>
              <Grid
                container
                item
                sm={12}
                xs={12}
                justifyContent="center"
                fontFamily={"Times New Roman"}
                fontStyle={"italic"}
              >
                <Typography variant="h7">A</Typography>
              </Grid>
              <Grid
                container
                item
                sm={12}
                xs={12}
                justifyContent="center"
                fontFamily={"Times New Roman"}
              >
                <Typography>Lê Văn A</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PromotionLetter;
