import React, { useEffect, useState, } from "react";
import { Grid, Typography, Box, Icon, TextField, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import moment from "moment";
import { otherFeature, Gender, formatDateSend, formatDateView, messageOfNoData, imageDefault } from "app/constant";
import { getValue, handleEndDateChange, handleStartDateChange, transformStatusToValue } from "./constantCV";


const CurriculumVitae = React.forwardRef((props, ref) => {
  const MyButton = styled(IconButton)({
    display: props.display,
  });
  const { handleChangeFormCV, formDataCVUpdate, status } = props;


  const employeeData = useSelector((state) => state?.Employee?.formData);
  const teamId = useSelector((state) => state?.Employee?.employeeData?.employeeInfo?.teamId);
  const [cvData, setCvData] = useState();

  useEffect(() => {
    const getCvData = () => {
      const dataCV = { ...employeeData?.cv };
      const isCheckWorkExperienceNoData = dataCV?.workExperiences?.length !== 0
      dataCV.workExperiences = isCheckWorkExperienceNoData ? dataCV?.workExperiences?.map((data) => {
        return {
          workExperienceId: data?.workExpId,
          company: data?.company,
          position: data?.position,
          detail: data?.detail,
          startDate: formatDateSend(data?.startDate),
          endDate: formatDateSend(data?.endDate)
        };
      }) : [{ company: "", position: "", detail: "", startDate: null, endDate: null }];
      return dataCV;
    }
    setCvData(formDataCVUpdate || getCvData());
  }, [employeeData]);

  useEffect(() => {
    if (status) {
      return;
    }
    handleChangeFormCV(cvData);
  }, [cvData])

  const className = transformStatusToValue(status, "rs-readonly", "rs-noReadonly")
  const classNameCompany = transformStatusToValue(status, "workExperiences-items workExperiences-items-company", "workExperiences-items")
  const displayValue = transformStatusToValue(status, "none", "flex")
  const displayDateItemValue = transformStatusToValue(status, "", "none")
  const fontWeightValue = transformStatusToValue(status, "550", "450")

  const handleAddTextField = () => {
    const newValues = { ...cvData };
    newValues.workExperiences = [...newValues.workExperiences, {
      company: "",
      position: "",
      detail: "",
      startDate: null,
      endDate: null
    }]
    setCvData(newValues)
  };

  const handleRemoveTextField = (index) => () => {
    const newValues = { ...cvData };
    newValues.workExperiences.splice(index, 1)
    setCvData(newValues);
  };


  const handleTextFieldWorkExperiencesChange = (event, index, method) => {
    const newValues = { ...cvData };
    const workExperience = newValues.workExperiences[index];
    const { value } = event.target;
    const isCheckEndDate = method === 'endDate' && !handleEndDateChange(workExperience, value)
    const isCheckStartDate = method === 'startDate' && !handleStartDateChange(workExperience, value)

    if (isCheckEndDate || isCheckStartDate) {
      return;
    }

    workExperience[method] = value;
    setCvData(newValues);
  };

  const handleTextFieldChange = (event, method) => {
    const newValues = { ...cvData };
    newValues[method] = event.target.value;
    setCvData(newValues);
  };

  const experienceList = cvData?.workExperiences?.map((value, index) => {
    const isCheckStartDate = !value?.startDate
    const isCheckLengthWorkExperiences = cvData?.workExperiences?.length === 1
    const hasNoData = isCheckLengthWorkExperiences && isCheckStartDate && status;
    const result = hasNoData ? messageOfNoData : (
      <div className="workExperiences" key={value?.startDate || index}>
        <Grid item container xs={12} fullWidth spacing={2}>
          <Grid item container xs={12} spacing={2} justifyContent="space-between" sx={{ display: displayValue}}>
            <Grid item container xs={6} spacing={1} className="workExperiences-items">
              <Grid item xs="auto">
                <Typography>
                  Ngày bắt đầu:
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <TextField
                  type="date"
                  className={className}
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                  name="startDate"
                  value={value?.startDate || ""}
                  onChange={(event) => {
                    handleTextFieldWorkExperiencesChange(event, index, "startDate");
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={1} className="workExperiences-items">
              <Grid item xs="auto">
                <Typography>
                  Ngày kết thúc:
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <TextField
                  type="date"
                  className={className}
                  InputProps={{
                    readOnly: status,
                    style: { padding: 0 },
                  }}
                  id="standard-adornment-mount"
                  fullWidth
                  size="small"
                  name="endDate"
                  value={value?.endDate || ""}
                  onChange={(event) => {
                    handleTextFieldWorkExperiencesChange(event, index, "endDate");
                  }}
                >
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: displayDateItemValue}} className="workExperiences-items-date">
              <Typography className="workExp-date">
                {!value?.startDate || !value?.endDate || `${moment(value.startDate).format("DD/MM/YYYY")} - ${moment(value.endDate).format("DD/MM/YYYY")}`}
              </Typography>
            </Grid>
          <Grid item container xs={12} spacing={1} className={classNameCompany}>
            <Grid item xs="auto" sx={{ display: displayValue }}>
              <Typography>Tên công ty:</Typography>
            </Grid>
            <Grid item xs={true} fullWidth>
              <TextField
                multiline={status}
                className={className}
                InputProps={{
                  readOnly: status,
                  style: {
                    padding: 0,
                    fontWeight: fontWeightValue
                  },
                }}
                id="standard-adornment-mount"
                fullWidth
                size="small"
                name="company"
                value={value?.company}
                onChange={(event) => {
                  handleTextFieldWorkExperiencesChange(event, index, "company");
                }}
              >
              </TextField>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1} className="workExperiences-items">
            <Grid item xs="auto" sx={{ display: displayValue }}>
              <Typography>Vị trí:</Typography>
            </Grid>
            <Grid item xs={true} fullWidth>
              <TextField
                multiline={status}
                className={className}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                size="small"
                name="position"
                value={value?.position}
                onChange={(event) => {
                  handleTextFieldWorkExperiencesChange(event, index, "position");
                }}
              >
              </TextField>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1} className="workExperiences-items">
            <Grid item xs="auto" sx={{ display: displayValue }}>
              <Typography>Mô tả công việc:</Typography>
            </Grid>
            <Grid item xs={true} fullWidth>
              <TextField
                multiline={status}
                className={className}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                size="small"
                name="detail"
                value={value?.detail}
                onChange={(event) => {
                  handleTextFieldWorkExperiencesChange(event, index, "detail");
                }}
              >
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1} className="workExperiences-items-icon-remove" fullWidth sx={{ display: displayValue }}>
          <MyButton
            style={{ padding: 0 }}
            onClick={handleRemoveTextField(index)}
          >
            <Icon className={"remove-button"}>remove_circle_outline</Icon>
          </MyButton>
        </Grid>
      </div>
    );
    return result
  });


  return (
    <div ref={ref} className="container-cv">
      <Grid container xs={12} spacing={2} marginLeft={3} height="calc(100% + 16px)">
        <Grid container direction={"column"} xs={3.5} rowSpacing={2} className="cv-left">
          <Grid item>
            <Grid className="avatar-cv">
              <div className="avatar-cv-div">
                {
                  <img src={employeeData?.resume?.photoUrl ? employeeData.resume.photoUrl : imageDefault} className="avatar-cv-img"/>
                }
              </div>
            </Grid>
          </Grid>
          <Grid item className="cv-left-item">
            <Typography className="fullname-cv" variant="h5">
              {employeeData?.resume?.fullName}
            </Typography>
            <Typography className="teamId-cv" variant="subtitle1">
              {otherFeature[teamId - 1]?.name}
            </Typography>
          </Grid>

          <Grid item container direction={"column"} rowSpacing={3}>
            <Grid item>
              <Box className="title-info">
                <Typography textTransform={"uppercase"} variant="subtitle1">
                  Thông tin cơ bản
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>cakeIcon</Icon>
                <Typography variant="body2">
                  {formatDateView(employeeData?.resume?.dateOfBirth)}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>transgender</Icon>
                <Typography variant="body2">{Gender[employeeData?.resume?.gender]?.gender}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>location_on</Icon>
                <Typography variant="body2">{employeeData?.resume?.address}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>phone</Icon>
                <Typography variant="body2">{employeeData?.resume?.phone}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="item-box">
                <Icon>email</Icon>
                <Typography variant="body2">{employeeData?.resume?.email}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className="cv-right">
          <Grid item container direction={"column"} spacing={2} sx={{ pt: 2 }}>
            <Grid item className="cv-right-item">
              <Icon className="cv-right-icon">crisis_alert</Icon>
              <Typography className="cv-right-item-title" variant="body1">
                Mục tiêu nghề nghiệp
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                multiline={status}
                className={className}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                name="careerGoal"
                sx={{
                  marginLeft: "5px"
                }}
                size="small"
                value={getValue(cvData?.careerGoal, status)}
                onChange={(event) => {
                  handleTextFieldChange(event, "careerGoal")
                }}
              >
              </TextField>
            </Grid>
            <Grid item display={"flex"} justifyContent="space-between">
              <Box className="cv-right-item">
                <Icon className="cv-right-icon">handyman</Icon>
                <Typography className="cv-right-item-title" variant="body1">
                  Kĩ Năng
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <TextField
                multiline={status}
                className={className}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                name="skill"
                sx={{
                  marginLeft: "5px"
                }}
                size="small"
                value={getValue(cvData?.skill, status)}
                onChange={(event) => {
                  handleTextFieldChange(event, "skill")
                }}
              >
              </TextField>
            </Grid>
            <Grid item className="cv-right-item">
              <Icon className="cv-right-icon">sports_esports</Icon>
              <Typography className="cv-right-item-title" variant="body1">
                Sở Thích
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                multiline={status}
                className={className}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                name="hobby"
                sx={{
                  marginLeft: "5px"
                }}
                size="small"
                value={getValue(cvData?.hobby, status)}
                onChange={(event) => {
                  handleTextFieldChange(event, "hobby")
                }}
              >
              </TextField>
            </Grid>
            <Grid item display={"flex"} justifyContent="space-between">
              <Box className="cv-right-item">
                <Icon className="cv-right-icon">business_center</Icon>
                <Typography className="cv-right-item-title" variant="body1">
                  Kinh nghiệm làm việc
                </Typography>
              </Box>
              <MyButton
                style={{ display: displayValue, padding: 0 }}
                onClick={() => {
                  handleAddTextField();
                }}
              >
                <Icon sx={{ fontSize: "28px" }} className={"add-button"}>
                  control_point
                </Icon>
              </MyButton>
            </Grid>
            <Grid item container xs={12} className="workExperiences-container">
              {experienceList}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default CurriculumVitae;
