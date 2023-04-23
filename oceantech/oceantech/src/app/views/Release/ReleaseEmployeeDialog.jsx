import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Resume from "app/components/ProfileEmployee/Resume";
import CurriculumVitae from "app/components/ProfileEmployee/CurriculumVitae";
import SaveProfileDialog from "./SaveProfileDIalog";
import { updateEmployee } from "app/redux/actions/actions";
import { useState } from "react";
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
import MaterialTable from "@material-table/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

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

export default function ReleaseEmployeeDialog({ handleClose,handleChangeReload }) {
  const dispatch = useDispatch();

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  const columns = [
    { title: "Tên văn bằng", field: "name" },
    {
      title: "Nội dung ",
      field: "content",
    },
    { title: "Nơi cấp", field: "educationalOrg" },
    {
      title: "Ngày cấp",
      field: "issuanceDate",
      render: (rowData) => moment(rowData.issuanceDate).format("YYYY-MM-DD"),
    },
    { title: "Lĩnh Vực", field: "field" },
  ];
  // console.log("employeeDataaaaaaaaaaaaâ", employeeData)
  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth>
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          Hồ sơ nhân viên
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
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
          <TabPanel value={value} index={2} style={{ width: "100%", marginLeft:"30px" }}>
            <MaterialTable
              title={""}
              data={employeeData?.certificates}
              columns={columns}
              options={{
                rowStyle: (rowData, index) => {
                  return {
                    backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                  };
                },
                maxBodyHeight: "1000px",
                minBodyHeight: "370px",
                headerStyle: {
                  backgroundColor: "#262e49",
                  color: "#fff",
                },

                padding: "default",
                toolbar: false,
              }}
            />
          </TabPanel>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center', display: employeeData?.employeeInfo?.status === 10 ? "" : "none" }}>
          <Button variant="contained" onClick={handleClose} sx={{ mb: 2, background: "#FF9E43" }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => {
              setShouldOpenDialog(true);
            }}
          >
            Lưu hồ sơ
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenDialog && (
        <SaveProfileDialog
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
    </>
  );
}
