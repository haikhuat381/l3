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
import ReleaseLetter from "app/components/ReleaseLetter/ReleaseLetter";
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
      <Dialog open={true} maxWidth={"lg"} fullWidth 
        sx={{
          '& .MuiDialog-paper': {
            minHeight: '680px',
          },
        }}
      >
        <DialogTitle className="dialog-title">
        {employeeData?.employeeInfo?.status === 8 ? "Thông tin" : "Thông tin hồ sơ"}
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{padding: '0 24px', mt: 1}}>
          {employeeData?.employeeInfo?.status === 8  ? (
            <ReleaseLetter 
              employeeData={employeeData?.employeeInfo}
              status={true}
            />
          )  : (
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
              <TabPanel value={value} index={0} className="tab-items">
                <CurriculumVitae
                  status={true}
                  employee={employeeData?.employeeInfo}
                />
              </TabPanel>
              <TabPanel value={value} index={1} className="tab-items">
                <Resume
                  listRelationship={employeeData?.familyRelations}
                  employee={employeeData?.employeeInfo}
                  display={"none"}
                  status={true}
                />

              </TabPanel>
              <TabPanel value={value} index={2} className="tab-items">
                <Diploma
                  listDiploma={employeeData?.certificates}
                />
              </TabPanel>
            </Box>
          )}
        </DialogContent>

        <DialogActions className="dialog-action">
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
            onClick={handleClose}
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