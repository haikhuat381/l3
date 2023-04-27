import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Resume from "app/components/ProfileEmployee/Resume";
import CurriculumVitae from "app/components/ProfileEmployee/CurriculumVitae";
import AdditionalRequestDialog from "./AdditionalRequestDialog";
import RefuseDialog from "./RefuseDialog";
import AcceptDialog from "./AcceptDialog";
import { useState } from "react";
import ResignationLetter from "app/components/ResignationLetter/ResignationLetter";
import "react-toastify/dist/ReactToastify.css";
import {
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  Box,
  IconButton,
  Icon,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PromotionLetter from "app/components/PromotionLetter/PromotionLetter";
import PropostionLetter from "app/components/PropostionLetter/PropostionLetter";
import IncreaseDialogLetter from "app/components/IncreaseLetter/IncreaseDialogLetter"
import moment from "moment";
import Diploma from "app/components/ProfileEmployee/Diploma";

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
        <Box sx={{ padding: "0 24px"  }}>
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


export default function ApprovalDialog({ handleClose, handleChangeReload }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [shouldOpenRefuseDialog, setShouldOpenRefuseDialog] = useState(false);
  const [shouldOpenAcceptDialog, setShouldOpenAcceptDialog] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const employeeData = useSelector((state) => state?.Employee?.employeeData);

  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth >
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 24px",
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            zIndex: 10000
           }}
        >
          Hồ sơ nhân viên
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{padding: '0 24px', mt: 1}}>
          {employeeData.releaseRequest  ? (
            <ResignationLetter />
          ) : employeeData.promoteRequest ? (<PromotionLetter/>) : employeeData.proposeRequest ? (<PropostionLetter/>) 
          : employeeData.increaseRequest ? <IncreaseDialogLetter /> : (
            <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider", padding: 0, overflow: "hidden" }}
              >
                <Tab label="Hồ sơ" {...a11yProps(0)} />
                <Tab label="Sơ yếu lý lịch" {...a11yProps(2)} />
                <Tab label="Danh sách văn bằng" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0} style={{ width: "100%" }}>
                <CurriculumVitae
                  status={true}
                  employee={employeeData?.employeeInfo}
                />
              </TabPanel>
              <TabPanel value={value} index={1} style={{ width: "100%" }}>
                <Resume
                  listRelationship={employeeData?.familyRelations}
                  employee={employeeData?.employeeInfo}
                  display={"none"}
                  status={true}
                />

              </TabPanel>
              <TabPanel value={value} index={2} style={{ width: "100%" }}>
                <Diploma
                  listDiploma={employeeData?.certificates}
                />
              </TabPanel>
            </Box>
          )}
        </DialogContent>

        <DialogActions style={{justifyContent: 'center', gap: '-8px', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setShouldOpenAcceptDialog(true);
            }}
          >
            Duyệt
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShouldOpenRequestDialog(true);
            }}
          >
            Yêu cầu bổ sung
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setShouldOpenRefuseDialog(true);
              
            }}
          >
            Từ Chối
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

      {shouldOpenRequestDialog && (
        <AdditionalRequestDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
      {shouldOpenRefuseDialog && (
        <RefuseDialog
          handleClose={() => {
            setShouldOpenRefuseDialog(false);
          }}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
      {shouldOpenAcceptDialog && (
        <AcceptDialog
          handleClose={() => {
            setShouldOpenAcceptDialog(false);
          }}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
    </>
  );
}