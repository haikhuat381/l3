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
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { BorderColor, Close } from "@mui/icons-material";
import { updateEmployee } from "app/redux/actions/actions";
import moment from "moment/moment";
function SalarationLetter(props) {
  const { handleClose, dataIncreaseDialog, handleValues, status } = props;
  const employeeData = useSelector((state) => state.Employee.employeeData);
  const [dataIncrease, setDataIncrease] = useState(dataIncreaseDialog);
  var today = new Date();
  const handlechangeValuse = (event, method) => {
    const data = { ...dataIncrease };
    data[method] = event.target.value;
    setDataIncrease(data);
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
            sx={{ mt: 1 }}
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
            display="flex"
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
              Về việc điều chỉnh tăng lương cho Nhân viên
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
            <Grid sx={{ mb: 2 }} item sm={12} xs={12}>
              <Typography sx={{ mt: 1 }}>
                - Căn cứ tại quy chế, Điều lệ công ty Oceantech
              </Typography>
            </Grid>

            <Grid item sm={12} xs={12}>
              <Typography sx={{ mb: 2 }}>
                - Căn cứ vào hợp đồng lao động với người lao động
              </Typography>
              <Typography>
                - Xét những đóng góp của người lao động và đề nghị của trưởng
                phòng nhân sự
              </Typography>
            </Grid>
            <Grid
              sx={{ pt: 1, mt: 4, mb: 3 }}
              container
              item
              sm={12}
              xs={12}
              justifyContent="center"
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold" }}
                fontFamily={"Times New Roman"}
              >
                GIÁM ĐỐC CÔNG TY QUYẾT ĐỊNH
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
            <Grid item sm={1.8} xs={1.8} sx={{ mt: 1 }}>
              <Typography>Điều 1: Kể từ ngày:</Typography>
            </Grid>
            <Grid item sm={2} xs={2}>
              <TextField
                className="luan3"
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                value={moment(dataIncrease?.date).format("DD-MM-YYYY")}
                onChange={(event) => {
                  handlechangeValuse(event, "date");
                }}
              />
            </Grid>
            <Grid item sm={3.4} xs={3.4} sx={{ pl: 0, mt: 1 }}>
              <Typography>, điều chỉnh mức lương của Ông/Bà:</Typography>
            </Grid>
            <Grid item sm={2} xs={2}>
              <TextField
                className="luan3"
                InputProps={{
                  readOnly: true,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                value={employeeData?.employeeInfo?.fullName}
              />
            </Grid>
            <Grid item sm={1.2} xs={1.2} sx={{ mt: 1, ml: 0 }}>
              <Typography>, sẽ tăng lên:</Typography>
            </Grid>
            <Grid item sm={1.5} xs={1.5}>
              <TextField
                className="luan3  "
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                value={dataIncrease?.salary}
                onChange={(event) => {
                  handlechangeValuse(event, "salary");
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
            <Typography>
              Điều 2: Các ông/bà Phòng Nhân Sự, Phòng Tài Chính kế toán căn cứ
              quyết định thi hành.
            </Typography>
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
        sx={{ pl: 10, pr: 10, pb: 5 }}
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
              style={{ fontWeight: "bold" }}
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
    </>
  );
}

export default SalarationLetter;
