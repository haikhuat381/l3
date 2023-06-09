import React from "react";
import { Grid, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function Applicant() {
    const employeeData = useSelector((state) => state.Employee.employeeData);
    return <>
        <Grid
            className="container-title"
            container
            item
            sm={12}
            xs={12}
            justifyContent="flex-end"
            pb={6}
        >
            <Grid
                item
                sm={4}
                xs={4}
                container
                direction="column"
                textAlign="center"
                spacing={1}
                paddingRight={5}
                mt={-3}
            >

                <Grid item>
                    <Typography variant="body1" className="applicant-content">
                        Người làm đơn
                    </Typography>
                </Grid>
                <Grid item p={0}>
                    <Typography variant="subtitle1" fontStyle={"italic"}>(Ký, ghi rõ họ tên)</Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        {employeeData?.employeeInfo?.fullName.split(" ").pop()}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>{employeeData?.employeeInfo?.fullName}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </>
}

export default Applicant;
