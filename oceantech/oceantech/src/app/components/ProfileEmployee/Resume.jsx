import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Select,
  TextField,
  MenuItem,
  IconButton,
  Icon,
  Tooltip,
} from "@mui/material";
import MaterialTable from "@material-table/core";
import { InputAdornment, Input } from "@mui/material";
import CustomAvatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { getFormDataAction } from "app/redux/actions/actions";
import moment from "moment";


const Resume = React.forwardRef((props, ref) => {
  // console.log("props", props)
  // console.log("ref", ref)
  const { listRelationship, handleChangeFormResume, formDataResumeUpdate, handleChangeEmployee, handleAddRelation, status } = props;
  const dispatch = useDispatch()
  var today = new Date();
  // const formData = useSelector((state) => state?.Employee?.formData);
  const Gender = useSelector((state) => state?.Employee?.Gender);
  const employeeData = useSelector((state) => state?.Employee?.formData);
  //  
  // const [employeeData, setEmployeeData] = useState(employee)
  const [resumeData, setResumeData] = useState()
  useEffect(() => {
    // setEmployeeData(employee)
    if (formDataResumeUpdate === undefined) {
      // if(JSON.stringify(formDataResumeUpdate) === JSON.stringify(employeeCheck)) {
      // setResumeData(employeeCheck)
      // console.log("formDataResumeUpdate === undefined)")
      setResumeData(() => {
        return {
          ethnicity: employeeData.ethnicity,
          religion: employeeData.religion,
          citizenIdIssuingAuthority: employeeData.citizenIdIssuingAuthority,
          citizenIdIssuanceDate: employeeData.citizenIdIssuanceDate
        }
      })
    } else {
      setResumeData(formDataResumeUpdate)
    }
  }, [employeeData])

  useEffect(() => {
    if (!status) {
      handleChangeFormResume(resumeData)
    }
  }, [resumeData])

  const handleChange = (event, method) => {
    const newValues = { ...resumeData }
    newValues[method] = event.target.value
    setResumeData(newValues)
  }
  // console.log("employeeData", employeeData)
  // console.log("listRelationship", listRelationship)
  // console.log("resumeData", resumeData)

  const columns = [
    { title: "Họ và tên", field: "name", width: 200 },
    {
      title: "Ngày sinh ",
      field: "dateOfBirth",
      width: 140,
      render: (rowData) => moment(rowData.dateOfBirth).format("YYYY-MM-DD"),
    },
    {
      title: "Giới tính",
      field: "gender",
      width: 140,
      render: (rowData) => Gender[rowData.gender]?.gender
    },
    {
      title: "Quan hệ",
      field: "relation",
      width: 140,
      // render: (rowData) => rowData.relationship.relationship,
    },
    { title: "Địa chỉ", field: "address", width: 200 },
    { title: "Số CMND", field: "citizenId" },
  ];

  return (
    <div ref={ref} style={{padding:"0 50px", height: 550, overflowY: "scroll"}}>
      <Grid container textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h5">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Độc lập - Tự do - Hạnh phúc </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>-------------------------------------</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={14} padding={2} >
        <Grid item xs={4} textAlign="center">
          <CustomAvatar image={employeeData?.resume?.photoUrl} displayButton={"none"} isNoneBorder={true} />
        </Grid>
        <Grid item xs={8} marginTop={8}>
          <Typography variant="h4" fontWeight={550}>SƠ YẾU LÝ LỊCH</Typography>
          <Typography variant="h6" marginLeft={10}>TỰ THUẬT</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" paddingBottom={1}>
              I. BẢN THÂN
            </Typography>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }} >
              <Typography item xs={3}>1. Họ và tên:</Typography>
              <Grid item fullWidth xs={9}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  name="fullName"
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  value={employeeData?.resume?.fullName}
                  onChange={(event) => {
                    // handleChangeEmployee(event, "fullName");
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
              <Typography item xs={2}>Giới tính:</Typography>
              <Grid item xs={9.8}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  value={Gender[employeeData?.resume?.gender]?.gender}
                  name="gender"
                  onChange={(event) => {
                    // handleChangeEmployee(event, "gender");
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            <Input
              id="standard-adornment-amount"
              fullWidth
              startAdornment={
                <InputAdornment position="start">2. Họ tên thường dùng</InputAdornment>
              }
            />
          </Grid> */}
          <Grid item container xs={12} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
            <Typography item xs={2}>2. Sinh ngày:</Typography>
            <Grid item xs={10.5} fullWidth>
              <TextField
                // className= { !status ? "hai-test" : "hai-testt"}
                className="hai-test"
                type="date"
                InputProps={{
                  readOnly: true,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                size="small"
                value={moment(employeeData?.resume?.dateOfBirth).format("YYYY-MM-DD") || ""}
                name="birthday"
              >
              </TextField>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
              <Typography item xs={3}>3. Điện thoại:</Typography>
              <Grid item xs={9}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  value={employeeData?.resume?.phone}
                  name="phone"
                  onChange={(event) => {
                    // handleChangeEmployee(event, "phone");
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
              <Typography item xs={1}>Email:</Typography>
              <Grid item xs={10.5}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  name="email"
                  value={employeeData?.resume?.email}
                  onChange={(event) => {
                    // handleChangeEmployee(event, "email");
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
            <Typography item xs={2}>4. Chỗ ở hiện nay:</Typography>
            <Grid item xs={10} fullWidth>
              <TextField
                // className= { !status ? "hai-test" : "hai-testt"}
                className="hai-test"
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                size="small"
                value={employeeData?.resume?.address}
                name="address"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
              <Typography item xs={2}>5. Dân tộc:</Typography>
              <Grid item xs={9.5}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  name="ethnic"
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  value={resumeData?.ethnicity || employeeData?.resume?.ethnicity}
                  onChange={(event) => {
                    handleChange(event, "ethnicity")
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
              <Typography item xs={2}>Tôn giáo:</Typography>
              <Grid item xs={9.8}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  name="religion"
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  value={resumeData?.religion || employeeData?.resume?.religion}
                  onChange={(event) => {
                    handleChange(event, "religion")
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
              <Typography item xs={3}>6. Số CCCD:</Typography>
              <Grid item xs={9}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  name="identityCode"
                value={employeeData?.resume?.citizenId}
                onChange={(event) => {

                }}
                >
                </TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
              <Typography item xs={2}>Cấp ngày:</Typography>
              <Grid item xs={9.7}>
                <TextField
                  className="hai-test"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  type="date"
                  id="standard-adornment-mount"
                  fullWidth
                  sx={{
                    "& fieldset": { border: "none", padding: 0 },
                  }}
                  size="small"
                  value={!resumeData?.citizenIdIssuanceDate ? moment(employeeData?.resume?.citizenIdIssuanceDate).format("YYYY-MM-DD") : moment(resumeData?.citizenIdIssuanceDate).format("YYYY-MM-DD")}
                  name="citizenIdIssuanceDate"
                  onChange={(event) => {
                    handleChange(event, "citizenIdIssuanceDate")
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} sx={{ position: "relative", display: "flex", justifyContent:"space-between" }}>
            <Typography item xs={1}>Nơi cấp:</Typography>
            <Grid item xs={11} fullWidth>
              <TextField
                // className= { !status ? "hai-test" : "hai-testt"}
                className="hai-test"
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                }}
                size="small"
                name="citizenIdIssuingAuthority"
                value={resumeData?.citizenIdIssuingAuthority || employeeData?.resume?.citizenIdIssuingAuthority}
                onChange={(event) => {
                  handleChange(event, "citizenIdIssuingAuthority");
                }}
              >
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Typography variant="h5" paddingBottom={2}>
              II. QUAN HỆ GIA ĐÌNH
            </Typography>
          </Grid>
          <Grid>
            <Typography style={{ fontStyle: "italic"}}>Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ, anh chị em ruột, vợ(hoặc chồng), con</Typography>

          </Grid>
          <Grid item xs={12} style={{ margin: "10px 0 20px 0" }}>
            <MaterialTable
              title={""}
              data={!listRelationship ? [] : listRelationship}
              columns={columns}
              className="table-resume"
              style={{ boxShadow: "none" }}
              options={{
                sorting: false,
                paging: false,
                pageSize: 15,
                pageSizeOptions: [5, 10, 15, 20],
                cellStyle: { border: '1px solid black' },
                headerStyle: {
                  border: '1px solid black',
                  fontWeight: "600",
                  // textAlign: 'center'
                },
                padding: "default",
                toolbar: false,
              }}
            />
          </Grid>
          <Grid>
            <Typography>Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời khai của mình.</Typography>

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
              sm={5}
              xs={5}
              container
              direction="column"
              textAlign="center"
              spacing={1}
            >
              <Grid item >
                <Typography>{`Hà Nội, ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: "bold" }}>Người khai</Typography>
              </Grid>
              <Grid item>
                {" "}
                <Typography style={{ fontWeight: "bold" }}>
                  {employeeData?.resume?.fullName.split(" ").pop()}
                </Typography>
              </Grid>
              <Grid item sx={{paddingBottom: "10px"}}>
                <Typography style={{ fontWeight: "bold" }}>{employeeData?.resume?.fullName}</Typography>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
});
export default Resume;
