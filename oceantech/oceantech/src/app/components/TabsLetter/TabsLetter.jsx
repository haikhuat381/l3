import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, a11yProps } from "../TabsCustom/TabsCustom";

function TabsLetter({ element, title }) {
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
                className=""
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider", padding: 0, overflow: "hidden", position: 'sticky', top: 0, minWidth: 186 }}
            >
                <Tab label={title} {...a11yProps(0)} className="text-left" />
            </Tabs>
            <TabPanel value={value} index={0} className="tab-items">
                {element}
            </TabPanel>

        </>
    )


}

export default TabsLetter
