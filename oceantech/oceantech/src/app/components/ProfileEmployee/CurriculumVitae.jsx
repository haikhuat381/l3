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
  // const employeeData = status ? employee : useSelector((state) => state?.Employee?.formData.resume);
  // const employeeData = employee;
  // console.log("employeeData hahaa", employeeData)

  const [textFieldValues, setTextFieldValues] = useState();
  useEffect(() => {
      // console.log("checkcheck", JSON.stringify(employee?.cv) === JSON.stringify(formDataCVUpdate) )
      if(formDataCVUpdate === undefined) {
        // console.log("formDataResumeUpdate === undefined)")
        // if(!formDataCVUpdate || Object.keys(formDataCVUpdate).length === 0) {
        setTextFieldValues(() => {
          const data = {...employeeData?.cv}
          data.workExperiences = data?.workExperiences?.length !==0 ? data?.workExperiences?.reduce((arr,data) => {
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
          },[]) : [
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
  },[employeeData])

  useEffect(() => {
    // handleWorkExperiences(textFieldValues)
    if(!status) {
      handleChangeFormCV(textFieldValues)
    }
  },[textFieldValues])

  // console.log("textFieldValuessssssssssssss", textFieldValues)

  

  const handleAddTextField = () => {
    const newValues = {...textFieldValues};
    if(!!newValues?.workExperiences) {
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
    const newValues = {...textFieldValues};
    newValues.workExperiences.splice(index, 1)
    // console.log("newValues",newValues);
    setTextFieldValues(newValues);
  };

  const handleTextFieldChange = (event, index, method) => {
    const newValues = {...textFieldValues};
    newValues["workExperiences"][index][method] = event.target.value;
    // console.log("newValues",newValues);
    setTextFieldValues(newValues);
  };
  const handleTextFieldChangeChange = (event, method) => {
    const newValues = {...textFieldValues};
    newValues[method] = event.target.value;
    // console.log("newValues",newValues);
    setTextFieldValues(newValues);
  };

  return (
    <div ref={ref}>
      <Grid container className="resume-container" xs={12} spacing={2}>
        <Grid container direction={"column"} xs={4} rowSpacing={2} className="resume-left">
          <Grid item>
            <CustomAvatar image={employeeData?.resume?.photoUrl} displayButton={"none"} />
          </Grid>
          <Grid item>
            <Typography variant="h5" textAlign={"center"} textTransform={"uppercase"}>
              {employeeData?.resume?.fullName}
            </Typography>
            <Typography variant="subtitle1" textAlign={"center"}>
              {otherFeature[employeeData?.resume?.teamId]?.name}
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
            <Grid item>
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
        <Grid item container xs={8} className="resume-right" direction={"column"} spacing={4}>
          <Grid item display={"flex"} gap={1} alignItems="center">
            <Icon sx={{ fontSize: "28px" }}>crisis_alert</Icon>
            <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
              Mục tiêu nghề nghiệp
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              // value={employeeData?.cv?.careerGoal || formDataCVUpdate?.careerGoal}
              value={textFieldValues?.careerGoal}
              fullWidth
              // multiline
              InputProps={{ readOnly: status }}
              variant="standard"
              name="careerGoal"
              onChange={(event) => {
                // handleTextFieldChange(event, index, "careerGoal");
                handleTextFieldChangeChange(event, "careerGoal")
                // handleChangeFormCV(event, "careerGoal")
              }}
            ></TextField>
          </Grid>
          <Grid item display={"flex"} justifyContent="space-between">
            <Box display={"flex"} gap={1} alignItems="center">
              <Icon sx={{ fontSize: "28px" }}>handyman</Icon>
              <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
                Kĩ Năng
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <TextField
              // value={textFieldValues?.skill || formDataCVUpdate?.skill}
              value={textFieldValues?.skill}
              fullWidth
              // multiline
              InputProps={{ readOnly: status }}
              variant="standard"
              name="skill"
              onChange={(event) => {
                // handleTextFieldChange(event, index, "generalIntroduction");
                handleTextFieldChangeChange(event, "skill")
                // handleChangeFormCV(event, "skill")
              }}
            ></TextField>
          </Grid>
          <Grid item display={"flex"} gap={1} alignItems="center">
            <Icon sx={{ fontSize: "28px" }}>sports_esports</Icon>
            <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
              Sở Thích
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              // value={textFieldValues?.hobby || formDataCVUpdate?.hobby }
              value={textFieldValues?.hobby}
              fullWidth
              // multiline
              InputProps={{ readOnly: status }}
              variant="standard"
              name="hobby"
              onChange={(event) => {
                // handleTextFieldChange(event, index, "generalIntroduction");
                handleTextFieldChangeChange(event, "hobby")
                // handleChangeFormCV(event, "hobby")
              }}
            ></TextField>
          </Grid>
          <Grid item display={"flex"} justifyContent="space-between">
            <Box display={"flex"} gap={1} alignItems="center">
              <Icon sx={{ fontSize: "28px" }}>business_center</Icon>
              <Typography textTransform={"uppercase"} variant="body1" fontWeight={600}>
                Kinh nghiệm làm việc
              </Typography>
            </Box>
            <MyButton
              style={{display: status ? "none" : "flex"}}
              onClick={() => {
                handleAddTextField("experience");
              }}
            >
              <Icon sx={{ fontSize: "28px" }} className={"add-button"}>
                control_point
              </Icon>
            </MyButton>
          </Grid>
          <Grid item>
            {textFieldValues?.workExperiences?.map((value, index) => (
              <div style={{ display: "flex", alignItems: "start", justifyContent:"space-between", paddingBottom:16 }} key={index}>
                <div style={{width:"23%"}}>
                  {/* <Grid item container xs={12}> */}
                    <Grid item xs={12}>
                      <TextField
                        type="date"
                        // value={value.startDate || formDataCVUpdate?.workExperiences[index]?.startDate}
                        value={value.startDate}
                        // readOnly={status}
                        InputProps={{
                          // startAdornment: <InputAdornment position="start">Công ty:</InputAdornment>,
                          readOnly: status,
                        }}
                        InputLabelProps={{ shrink: true }} 
                        id="standard-adornment-amount"
                        // startAdornment={<InputAdornment position="start">Từ</InputAdornment>}
                        fullWidth
                        style={{paddingLeft:5}}
                        // multiline
                        name="startDate"
                        variant="standard"
                        label="Ngày bắt đầu"
                        margin="dense"
                        // InputProps={{ readOnly: status }}
                        onChange={(event) => {
                          handleTextFieldChange(event, index, "startDate");
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="date"
                        // value={value.endDate || formDataCVUpdate?.workExperiences[index]?.endDate}
                        value={value.endDate}
                        // readOnly={status}
                        InputProps={{
                          // startAdornment: <InputAdornment position="start">Công ty:</InputAdornment>,
                          readOnly: status,
                        }}
                        InputLabelProps={{ shrink: true }} 
                        id="standard-adornment-amount"
                        // startAdornment={<InputAdornment position="start" >-</InputAdornment>}
                        fullWidth
                        style={{paddingLeft:5}}
                        margin="dense"
                        // multiline
                        name="endDate"
                        variant="standard"
                        label="Ngày kết thúc"
                        // InputProps={{ readOnly: status }}
                        onChange={(event) => {
                          handleTextFieldChange(event, index, "endDate");
                        }}
                      />
                    </Grid>
                  {/* </Grid> */}
                
                </div>
                <div style={{width: status ? "73%" : "67%", paddingLeft:25}}>
                  <TextField
                    // value={value.company || formDataCVUpdate?.workExperiences[index]?.company}
                    value={value.company}
                    fullWidth
                    multiline
                    name="company"
                    variant="standard"
                    label="Công ty"
                    // size="small"
                    margin="dense"
                    // variant="filled"
                    InputProps={{
                      // startAdornment: <InputAdornment position="start">Công ty:</InputAdornment>,
                      readOnly: status,
                    }}
                    onChange={(event) => {
                      handleTextFieldChange(event, index, "company");
                    }}
                  />
                  <TextField
                    // value={value.position || formDataCVUpdate?.workExperiences[index]?.position}
                    value={value.position}
                    fullWidth
                    multiline
                    name="position"
                    variant="standard"
                    label="Chức vụ"
                    // size="small"
                    margin="dense"
                    InputProps={{
                      // startAdornment: <InputAdornment position="start">Chức vụ:</InputAdornment>,
                      readOnly: status,
                    }}
                    onChange={(event) => {
                      handleTextFieldChange(event, index, "position");
                    }}
                  />
                  <TextField
                    value={value.detail}
                    fullWidth
                    multiline
                    name="detail"
                    variant="standard"
                    label="Mô tả"
                    // size="small"
                    InputProps={{
                      // startAdornment: <InputAdornment position="start">Mô tả:</InputAdornment>,
                      readOnly: status,
                    }}
                    onChange={(event) => {
                      handleTextFieldChange(event, index, "detail");
                    }}
                  />

                </div>

                <MyButton 
                  style={{display: status ? "none" : "flex"}}
                  onClick={handleRemoveTextField(index, "experience")}
                >
                  <Icon className={"remove-button"}>remove_circle_outline</Icon>
                </MyButton>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default CurriculumVitae;
