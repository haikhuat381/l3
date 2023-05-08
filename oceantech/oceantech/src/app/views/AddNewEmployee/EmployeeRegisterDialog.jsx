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
  const [saved, setSaved] = useState(true);

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
      <Dialog open={true} maxWidth={"lg"} fullWidth 
        sx={{
          '& .MuiDialog-paper': {
            minHeight: '680px',
          },
        }}
      >
        <DialogTitle className="dialog-title"
        >
          Thông tin hồ sơ
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
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
          <TabPanel value={value} index={0} className="tab-items">
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
          <TabPanel value={value} index={1} className="tab-items">

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
          <TabPanel value={value} index={2} className="tab-items">
              <Diploma
                ref={componentRef}
                listDiploma={employeeData?.certificates}
              />
          </TabPanel>
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button
            variant="contained"
            color="primary"
            disabled={!saved}
            onClick={() => {
              dispatch(updateFormAction(employeeData?.employeeInfo?.employeeId, {
                resume: formDataResumeUpdate,
                cv: {...formDataCVUpdate, workExperiences: formDataCVUpdate?.workExperiences?.filter(data => data.startDate !== null && data.endDate !== null && data.startDate !== "Invalid date" && data.endDate !== "Invalid date") }
              }))
              // handleChangeReload(employeeData?.employeeInfo?.employeeId)
              handleChangeReload(Math.random().toString(36).slice(-5))
              setSaved(false);
            }}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={saved}
            onClick={() => {
              setshouldOpenSendToLeadershipDialog(true);
              // handleChangeReload(employeeData?.employeeInfo?.employeeId)
              handleChangeReload(Math.random().toString(36).slice(-5))
            }}
          >
            Gửi lãnh đạo
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setShouldOpenConfirmPrint(true);
              setDisplay("none");
            }}
          >
            In
          </Button> */}

          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
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
          // status={employeeData?.employeeInfo?.status}
          status="3"
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
