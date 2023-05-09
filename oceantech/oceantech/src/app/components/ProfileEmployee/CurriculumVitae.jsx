import React, { useEffect, useState, } from "react";
import { Icon, TextField, IconButton } from "@mui/material";
import { Grid, Typography, Box, Input, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../Avatar/Avatar";
import moment from "moment";

const CurriculumVitae = React.forwardRef((props, ref) => {
  const MyButton = styled(IconButton)({
    display: props.display,
  });
  const { employee, handleChangeFormCV, formDataCVUpdate, status } = props;

  const otherFeature = useSelector((state) => state?.Employee?.otherFeature);
  const Gender = useSelector((state) => state?.Employee?.Gender);
  const employeeData = useSelector((state) => state?.Employee?.formData);
  const teamId = useSelector((state) => state?.Employee?.employeeData?.employeeInfo?.teamId);
      
  
  const [textFieldValues, setTextFieldValues] = useState();
  useEffect(() => {
    if (formDataCVUpdate === undefined) {
      setTextFieldValues(() => {
        const data = { ...employeeData?.cv }
        data.workExperiences = data?.workExperiences?.length !== 0 ? data?.workExperiences?.map((data) => {
          return {
              workExperienceId: data?.workExpId,
              company: data?.company,
              position: data?.position,
              detail: data?.detail,
              startDate: moment(data?.startDate).format("YYYY-MM-DD"),
              endDate: moment(data?.endDate).format("YYYY-MM-DD")
          }
        }) : [
          {
            company: "",
            position: "",
            detail: "",
            startDate: null,
            endDate: null
          }
        ]
        return data
      })
    } else {
      setTextFieldValues(formDataCVUpdate)
    }
  }, [employeeData])

  useEffect(() => {
    if (!status) {
      handleChangeFormCV(textFieldValues)
    }
  }, [textFieldValues])

  const handleAddTextField = () => {
    const newValues = { ...textFieldValues };
    if (!!newValues?.workExperiences) {
      newValues.workExperiences = [...newValues.workExperiences, {
        company: "",
        position: "",
        detail: "",
        startDate: null,
        endDate: null
      }]
    }
    setTextFieldValues(newValues)
  };

  const handleRemoveTextField = (index) => () => {
    const newValues = { ...textFieldValues };
    newValues.workExperiences.splice(index, 1)
    setTextFieldValues(newValues);
  };

  const handleTextFieldChange = (event, index, method) => {
    const newValues = { ...textFieldValues };
    newValues["workExperiences"][index][method] = event.target.value;
    setTextFieldValues(newValues);
  };
  const handleTextFieldChangeChange = (event, method) => {
    const newValues = { ...textFieldValues };
    newValues[method] = event.target.value;
    setTextFieldValues(newValues);
  };

  return (
    <div ref={ref} className="container-cv">
      <Grid container className="resume-container" xs={12} spacing={2} marginLeft={3}>
        <Grid container direction={"column"} xs={4} rowSpacing={2} className="resume-left">
          <Grid item sx={{ pt: 0, mb: 2 }}>
            <CustomAvatar image={employeeData?.resume?.photoUrl} isPadding={true} displayButton={"none"} />
          </Grid>
          <Grid item>
            <Typography variant="h5" textAlign={"center"} marginTop={-3}>
              {employeeData?.resume?.fullName}
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"} fontSize={18}>
              {otherFeature[teamId]?.name}
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
                  {moment(employeeData?.resume?.dateOfBirth).format("DD-MM-YYYY")}
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
            <Grid item sx={{ padding: "10px 0" }}>
              <Box className="item-box">
                <Icon>email</Icon>
                <Typography variant="body2">{employeeData?.resume?.email}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7.5} className="resume-right" sx={{ mb: 0}}>
          <Grid item container direction={"column"} spacing={2} sx={{pt: 2}}>
            <Grid item display={"flex"} gap={1} alignItems="center" color={"#373E58"}>
              <Icon sx={{ fontSize: "32px" }}>crisis_alert</Icon>
              <Typography textTransform={"uppercase"} variant="body1" fontWeight={600} fontSize={18}>
                Mục tiêu nghề nghiệp
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                // className="rs-noReadonly"
                className={!status ? "rs-noReadonly" : "rs-readonly"}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                multiline
                name="careerGoal"
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                  marginLeft: "5px"
                }}
                size="small"
                value={textFieldValues?.careerGoal || (!status ? "" : "Không có thông tin")}
                onChange={(event) => {
                  handleTextFieldChangeChange(event, "careerGoal")
                }}
              >
              </TextField>
            </Grid>
            <Grid item display={"flex"} justifyContent="space-between">
              <Box display={"flex"} gap={1} alignItems="center" color={"#373E58"}>
                <Icon sx={{ fontSize: "32px" }}>handyman</Icon>
                <Typography textTransform={"uppercase"} variant="body1" fontWeight={600} fontSize={18}>
                  Kĩ Năng
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <TextField
                // className="rs-noReadonly"
                className={!status ? "rs-noReadonly" : "rs-readonly"}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                multiline
                name="skill"
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                  marginLeft: "5px"
                }}
                size="small"
                value={textFieldValues?.skill || (!status ? "" : "Không có thông tin")}
                onChange={(event) => {
                  handleTextFieldChangeChange(event, "skill")
                }}
              >
              </TextField>
            </Grid>
            <Grid item display={"flex"} gap={1} alignItems="center" color={"#373E58"}>
              <Icon sx={{ fontSize: "32px" }}>sports_esports</Icon>
              <Typography textTransform={"uppercase"} variant="body1" fontWeight={600} fontSize={18}>
                Sở Thích
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                // className="rs-noReadonly"
                className={!status ? "rs-noReadonly" : "rs-readonly"}
                InputProps={{
                  readOnly: status,
                  style: { padding: 0 },
                }}
                id="standard-adornment-mount"
                fullWidth
                multiline
                name="hobby"
                sx={{
                  "& fieldset": { border: "none", padding: 0 },
                  marginLeft: "5px"
                }}
                size="small"
                value={textFieldValues?.hobby || (!status ? "" : "Không có thông tin")}
                onChange={(event) => {
                  handleTextFieldChangeChange(event, "hobby")
                }}
              >
              </TextField>
            </Grid>
            <Grid item display={"flex"} justifyContent="space-between">
              <Box display={"flex"} gap={1} alignItems="center" color={"#373E58"}>
                <Icon sx={{ fontSize: "32px" }}>business_center</Icon>
                <Typography textTransform={"uppercase"} variant="body1" fontWeight={600} fontSize={18}>
                  Kinh nghiệm làm việc
                </Typography>
              </Box>
              <MyButton
                style={{ display: status ? "none" : "flex", padding: 0 }}
                onClick={() => {
                  handleAddTextField("experience");
                }}
              >
                <Icon sx={{ fontSize: "28px" }} className={"add-button"}>
                  control_point
                </Icon>
              </MyButton>
            </Grid>
            <Grid item container xs={12}>
              {
                textFieldValues?.workExperiences?.map((value, index) => (textFieldValues?.workExperiences?.length === 1 && !value.startDate && status) ? "Không có thông tin" :
                (
                  <div className="workExperiences" style={{ display: "flex", alignItems: "start", justifyContent: "space-between", padding: index === 0 ? "0 0 20px" : "20px 0", borderBottom: index !== textFieldValues?.workExperiences?.length - 1 ? "1px solid #E5E5E5" : "" }} key={index}>
                    <Grid item container xs={12} fullWidth spacing={2}>
                      <Grid item container xs={12} fullWidth justifyContent="space-between" sx={{display: !status ? "flex" : "none"}}>
                        <Grid item container xs={5.4} className="workExperiences-items">
                          <Typography item xs={2}>Ngày bắt đầu:</Typography>
                          <Grid item xs={6.5}>
                            <TextField
                              type="date"
                              // className="rs-noReadonly"
                              className= { !status ? "rs-noReadonly" : "rs-readonly"}
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
                              name="startDate"
                              value={value.startDate}
                              onChange={(event) => {
                                handleTextFieldChange(event, index, "startDate");
                              }}
                            >
                            </TextField>
                          </Grid>
                        </Grid>
                        <Grid item container xs={5.4} className="workExperiences-items">
                          <Typography item xs={2}>Ngày kết thúc:</Typography>
                          <Grid item xs={6.3}>
                            <TextField
                              type="date"
                              // className="rs-noReadonly"
                              className= { !status ? "rs-noReadonly" : "rs-readonly"}
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
                              name="endDate"
                              value={value.endDate}
                              onChange={(event) => {
                                handleTextFieldChange(event, index, "endDate");
                              }}
                            >
                            </TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} className="workExperiences-items">
                        <Typography item xs={2} sx={{display: !status ? "flex" : "none"}}>Tên công ty:</Typography>
                        <Grid item xs={!status ? 9.7 : 7.5} fullWidth>
                          <TextField
                            className= { !status ? "rs-noReadonly" : "rs-readonly"}
                            // className="rs-noReadonly"
                            InputProps={{
                              readOnly: status,
                              style: { 
                                padding: 0,
                                fontWeight: !status ? "450" : "550"
                              },
                            }}
                            id="standard-adornment-mount"
                            fullWidth
                            sx={{
                              "& fieldset": { border: "none", padding: 0 },
                            }}
                            size="small"
                            name="company"
                            value={value.company}
                            onChange={(event) => {
                              handleTextFieldChange(event, index, "company");
                            }}
                          >
                          </TextField>
                        </Grid>
                        <Typography item xs={4} sx={{fontSize: 14, fontWeight: 550, display: !status ? "none" : ""}}>
                          { !value.startDate || !value.endDate || `${moment(value.startDate).format("DD/MM/YYYY")} - ${moment(value.endDate).format("DD/MM/YYYY")}`}
                        </Typography>
                      </Grid>
                      <Grid item container xs={12} className="workExperiences-items">
                        <Typography item xs={1} sx={{display: !status ? "flex" : "none"}}>Vị trí:</Typography>
                        <Grid item xs={!status ? 10.9 : 12} fullWidth>
                          <TextField
                            className= { !status ? "rs-noReadonly" : "rs-readonly"}
                            // className="rs-noReadonly"
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
                            name="position"
                            value={value.position}
                            onChange={(event) => {
                              handleTextFieldChange(event, index, "position");
                            }}
                          >
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} className="workExperiences-items">
                        <Typography item xs={2.2} sx={{display: !status ? "flex" : "none"}}>Mô tả công việc:</Typography>
                        <Grid item xs={!status ? 9 : 12} fullWidth>
                          <TextField
                            className= { !status ? "rs-noReadonly" : "rs-readonly"}
                            // className="rs-noReadonly"
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
                            multiline
                            name="detail"
                            value={value.detail}
                            onChange={(event) => {
                              handleTextFieldChange(event, index, "detail");
                            }}
                          >
                          </TextField>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={1} fullWidth sx={{ display: !status ? "flex" : "none", justifyContent: "end", alignItems: "start" }}>
                      <MyButton
                        // style={{ display: status ? "none" : "flex", padding: 0 }}
                        style={{ padding: 0 }}
                        onClick={handleRemoveTextField(index, "experience")}
                      >
                        <Icon className={"remove-button"}>remove_circle_outline</Icon>
                      </MyButton>
                    </Grid>
                  </div>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default CurriculumVitae;
