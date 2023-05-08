import React, { useEffect, useState } from "react";
import { Typography, Grid, TextField } from "@mui/material";
import MaterialTable from "@material-table/core";
import CustomAvatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Resume = React.forwardRef((props, ref) => {
  const {
    listRelationship,
    handleChangeFormResume,
    formDataResumeUpdate,
    status,
  } = props;
  const dispatch = useDispatch();
  var today = new Date();
  const Gender = useSelector((state) => state?.Employee?.Gender);
  const employeeData = useSelector((state) => state?.Employee?.formData);
  //
  const [resumeData, setResumeData] = useState();
  useEffect(() => {
    if (formDataResumeUpdate === undefined) {
      setResumeData(() => {
        return {
          ethnicity: employeeData?.ethnicity,
          religion: employeeData?.religion,
          citizenIdIssuingAuthority: employeeData?.citizenIdIssuingAuthority,
          citizenIdIssuanceDate: employeeData?.citizenIdIssuanceDate,
        };
      });
    } else {
      setResumeData(formDataResumeUpdate);
    }
  }, [employeeData]);

  useEffect(() => {
    if (!status) {
      handleChangeFormResume(resumeData);
    }
  }, [resumeData]);

  const handleChange = (event, method) => {
    const newValues = { ...resumeData };
    newValues[method] = event.target.value;
    setResumeData(newValues);
  };

  const columns = [
    // {
    //   title: "STT",
    //   width: 50,
    //   render: (rowData) => rowData.tableData.index + 1
    // },
    { title: "Họ và tên", field: "name", width: 150 },
    {
      title: "Ngày sinh ",
      field: "dateOfBirth",
      width: 150,
      render: (rowData) => moment(rowData.dateOfBirth).format("DD-MM-YYYY"),
    },
    {
      title: "Giới tính",
      field: "gender",
      width: 150,
      render: (rowData) => Gender[rowData.gender]?.gender,
    },
    {
      title: "Quan hệ",
      field: "relation",
      width: 140,
    },
    { title: "Địa chỉ", field: "address", width: 200 },
    { title: "Số CMND/CMT", width: 180, field: "citizenId" },
  ];

  return (
    <div ref={ref} className="form-resume">
      <Grid item container xs={12} className="resum-container" spacing={0}>
        <Grid item xs={3}>
          <CustomAvatar
            image={employeeData?.resume?.photoUrl}
            displayButton={"none"}
            isNoneBorder={true}
          />
        </Grid>
        <Grid
          item
          container
          xs={9}
          textAlign="center"
          spacing={0}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12} spacing={0}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={"bold"}>
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={"bold"}>
                Độc lập - Tự do - Hạnh phúc{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>-------------------------------------</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={550}>
              SƠ YẾU LÝ LỊCH
            </Typography>
            <Typography variant="h6" fontSize={18}>
              TỰ THUẬT
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={"600"}>
              I. BẢN THÂN
            </Typography>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} className="self-items">
              <Typography item xs={2}>
                Họ và tên:
              </Typography>
              <Grid item fullWidth xs={9.7}>
                <TextField
                  className="rs-noReadonly"
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
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} className="self-items">
              <Typography item xs={2}>
                Giới tính:
              </Typography>
              <Grid item xs={9.9}>
                <TextField
                  className="rs-noReadonly"
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
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} className="self-items">
            <Typography item xs={2}>
              Sinh ngày:
            </Typography>
            <Grid item xs={10.9} fullWidth>
              <TextField
                // className= { !status ? "rs-noReadonly" : "rs-readonly"}
                className="rs-noReadonly"
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
                value={
                  moment(employeeData?.resume?.dateOfBirth).format(
                    "YYYY-MM-DD"
                  ) || ""
                }
                name="birthday"
              ></TextField>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} className="self-items">
              <Typography item xs={2}>
                Điện thoại:
              </Typography>
              <Grid item xs={9.6}>
                <TextField
                  className="rs-noReadonly"
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
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} className="self-items">
              <Typography item xs={1}>
                Email:
              </Typography>
              <Grid item xs={10.6}>
                <TextField
                  className="rs-noReadonly"
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
                ></TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} className="self-items">
            <Typography item xs={2}>
              Chỗ ở hiện nay:
            </Typography>
            <Grid item xs={10.4} fullWidth>
              <TextField
                // className= { !status ? "rs-noReadonly" : "rs-readonly"}
                className="rs-noReadonly"
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
              ></TextField>
            </Grid>
          </Grid>

          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} className="self-items">
              <Typography item xs={2}>
                Dân tộc:
              </Typography>
              <Grid item xs={10}>
                <TextField
                  className="rs-noReadonly"
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
                  value={
                    resumeData?.ethnicity || employeeData?.resume?.ethnicity
                  }
                  onChange={(event) => {
                    handleChange(event, "ethnicity");
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} className="self-items">
              <Typography item xs={2}>
                Tôn giáo:
              </Typography>
              <Grid item xs={9.9}>
                <TextField
                  className="rs-noReadonly"
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
                    handleChange(event, "religion");
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item container xs={5.8} className="self-items">
              <Typography item xs={2}>
                Số CCCD:
              </Typography>
              <Grid item xs={9.6}>
                <TextField
                  className="rs-noReadonly"
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
                  onChange={(event) => {}}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} className="self-items">
              <Typography item xs={2}>
                Cấp ngày:
              </Typography>
              <Grid item xs={9.8}>
                <TextField
                  className="rs-noReadonly"
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
                  value={
                    !resumeData?.citizenIdIssuanceDate
                      ? moment(
                          employeeData?.resume?.citizenIdIssuanceDate
                        ).format("YYYY-MM-DD")
                      : moment(resumeData?.citizenIdIssuanceDate).format(
                          "YYYY-MM-DD"
                        )
                  }
                  name="citizenIdIssuanceDate"
                  onChange={(event) => {
                    handleChange(event, "citizenIdIssuanceDate");
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} className="self-items">
            <Typography item xs={1.1}>
              Nơi cấp:
            </Typography>
            <Grid item xs={11} fullWidth>
              <TextField
                // className= { !status ? "rs-noReadonly" : "rs-readonly"}
                className="rs-noReadonly"
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
                value={
                  resumeData?.citizenIdIssuingAuthority ||
                  employeeData?.resume?.citizenIdIssuingAuthority
                }
                onChange={(event) => {
                  handleChange(event, "citizenIdIssuingAuthority");
                }}
              ></TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={"600"}>
              II. QUAN HỆ GIA ĐÌNH
            </Typography>
          </Grid>
          <Grid>
            <Typography className="note-relation">
              Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ,
              anh chị em ruột, vợ(hoặc chồng), con
            </Typography>
          </Grid>
          <Grid item xs={12} className="table-resume">
            <MaterialTable
              title={""}
              data={!listRelationship ? [] : listRelationship}
              columns={columns}
              // className="table-resume"
              style={{
                boxShadow: "none",
                fontFamily: "Times New Roman",
              }}
              sorting={false}
              options={{
                sorting: false,
                filtering: false,
                paging: false,
                pageSize: 15,
                pageSizeOptions: [5, 10, 15, 20],
                cellStyle: { border: "1px solid black" },
                headerStyle: {
                  border: "1px solid black",
                  fontWeight: "600",
                },
                padding: "default",
                toolbar: false,
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: "Không có thông tin",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} justify="center" alignItems="center">
            <Typography
              variant="h6"
              fontWeight={"600"}
              align="center"
              margin={"4px 0 8px"}
            >
              LỜI CAM ĐOAN
            </Typography>
          </Grid>
          <Grid>
            <Typography>
              Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có
              điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời
              khai của mình.
            </Typography>
          </Grid>

          <Grid
            container
            item
            sm={12}
            xs={12}
            sx={{ pl: 10, pr: 10, pt: 4, pb: 4 }}
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
              <Grid item>
                <Typography className="date-signatune">{`Hà Nội, ngày ${today.getDate()} tháng ${
                  today.getMonth() + 1
                } năm ${today.getFullYear()}`}</Typography>
              </Grid>
              <Grid item>
                <Typography className="title-name-signatune">
                  Người khai ký tên
                </Typography>
                <Typography className="note-signatune">
                  (Ký, ghi rõ họ tên)
                </Typography>
              </Grid>

              <Grid item>
                {" "}
                <Typography className="name-signatune">
                  {employeeData?.resume?.fullName.split(" ").pop()}
                </Typography>
              </Grid>
              <Grid item sx={{ paddingBottom: "10px" }}>
                <Typography className="name-signatune">
                  {employeeData?.resume?.fullName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});
export default Resume;
