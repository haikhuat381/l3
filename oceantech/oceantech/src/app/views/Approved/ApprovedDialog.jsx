import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Resume from "app/components/ProfileEmployee/Resume";
import CurriculumVitae from "app/components/ProfileEmployee/CurriculumVitae";
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
        <Box sx={{ padding: "0 24px" }}>
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

export default function ApprovedDialog({ handleClose }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const employeeData = useSelector((state) => state?.Employee?.employeeData);

  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
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
        <DialogContent
          sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", mt: 1, padding: '0 24px' }}
          id="dialog"
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
        </DialogContent>
        <DialogActions style={{justifyContent: 'center', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
          <Button variant="contained" onClick={handleClose} color="error">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
