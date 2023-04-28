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
import { ToastContainer, toast } from "react-toastify";
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
        }}
      >
        <Grid container>
          <Grid
            sx={{ border: 1, BorderColor: "grey.500", mt: 1 }}
            container
            item
            sm={12}
            xs={12}
            justifyContent="center"
            display="flex"
          >
            <Grid
              container
              item
              sm={5}
              xs={5}
              justifyContent="center"
              display="flex"
              sx={{
                pt: 2,
                pb: 2,
                pl: 2,
                pr: 2,
                borderRight: 1,
                BorderColor: "grey.500",
              }}
            >
              <Grid item sm={12} xs={12} display="flex" sx={{ mb: 1 }}>
                <Grid sm={5} xs={5} sx={{ mt: 2 }}>
                  <Typography
                    variant="h5"
                    sm={12}
                    xs={12}
                    value={"1"}
                    fontFamily={"Times New Roman"}
                  >
                    CƠ QUAN:
                  </Typography>
                </Grid>
                <TextField
                  fontFamily={"Times New Roman"}
                  className=" luan2"
                  InputProps={{
                    readOnly: true,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  value={"Thẩm Quyền Thành Phố Hà Nội "}
                />
              </Grid>

              <Grid item sm={12} xs={12} display="flex" sx={{ mb: 1 }}>
                <Grid sx={{ mt: 2 }} sm={5} xs={5}>
                  <Typography
                    variant="h6"
                    sm={12}
                    xs={12}
                    fontFamily={"Times New Roman"}
                  >
                    CÔNG TY:
                  </Typography>
                </Grid>
                <TextField
                  fontFamily={"Times New Roman"}
                  // multiline
                  className=" luan2"
                  InputProps={{
                    readOnly: true,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  value={"Oceantech"}
                />
              </Grid>

              <Grid item sm={12} xs={12} display="flex" sx={{ mb: 1 }}>
                <Grid sx={{ mt: 2 }} sm={5} xs={5}>
                  <Typography
                    variant="h6"
                    sm={12}
                    xs={12}
                    fontFamily={"Times New Roman"}
                  >
                    Số:
                  </Typography>
                </Grid>
                <TextField
                  fontFamily={"Times New Roman"}
                  // multiline
                  className=" luan2"
                  InputProps={{
                    readOnly: true,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  value={"12-Bộ luật hình sự "}
                />
              </Grid>
            </Grid>
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
                  sx={{ fontWeight: "bold" }}
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
            sx={{ pt: 1, pb: 1 }}
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
            <Grid sx={{ mb: 2 }} item sm={3.75} xs={3.75}>
              <Typography sx={{ mt: 1 }} xs={2} sm={3}>
                - Căn cứ tại quy chế, Điều lệ công ty:
              </Typography>
            </Grid>
            <Grid xs={8} item>
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
                value={"Oceantech"}
              />
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
            <Grid item sm={2} xs={2} sx={{ mt: 1 }}>
              <Typography>Điều 1: Kể từ ngày</Typography>
            </Grid>
            <Grid item sm={1.5} xs={2}>
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
            <Grid item sm={3.5} xs={3.5} sx={{ pl: 1, mt: 1 }}>
              <Typography>điều chỉnh mức lương của Ông/Bà</Typography>
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
            <Grid item sm={1} xs={1} sx={{ mt: 1 }}>
              <Typography>sẽ tăng lên</Typography>
            </Grid>
            <Grid item sm={1.5} xs={1}>
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
              quyết định thi hành
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sm={12}
          xs={12}
          sx={{ mt: 4, border: 1, BorderColor: "grey.500" }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Grid
            item
            sm={6}
            xs={6}
            sx={{
              pl: 10,
              pr: 10,
              borderRight: 1,
              BorderColor: "grey.500",
            }}
          >
            <Grid
              item
              sm={12}
              xs={12}
              container
              direction="column"
              textAlign="center"
              spacing={1}
            >
              <Grid item>
                <Typography
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Nơi nhận đơn
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  TỔNG GIÁM ĐỐC
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Như điều 2
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: "bold" }}
                  fontFamily={"Times New Roman"}
                >
                  Lưu HS, HC
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={6} sx={{ pl: 10, pr: 10 }}>
            <Grid
              item
              sm={12}
              xs={12}
              container
              direction="column"
              textAlign="center"
              spacing={1}
            >
              <Grid item>
                <Typography fontFamily={"Times New Roman"}>
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
                  Người làm đơn 2
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
        </Grid>
        {/* <Grid
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
                            </Grid> */}
      </Grid>
    </>
  );
}

export default SalarationLetter;
