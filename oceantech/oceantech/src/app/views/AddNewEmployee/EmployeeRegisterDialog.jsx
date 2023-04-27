import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Resume from "app/components/ProfileEmployee/Resume";
import Diploma from "app/components/ProfileEmployee/Diploma";
import CurriculumVitae from "app/components/ProfileEmployee/CurriculumVitae";
import SendToLeadershipDialog from "./SendToLeadershipDialog";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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
import { updateFormAction } from "app/redux/actions/actions";
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
        <Box className="haitesttt" sx={{ padding: "0 24px !important" , paddingBottom: 0 }}>
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
            padding: "9px 24px",
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            zIndex: 10000
          }}
        >
          Hồ sơ nhân viên
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", padding: '0 24px', mt: 1 }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", overflow: "hidden" }}
          >
            <Tab label="Hồ sơ" {...a11yProps(0)} />
            <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} />
            <Tab label="Danh sách văn bằng" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0} style={{ width: "100%" }}>
            <CurriculumVitae
              // ref={componentRef}
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
          <TabPanel value={value} index={2} style={{ width: "100%" }}>
              <Diploma
                ref={componentRef}
                listDiploma={employeeData?.certificates}
              />
          </TabPanel>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
          <Button
            variant="contained"
            color="primary"
            sx={{display: saved === "none" ? "block" : "none" }}
            onClick={() => {
              dispatch(updateFormAction(employeeData?.employeeInfo?.employeeId, {
                resume: formDataResumeUpdate,
                cv: {...formDataCVUpdate, workExperiences: formDataCVUpdate.workExperiences.filter(data => data.startDate !== null && data.endDate !== null) }
              }))
              handleChangeReload(employeeData?.employeeInfo?.employeeId)
              setSaved("block");
            }}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{display: saved }}
            onClick={() => {
              setshouldOpenSendToLeadershipDialog(true);
              handleChangeReload(employeeData?.employeeInfo?.employeeId)
            }}
          >
            Gửi lãnh đạo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setShouldOpenConfirmPrint(true);
              setDisplay("none");
            }}
          >
            In
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleClose()}
          >
            Hủy
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
          status={employeeData?.employeeInfo?.status}
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
