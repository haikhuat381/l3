import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Resume from "app/components/ProfileEmployee/Resume";
import Diploma from "app/components/ProfileEmployee/Diploma";
import CurriculumVitae from "app/components/ProfileEmployee/CurriculumVitae";
import SendToLeadershipDialog from "./SendToLeadershipDialog";
import EmployeeDiploma from "./Employee/EmployeeDiploma";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  Box,
  IconButton,
  Icon,
} from "@mui/material";
import { updateEmployee, updateFormAction } from "app/redux/actions/actions";
import ConfirmPrintDialog from "./PrintDIalog";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "0 24px 0px 24px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function EmployeeRegisterDialog({
  handleClose,
  handleCloseAll,
  handleChangeReload
}) {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [display, setDisplay] = useState("");
  const employee = useSelector((state) => state?.Employee?.employeeData);
  const [employeeData, setEmployeeData] = useState(employee);
  const [formDataResumeUpdate, setFormDataResumeUpdate] = useState({});
  const [formDataCVUpdate, setFormDataCVUpdate] = useState({});
  const [shouldOpenConfirmPrint, setShouldOpenConfirmPrint] = useState(false);
  const [
    shouldOpenSendToLeadershipDialog,
    setshouldOpenSendToLeadershipDialog,
  ] = useState(false);
  const [saved, setSaved] = useState("none");


  // console.log("employeeData haikhuat", employeeData)
  // console.log("formDataResumeUpdate haikhuat", formDataResumeUpdate)
  // console.log("formDataCVUpdate haikhuat", formDataCVUpdate)
  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);

  const handleChangeEmployee = (event, method) => {
    if (method === "placeIssue") {
      setEmployeeData({
        ...employeeData, [method]: { place: event.target.value },
      });
    } else {
      setEmployeeData({ ...employeeData, [method]: event.target.value });
    }
  };

  const handleChangeFormResume = (data) => {
    setFormDataResumeUpdate(data);
  };
  const handleChangeFormCV = (data) => {
    setFormDataCVUpdate(data);
  };
  


  const handleAddToList = (data, method) => {
    setEmployeeData({
      ...employeeData,
      [method]: [...employeeData[method], data],
    });
  };
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Hồ sơ nhân viên
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Hồ sơ" {...a11yProps(0)} />
            <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} />
            <Tab label="Danh sách văn bằng" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0} style={{ width: "100%" }}>
            <CurriculumVitae
              ref={componentRef}
              status={false}
              IdEmployeeData={employeeData?.employeeInfo?.employeeId}
              handleChangeFormCV={handleChangeFormCV}
              employee={employeeData?.employeeInfo}
              formDataCVUpdate={formDataCVUpdate}

              handleChangeEmployee={handleChangeEmployee}
              handleAddRelation={handleAddToList}
            />
          </TabPanel>
          <TabPanel value={value} index={1} style={{ width: "100%" }}>

            <Resume
              listRelationship={employeeData?.familyRelations}
              ref={componentRef}
              status={false}
              handleChangeFormResume={handleChangeFormResume}
              employee={employeeData?.employeeInfo}
              formDataResumeUpdate={formDataResumeUpdate}

              display={display}
            />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ width: "100%", marginLeft:"30px" }}>
            <Diploma
              ref={componentRef}
              listDiploma={employeeData?.certificates}
            />
          </TabPanel>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => {
              setShouldOpenConfirmPrint(true);
              setDisplay("none");
            }}
          >
            In
          </Button>

          <Button
            variant="contained"
            sx={{ mb: 2, background: "#FF9E43" }}
            onClick={() => handleClose()}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2, background: "#7467EF",  display: saved === "none" ? "block" : "none" }}
            onClick={() => {
              employeeData.status = "Chờ xử lý";
              dispatch(updateFormAction(employeeData?.employeeInfo?.employeeId, {
                resume: formDataResumeUpdate,
                cv: formDataCVUpdate
              }))
              handleChangeReload(employeeData?.employeeInfo?.employeeId)
              setSaved("block");
              // dispatch(updateEmployee(employeeData));
            }}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2, background: "#339999", display: saved }}
            onClick={() => {
              setshouldOpenSendToLeadershipDialog(true);
              handleChangeReload(employeeData?.employeeInfo?.employeeId)
            }}
          >
            Gửi lãnh đạo
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenSendToLeadershipDialog && (
        <SendToLeadershipDialog
          handleCloseAll={handleCloseAll}
          handleClose={() => {
            setshouldOpenSendToLeadershipDialog(false);
          }}
          employeeId={employeeData?.employeeInfo?.employeeId}
        />
      )}
      {shouldOpenConfirmPrint && (
        <ConfirmPrintDialog
          handleClose={() => {
            setShouldOpenConfirmPrint(false);
            setDisplay("");
          }}
          componentRef={componentRef}
        />
      )}
    </>
  );
}
