import React, { useEffect, useState, } from "react";
import { Icon, TextField, IconButton } from "@mui/material";
import { Grid, Typography, Box, Input, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../Avatar/Avatar";
import moment from "moment";
import { json } from "react-router";

const CurriculumVitae = React.forwardRef((props, ref) => {
  const MyButton = styled(IconButton)({
    display: props.display,
  });
  const { employee, handleChangeFormCV, formDataCVUpdate, status } = props;
  // console.log("employeeeeeeeeeee", employee)
  const otherFeature = useSelector((state) => state?.Employee?.otherFeature);
  const Gender = useSelector((state) => state?.Employee?.Gender);
  const employeeData = useSelector((state) => state?.Employee?.formData);
  const teamId = useSelector((state) => state?.Employee?.employeeData?.employeeInfo?.teamId);
  // const employeeData = status ? employee : useSelector((state) => state?.Employee?.formData.resume);
  // const employeeData = employee;
  // console.log("employeeData hahaa", employeeData)

  const [textFieldValues, setTextFieldValues] = useState();
  useEffect(() => {
    // console.log("checkcheck", JSON.stringify(employee?.cv) === JSON.stringify(formDataCVUpdate) )
    if (formDataCVUpdate === undefined) {
      console.log("vao dayyyyyyyyyyyy")
      console.log("employeeData?.cv", employeeData?.cv)
      // console.log("formDataResumeUpdate === undefined)")
      // if(!formDataCVUpdate || Object.keys(formDataCVUpdate).length === 0) {
      setTextFieldValues(() => {
        const data = { ...employeeData?.cv }
        data.workExperiences = data?.workExperiences?.length !== 0 ? data?.workExperiences?.reduce((arr, data) => {
          return [...arr,
          {
            workExperienceId: data.workExpId,
            company: data.company,
            position: data.position,
            detail: data.detail,
            startDate: moment(data.startDate).format("YYYY-MM-DD"),
            endDate: moment(data.endDate).format("YYYY-MM-DD")
          }
          ]
        }, []) : [
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
    // handleWorkExperiences(textFieldValues)
    if (!status) {
      handleChangeFormCV(textFieldValues)
    }
  }, [textFieldValues])

  // console.log("textFieldValuessssssssssssss", textFieldValues)



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
    // console.log("newValues",newValues);
    setTextFieldValues(newValues)
  };

  const handleRemoveTextField = (index) => () => {
    const newValues = { ...textFieldValues };
    newValues.workExperiences.splice(index, 1)
    // console.log("newValues",newValues);
    setTextFieldValues(newValues);
  };

  const handleTextFieldChange = (event, index, method) => {
    const newValues = { ...textFieldValues };
    newValues["workExperiences"][index][method] = event.target.value;
    // console.log("newValues",newValues);
    setTextFieldValues(newValues);
  };
  const handleTextFieldChangeChange = (event, method) => {
    const newValues = { ...textFieldValues };
    newValues[method] = event.target.value;
    // console.log("newValues",newValues);
    setTextFieldValues(newValues);
  };

  return (
    <div ref={ref} style={{ height: 500, overflowY: "scroll", overflowX: "hidden" }}>
      <Grid container className="resume-container" xs={12} spacing={2} marginLeft={3}>
        <Grid container direction={"column"} xs={3.5} rowSpacing={2} className="resume-left">
          <Grid item sx={{ pt: 0, mb: 2 }}>
            <CustomAvatar image={employeeData?.resume?.photoUrl} displayButton={"none"} />
          </Grid>
          <Grid item>
            <Typography variant="h5" textAlign={"center"} marginTop={-4}>
              {employeeData?.resume?.fullName}
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"} fontSize={18}>
              {/* {otherFeature[employeeData?.resume?.teamId]?.name} */}
              {otherFeature[teamId]?.name}
            </Typography>
          </Grid>

          <Grid item container direction={"column"} rowSpacing={2}>
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
                  {moment(employeeData?.resume?.dateOfBirth).format("YYYY-MM-DD")}
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
          {/* <Grid item container direction={"column"} rowSpacing={2}>
            <Grid item>
              <Box className="title-skill">
                <Typography textTransform={"uppercase"} variant="subtitle1">
                  Kĩ Năng
                </Typography>
              </Box>
            </Grid>
            <Grid item className="textfield-box" m={"0 24px"}>
              <TextField
                  value={employeeData?.skill}
                  fullWidth
                  focused
                  InputProps={{ inputProps: { style: { color: "#fff" } }, readOnly: status }}
                  variant="standard"
                  name="skill"
                  onChange={(event) => {
                    // handleTextFieldChange(event, index, "generalIntroduction");
                    handleChangeFormCV(event, "skill")
                  }}
                ></TextField>
            </Grid>
          </Grid>
          <Grid item container direction={"column"} rowSpacing={2}>
            <Grid item>
              <Box className="title-hobby">
                <Typography textTransform={"uppercase"} variant="subtitle1">
                  Sở Thích
                </Typography>
              </Box>
            </Grid>
            <Grid item className="textfield-box" m={"0 24px"}>
              <TextField
                  value={employee?.hobby}
                  fullWidth
                  focused
                  InputProps={{ inputProps: { style: { color: "#fff" } }, readOnly: status }}
                  variant="standard"
                  name="hobby"
                  onChange={(event) => {
                    // handleTextFieldChange(event, index, "generalIntroduction");
                    handleChangeFormCV(event, "hobby")
                  }}
                ></TextField>
            </Grid>
          </Grid> */}
        </Grid>
        {/* <Grid item container xs={8} className="resume-right" direction={"column"} spacing={2}>
          <Grid item style={{ height: 550, overflowY: "scroll", margin: "16px" }}> */}
        <Grid item xs={8} className="resume-right" style={{ mb: 0, height: 600, overflowY: "scroll", overflowX: "hidden" }}>
          <Grid item container direction={"column"} spacing={2}>
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
                value={textFieldValues?.careerGoal || ""}
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
                value={textFieldValues?.skill || ""}
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
                value={textFieldValues?.hobby || ""}
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
              {/* {textFieldValues?.workExperiences?.map((value, index) => (
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", padding: "12px 0 0 0", borderBottom: index !== textFieldValues?.workExperiences?.length - 1 ? "1px solid #E5E5E5" : "" }} key={index}>
                  <div style={{ width: "23%" }}>
                    <Grid item container xs={12}>
                    <Grid item xs={12}>
                      <TextField
                        // className="cv-noReadonly"
                        className={!status ? "cv-noReadonly" : "cv-readonly"}
                        type="date"
                        InputProps={{
                          readOnly: status,
                          style: { padding: 0 },
                        }}
                        id="standard-adornment-amount"
                        fullWidth
                        name="startDate"
                        sx={{
                          "& fieldset": { border: "none", padding: 0 },
                          // "& label": { color: '#373E58'},
                        }}
                        label="Ngày bắt đầu"
                        InputLabelProps={{ shrink: true }}
                        margin="dense"
                        value={value.startDate}
                        onChange={(event) => {
                          handleTextFieldChange(event, index, "startDate");
                        }}
                      >
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        // className="cv-noReadonly"
                        className={!status ? "cv-noReadonly" : "cv-readonly"}
                        type="date"
                        InputProps={{
                          readOnly: status,
                          style: { padding: 0 },
                        }}
                        id="standard-adornment-amount"
                        fullWidth
                        name="endDate"
                        sx={{
                          "& fieldset": { border: "none", padding: 0 },
                        }}
                        label="Ngày kết thúc"
                        InputLabelProps={{ shrink: true }}
                        margin="dense"
                        value={value.endDate}
                        onChange={(event) => {
                          handleTextFieldChange(event, index, "endDate");
                        }}
                      >
                      </TextField>
                    </Grid>
                    </Grid>

                  </div>
                  <div style={{ width: status ? "73%" : "67%", paddingLeft: 25 }}>
                    <TextField
                      // className="cv-noReadonly"
                      className={!status ? "cv-noReadonly" : "cv-readonly"}
                      InputProps={{
                        readOnly: status,
                        style: { padding: 0 },
                      }}
                      fullWidth
                      // multiline
                      name="company"
                      sx={{
                        "& fieldset": { border: "none", padding: 0 },
                      }}
                      label="Công ty"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                      value={value.company}
                      onChange={(event) => {
                        handleTextFieldChange(event, index, "company");
                      }}
                    >
                    </TextField>
                    <TextField
                      // className="cv-noReadonly"
                      className={!status ? "cv-noReadonly" : "cv-readonly"}
                      InputProps={{
                        readOnly: status,
                        style: { padding: 0 },
                      }}
                      fullWidth
                      // multiline
                      name="position"
                      sx={{
                        "& fieldset": { border: "none", padding: 0 },
                      }}
                      label="Chức vụ"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                      value={value.position}
                      onChange={(event) => {
                        handleTextFieldChange(event, index, "position");
                      }}
                    >
                    </TextField>
                    <TextField
                      // className="cv-noReadonly"
                      className={!status ? "cv-noReadonly" : "cv-readonly"}
                      InputProps={{
                        readOnly: status,
                        style: { padding: 0 },
                      }}
                      fullWidth
                      // multiline
                      name="detail"
                      sx={{
                        "& fieldset": { border: "none", padding: 0 },
                      }}
                      label="Mô tả"
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                      value={value.detail}
                      onChange={(event) => {
                        handleTextFieldChange(event, index, "detail");
                      }}
                    >
                    </TextField>
                  </div>

                  <MyButton
                    style={{ display: status ? "none" : "flex" }}
                    onClick={handleRemoveTextField(index, "experience")}
                  >
                    <Icon className={"remove-button"}>remove_circle_outline</Icon>
                  </MyButton>
                </div>
              ))} */}
              {textFieldValues?.workExperiences?.map((value, index) => (
                <div className="workExperiences" style={{ display: "flex", alignItems: "start", justifyContent: "space-between", padding: "20px 0", borderBottom: index !== textFieldValues?.workExperiences?.length - 1 ? "1px solid #E5E5E5" : "" }} key={index}>
                  <Grid item container xs={12} fullWidth spacing={2}>
                    <Grid item container xs={12} fullWidth justifyContent="space-between" sx={{display: !status ? "flex" : "none"}}>
                      <Grid item container xs={5.4} sx={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
                        <Typography item xs={2}>Ngày bắt đầu:</Typography>
                        <Grid item xs={6.7}>
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
                      <Grid item container xs={5.4} sx={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
                        <Typography item xs={2}>Ngày kết thúc:</Typography>
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
                    <Grid item container xs={12} sx={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
                      <Typography item xs={2} sx={{display: !status ? "flex" : "none"}}>Tên công ty:</Typography>
                      <Grid item xs={!status ? 9.9 : 7.5} fullWidth>
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
                        {`${moment(value.startDate).format("DD/MM/YYYY")} - ${moment(value.endDate).format("DD/MM/YYYY")}`}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} sx={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
                      <Typography item xs={1} sx={{display: !status ? "flex" : "none"}}>Vị trí:</Typography>
                      <Grid item xs={!status ? 11 : 12} fullWidth>
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
                    <Grid item container xs={12} sx={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
                      <Typography item xs={2.2} sx={{display: !status ? "flex" : "none"}}>Mô tả công việc:</Typography>
                      <Grid item xs={!status ? 9.2 : 12} fullWidth>
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
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default CurriculumVitae;
