import React from "react"
import { TextField, Grid, Typography } from "@mui/material";
import { formatDateView } from "app/constant";
function SingleInfo(props) {
    const { employeeData } = props;

    return (
        <>
            <Grid
                container
                item
                sm={12}
                xs={12}
                className="container-form"
                mt={2}
                spacing={1}
            >
                <Grid item container xs={6} spacing={1} className="self-items">
                    <Grid item xs="auto">
                        <Typography>Ông (Bà): </Typography>
                    </Grid>
                    <Grid item xs={true}>
                        <TextField
                            className="rs-noReadonly "
                            value={employeeData?.employeeInfo?.fullName}
                            InputProps={{
                                readOnly: true,
                            }}
                            id="standard-adornment-mount"
                            fullWidth
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={6} spacing={1} className="self-items">
                    <Grid item xs="auto">
                        <Typography>Sinh ngày: </Typography>
                    </Grid>
                    <Grid item xs={true}>
                        <TextField
                            className="rs-noReadonly "
                            value={formatDateView(
                                employeeData?.employeeInfo?.dateOfBirth
                            )}
                            InputProps={{
                                readOnly: true,
                            }}
                            id="standard-adornment-mount"
                            fullWidth
                        ></TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                item
                sm={12}
                xs={12}
                spacing={1}
                className="container-form"
            >
                <Grid item container xs={6} spacing={1}>
                    <Grid item xs="auto">
                        <Typography>Số CMND/CCCD: </Typography>
                    </Grid>
                    <Grid item xs={true}>
                        <TextField
                            className="rs-noReadonly "
                            value={employeeData?.employeeInfo?.citizenId}
                            InputProps={{
                                readOnly: true,
                            }}
                            id="standard-adornment-mount"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={6} spacing={1}>
                    <Grid item xs="auto">
                        <Typography>Địa chỉ: </Typography>
                    </Grid>
                    <Grid item xs={true}>
                        <TextField
                            className="rs-noReadonly"
                            value={employeeData?.employeeInfo?.address}
                            InputProps={{
                                readOnly: true,
                            }}
                            id="standard-adornment-mount"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default SingleInfo;
