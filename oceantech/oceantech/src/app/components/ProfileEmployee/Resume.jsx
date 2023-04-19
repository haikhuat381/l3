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
  // const formData = useSelector((state) => state?.Employee?.formData);
  const Gender = useSelector((state) => state?.Employee?.Gender);
  const employeeData = useSelector((state) => state?.Employee?.formData);
  const employeeCheck = useSelector((state) => {
    const data = state?.Employee?.formData
    return {
      ethnicity: data.ethnicity,
      religion: data.religion,
      citizenIdIssuingAuthority: data.citizenIdIssuingAuthority,
      citizenIdIssuanceDate: data.citizenIdIssuanceDate
    }
  });
  // const [employeeData, setEmployeeData] = useState(employee)
  const [resumeData, setResumeData] = useState()
  useEffect(() => {
    // setEmployeeData(employee)
    if(formDataResumeUpdate === undefined) {
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
  },[employeeData])

  useEffect(() => {
    if(!status) {
      handleChangeFormResume(resumeData)
    }
  },[resumeData])

  const handleChange = (event,method) => {
    const newValues = {...resumeData}
    newValues[method] = event.target.value
    setResumeData(newValues)
  }
  // console.log("employeeData", employeeData)
  // console.log("listRelationship", listRelationship)
  // console.log("resumeData", resumeData)

  const columns = [
    { title: "Họ và tên", field: "name" },
    {
      title: "Ngày sinh ",
      field: "dateOfBirth",
      render: (rowData) => moment(rowData.dateOfBirth).format("YYYY-MM-DD"),
    },
    {
      title: "Giới tính",
      field: "gender",
      render: (rowData) => Gender[rowData.gender]?.gender
    },
    {
      title: "Quan hệ",
      field: "relation",
      // render: (rowData) => rowData.relationship.relationship,
    },
    { title: "Địa chỉ", field: "address" },
    { title: "Số CMND", field: "citizenId" },
  ];

  return (
    <div ref={ref}>
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
      <Grid container spacing={14} padding={4} alignItems={"center"}>
        <Grid item xs={4} textAlign="center">
          <CustomAvatar image={employeeData?.resume?.photoUrl} displayButton={"none"} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">SƠ YẾU LÝ LỊCH</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" paddingBottom={1}>
              I. BẢN THÂN
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={8}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">1. Họ và tên:</InputAdornment>
                }
                name="fullName"
                readOnly={status}
                // value={formikRoot.values.fullName}
                // onChange={formikRoot.handleChange}
                // error={formikRoot.errors.fullName && formikRoot.touched.fullName}
                // helperText={formikRoot.errors.fullName}
                value={employeeData?.resume?.fullName}
                onChange={(event) => {
                  // handleChangeEmployee(event, "fullName");
                }}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Input
                id="standard-adornment-amount"
                fullWidth
                name="gender"
                onChange={formikRoot.handleChange}
                value={formikRoot.values.gender}
                error={formikRoot.errors.gender && formikRoot.errors.gender}
                helperText={formikRoot.errors.gender}
                startAdornment={<InputAdornment position="start"> Giới tính</InputAdornment>}
              /> */}
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">Giới tính:</InputAdornment>,
                  // readOnly: status,
                }}
                fullWidth
                // select
                variant="standard"
                value={Gender[employeeData?.resume?.gender]?.gender}
                name="gender"
                // onChange={formikRoot.handleChange}
                onChange={(event) => {
                  // handleChangeEmployee(event, "gender");
                }}
              >
                {/* {otherFeature?.Gender?.map((item) => (
                  <MenuItem key={item.id} value={item.gender}>
                    {item.gender}
                  </MenuItem>
                ))} */}
                {/* {Gender?.map((item) => {
                  console.log("item",item)
                  return  (
                    <MenuItem key={item.id} value={item.value}>
                      {item.gender}
                    </MenuItem>
                  )
                })} */}
              </TextField>
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

          <Grid item xs={12}>
            <Input
              type="date"
              readOnly={status}
              id="standard-adornment-amount"
              fullWidth
              startAdornment={<InputAdornment position="start">2. Sinh ngày:</InputAdornment>}
              value={moment(employeeData?.resume?.dateOfBirth).format("YYYY-MM-DD") || ""}
              name="birthday"
              onChange={(event) => {
                // handleChangeEmployee(event, "birthday");
              }}
            // onChange={formikRoot.handleChange}
            // error={formikRoot.errors.birthday && formikRoot.errors.birthday}
            // helperText={formikRoot.errors.birthday}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">3. Điện thoại:</InputAdornment>}
                value={employeeData?.resume?.phone}
                name="phone"
                onChange={(event) => {
                  // handleChangeEmployee(event, "phone");
                }}
              // onChange={formikRoot.handleChange}
              // error={formikRoot.errors.phone && formikRoot.touched.phone}
              // helperText={formikRoot.errors.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">Email:</InputAdornment>}
                name="email"
                value={employeeData?.resume?.email}
                onChange={(event) => {
                  // handleChangeEmployee(event, "email");
                }}
              // onChange={formikRoot.handleChange}
              // error={formikRoot.errors.email && formikRoot.touched.email}
              // helperText={formikRoot.errors.email}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Input
              id="standard-adornment-amount"
              fullWidth
              readOnly={status}
              startAdornment={<InputAdornment position="start">4. Chỗ ở hiện nay:</InputAdornment>}
              value={employeeData?.resume?.address}
              name="address"
              onChange={(event) => {
                // handleChangeEmployee(event, "address");
              }}
            // onChange={formikRoot.handleChange}
            // error={formikRoot.errors.address && formikRoot.errors.address}
            // helperText={formikRoot.errors.address}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">5. Dân tộc:</InputAdornment>,
                  readOnly: status,
                }}
                id="standard-adornment-amount"
                fullWidth
                name="ethnic"
                variant="standard"
                value={resumeData?.ethnicity || employeeData?.resume?.ethnicity}
                onChange={(event) => {
                  // console.log("event", event.target.value)
                  // handleChangeFormResume(event, "ethnicity");
                  handleChange(event, "ethnicity")
                }}
              >

              </TextField>

            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">Tôn giáo:</InputAdornment>,
                  readOnly: status,
                }}
                variant="standard"
                id="standard-adornment-amount"
                fullWidth
                name="religion"
                value={resumeData?.religion || employeeData?.resume?.religion}
                onChange={(event) => {
                  // handleChangeFormResume(event, "religion")
                  handleChange(event, "religion")
                }}
              >

              </TextField>

            </Grid>

          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <Input
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">6. Số CCCD:</InputAdornment>}
                name="identityCode"
                value={employeeData?.resume?.citizenId}
                onChange={(event) => {
                  // handleChangeEmployee(event, "identityCode");
                }}
              // onChange={formikRoot.handleChange}
              // error={formikRoot.errors.identityCode && formikRoot.touched.identityCode}
              // helperText={formikRoot.errors.identityCode}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                type="date"
                id="standard-adornment-amount"
                fullWidth
                readOnly={status}
                startAdornment={<InputAdornment position="start">Cấp ngày:</InputAdornment>}
                value={!resumeData?.citizenIdIssuanceDate ? moment(employeeData?.resume?.citizenIdIssuanceDate).format("YYYY-MM-DD") : moment(resumeData?.citizenIdIssuanceDate).format("YYYY-MM-DD")}
                name="citizenIdIssuanceDate"
                onChange={(event) => {
                  // handleChangeEmployee(event, "dateIssue");
                  handleChange(event, "citizenIdIssuanceDate")
                }}
              // onChange={formikRoot.handleChange}
              // error={formikRoot.errors.dateIssue && formikRoot.errors.dateIssue}
              // helperText={formikRoot.errors.dateIssue}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start">Nơi cấp:</InputAdornment>,
                readOnly: status,
              }}
              fullWidth
              // select
              variant="standard"
              name="citizenIdIssuingAuthority"
              value={resumeData?.citizenIdIssuingAuthority || employeeData?.resume?.citizenIdIssuingAuthority}
              // onChange={(event) => {
              //   formikRoot.setFieldValue("placeIssue", { place: event.target.value });
              // }}
              onChange={(event) => {
                // handleChangeFormResume(event, "citizenIdIssuingAuthority");
                handleChange(event, "citizenIdIssuingAuthority");
              }}
            >

            </TextField>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Typography variant="h5" paddingBottom={2}>
              II. QUAN HỆ GIA ĐÌNH
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              title={""}
              data={!listRelationship ? [] : listRelationship}
              columns={columns}
              options={{
                pageSize: 15,
                pageSizeOptions: [5, 10, 15, 20],
                rowStyle: (rowData, index) => {
                  return {
                    backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                    height: "48px",
                  };
                },
                maxBodyHeight: "1000px",
                minBodyHeight: "370px",
                headerStyle: {
                  backgroundColor: "#262e49",
                  color: "#fff",
                },
                // padding: 'dense',
                padding: "default",
                // search: false,
                // exportButton: true,
                toolbar: false,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});
export default Resume;
