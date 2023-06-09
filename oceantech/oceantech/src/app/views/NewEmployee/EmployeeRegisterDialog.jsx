import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Resume from "app/components/ProfileEmployee/Resume";
import Diploma from "app/components/ProfileEmployee/Diploma";
import CurriculumVitae from "app/components/ProfileEmployee/CurriculumVitae";
import SendToLeadershipDialog from "app/components/RecordComponents/SendToLeadershipDialog";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  IconButton,
  Icon,
} from "@mui/material";
import { updateFormAction } from "app/redux/actions/actions";
import { pendingStatus } from "app/constant";
import LoadingBay from "app/components/LoadingBay";
import { TabPanel, a11yProps} from "app/components/TabsCustom/TabsCustom";


export default function EmployeeRegisterDialog({
  handleClose,
  handleCloseAll,
  handleChangeReload,
}) {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const employee = useSelector((state) => state?.Employee?.employeeData);
  const loading = useSelector((state) => state?.Employee?.loading);
  const [employeeData, setEmployeeData] = useState(employee);
  const [formDataResumeUpdate, setFormDataResumeUpdate] = useState();
  const [formDataCVUpdate, setFormDataCVUpdate] = useState();
  const [
    shouldOpenSendToLeadershipDialog,
    setshouldOpenSendToLeadershipDialog,
  ] = useState(false);

  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);

  const handleChangeEmployee = (event, method) => {
    if (method === "placeIssue") {
      setEmployeeData({
        ...employeeData,
        [method]: { place: event.target.value },
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
      <Dialog open={true} maxWidth={"lg"} fullWidth className="form-dialog">
        <DialogTitle className="dialog-title">
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
            className="tabs-register"
          >
            <Tab label="Hồ sơ" {...a11yProps(0)} className="tab"/>
            <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} className="tab"/>
            <Tab label="Danh sách văn bằng" {...a11yProps(2)} className="tab"/>
          </Tabs>
          <TabPanel value={value} index={0} className="tab-items">
            <CurriculumVitae
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
            onClick={() => {
              const idUpdateForm = employeeData?.employeeInfo?.employeeId;
              const dataUpdateForm = {
                resume: formDataResumeUpdate,
                cv: {
                  ...formDataCVUpdate,
                  workExperiences: formDataCVUpdate?.workExperiences?.filter(
                    (data) =>
                      data.startDate !== null &&
                      data.endDate !== null &&
                      data.startDate !== "Invalid date" &&
                      data.endDate !== "Invalid date"
                  ),
                },
              };
              dispatch(updateFormAction(idUpdateForm, dataUpdateForm));
              handleChangeReload({});
            }}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setshouldOpenSendToLeadershipDialog(true);
              handleChangeReload({});
            }}
          >
            Gửi lãnh đạo
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
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
          status={pendingStatus}
        />
      )}
      {loading && <LoadingBay />}
    </>
  );
}
