import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
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
import CurriculumVitae from "../ProfileEmployee/CurriculumVitae";
import Resume from "../ProfileEmployee/Resume";
import Diploma from "../ProfileEmployee/Diploma";

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

function TabsCustom({ employeeData }) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider", padding: 0, overflow: "hidden" }}
            >
                <Tab label="Hồ sơ" {...a11yProps(0)} />
                <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} />
                <Tab label="Danh sách văn bằng" {...a11yProps(2)} />
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
        </>
    )

}

export default TabsCustom