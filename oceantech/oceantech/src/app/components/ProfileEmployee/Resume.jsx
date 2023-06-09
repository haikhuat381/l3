import React, { useEffect, useState } from "react";
import { Typography, Grid, TextField } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  citizenIdIssuanceDateAfterCurrentDate,
  formatDateSend,
  formatDateView,
  Gender,
  messageOfNoData,
  imageDefault
} from "app/constant";

const Resume = React.forwardRef((props, ref) => {
  const {
    listRelationship,
    handleChangeFormResume,
    formDataResumeUpdate,
    status,
  } = props;

  const today = new Date();
  const employeeData = useSelector((state) => state?.Employee?.formData);

  const [resumeData, setResumeData] = useState();
  useEffect(() => {
    setResumeData(formDataResumeUpdate);
  }, [employeeData]);

  useEffect(() => {
    if (!status) {
      handleChangeFormResume(resumeData);
    }
  }, [resumeData]);

  const handleChange = (event, method) => {
    const newValues = { ...resumeData };
    const today = formatDateSend(new Date())
    if (method === "citizenIdIssuanceDate" && event.target.value > today) {
      toast.warning(citizenIdIssuanceDateAfterCurrentDate);
    } else {
      newValues[method] = event.target.value;
    }
    setResumeData(newValues);
  };

  const columns = [
    {
      title: "STT",
      headerStyle: {textAlign: "center"},
      render: (rowData) => rowData.tableData.index + 1
    },
    { title: "Họ và tên", width: 200, field: "name" },
    {
      title: "Ngày sinh ",
      field: "dateOfBirth",
      width: 170,
      render: (rowData) => formatDateView(rowData?.dateOfBirth),
    },
    {
      title: "Giới tính",
      field: "gender",
      width: 160,
      render: (rowData) => Gender[rowData?.gender]?.gender,
    },
    {
      title: "Quan hệ",
      field: "relation",
      width: 140,
    },
    { title: "Số CCCD/CMT", 
      width: 180, 
      field: "citizenId" },
    { title: "Địa chỉ", field: "address", width: 180 },
  ];

  return (
    <div ref={ref} className="form-resume">
      <Grid item container xs={12} className="resum-container" spacing={0}>
        <Grid item xs={3}>
          <div className="form-resume-avatar">
            {
              <img src={employeeData?.resume?.photoUrl ? employeeData.resume.photoUrl : imageDefault} className="form-resume-img"/>
            }
          </div>
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
            <Typography variant="h6" className="title-resume">
              I. BẢN THÂN
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Họ và tên:</Typography>
              </Grid>
              <Grid item fullWidth xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  name="fullName"
                  size="small"
                  value={employeeData?.resume?.fullName}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Giới tính:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                  value={Gender[employeeData?.resume?.gender]?.gender}
                  name="gender"
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1} className="self-items">
            <Grid item xs="auto">
              <Typography>Sinh ngày:</Typography>
            </Grid>
            <Grid item xs={true} fullWidth>
              <TextField
                className="rs-noReadonly"
                type="date"
                InputProps={{
                  readOnly: true,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                size="small"
                value={formatDateSend(employeeData?.resume?.dateOfBirth) || ""}
                name="birthday"
              ></TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Điện thoại:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                  value={employeeData?.resume?.phone}
                  name="phone"
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                  name="email"
                  value={employeeData?.resume?.email}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={1} className="self-items">
            <Grid item xs="auto">
              <Typography>Chỗ ở hiện nay:</Typography>
            </Grid>
            <Grid item xs={true} fullWidth>
              <TextField
                className="rs-noReadonly"
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                size="small"
                value={employeeData?.resume?.address}
                name="address"
              ></TextField>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Dân tộc:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  name="ethnic"
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
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Tôn giáo:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  name="religion"
                  size="small"
                  value={resumeData?.religion || employeeData?.resume?.religion}
                  onChange={(event) => {
                    handleChange(event, "religion");
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Số CCCD/CMT:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                  name="identityCode"
                  value={employeeData?.resume?.citizenId}
                  onChange={(event) => {}}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={1} className="self-items">
              <Grid item xs="auto">
                <Typography>Cấp ngày:</Typography>
              </Grid>
              <Grid item xs={true}>
                <TextField
                  className="rs-noReadonly"
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  type="date"
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                  value={
                    !resumeData?.citizenIdIssuanceDate
                      ? formatDateSend(
                          employeeData?.resume?.citizenIdIssuanceDate
                        )
                      : formatDateSend(resumeData?.citizenIdIssuanceDate)
                  }
                  name="citizenIdIssuanceDate"
                  onChange={(event) => {
                    handleChange(event, "citizenIdIssuanceDate");
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1} className="self-items">
            <Grid item xs="auto">
              <Typography>Nơi cấp:</Typography>
            </Grid>
            <Grid item xs={true} fullWidth>
              <TextField
                className="rs-noReadonly"
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
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
            <Typography variant="h6" className="title-resume">
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
                  pointerEvents: "none",
                  border: "1px solid black",
                  fontWeight: "600",
                },
                padding: "default",
                toolbar: false,
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: messageOfNoData,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className="assure">
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
