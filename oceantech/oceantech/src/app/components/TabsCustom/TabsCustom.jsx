import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import CurriculumVitae from "../ProfileEmployee/CurriculumVitae";
import Resume from "../ProfileEmployee/Resume";
import Diploma from "../ProfileEmployee/Diploma";
import ReleaseLetter from "../ReleaseLetter/ReleaseLetter";
import TabsLetter from "../TabsLetter/TabsLetter";
import { useSelector } from "react-redux";

export function TabPanel(props) {
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
                <Box sx={{ paddingLeft: 3, height: "100%"}}>
                    {children}
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

export function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

function TabsCustom({ isProfileTabs }) {

    const employeeData = useSelector((state) => state?.Employee?.employeeData);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {
                isProfileTabs ? (
                    <>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className="tabs-custom"
                        >
                            <Tab label="Hồ sơ" {...a11yProps(0)} className="tab"/>
                            <Tab label="Sơ yếu lý lịch" {...a11yProps(1)} className="tab"/>
                            <Tab label="Danh sách văn bằng" {...a11yProps(2)} className="tab"/>
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
                                status={true}
                            />

                        </TabPanel>
                        <TabPanel value={value} index={2} className="tab-items">
                            <Diploma
                                listDiploma={employeeData?.certificates}
                            />
                        </TabPanel>
                    </>
                ) : <TabsLetter
                    title={"Đơn xin nghỉ việc"}
                    element={<ReleaseLetter
                        employeeData={employeeData?.employeeInfo}
                        status={true}
                    />}
                />
            }
        </>
    )

}

export default TabsCustom