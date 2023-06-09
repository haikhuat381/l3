import { toast } from "react-toastify"
import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
export default function DayFormm(props) {
    const { handlechangeValuse, data } = props;
    const [today, setday] = useState({})

    useEffect(() => {
        const parts = data?.date?.split("-");
        if (parts) {
            setday({
                year: parts[0] || "",
                month: parts[1] || "",
                day: parts[2] || ""
            })
        }

    }, [data])

    const yearCurrent = new Date().getFullYear();
    const handletoday = (event, method) => {
        const data = { ...today }
        data[method] = event.target.value;
        setday(data);

        const formattedDate = `${data.year}-${data.month}-${data.day}`;
        event.target.value = formattedDate;
        handlechangeValuse(event, "date")
    }

    return (
        <>
            <Grid
                className="container-title"
                container
                item
                sm={12}
                xs={12}
                justifyContent="flex-end"
                mt={2}

            >
                <Grid
                    item
                    xs={"auto"}
                    container
                    className="self-items"
                >
                    <Grid item xs={"auto"}>
                        <Typography variant="body1">
                            Hà Nội, ngày
                        </Typography>
                    </Grid>
                    <Grid item xs={"auto"}  >
                        <TextField

                            sx={{ width: '20px', mr: 1, ml: 1 }}
                            className="rs-noReadonly"
                            InputProps={{
                                readOnly: false,
                                style: { padding: 0, },
                                inputMode: "numeric",
                                pattern: "(0[1-9]|1[0-9]|2[0-9]|30)",
                                maxLength: 2,
                            }}
                            id="standard-adornment-mount"
                            fullWidth
                            size="small"

                            onKeyDown={(event) => {
                                if (event.target.value.length >= 2 && event.key !== "Backspace" && event.key !== "Delete") {
                                    event.preventDefault();
                                }
                            }}
                            value={today?.day}

                            onChange={(event) => {
                                let value = event.target.value;

                                if (value.length > 2) {
                                    value = value.slice(-2);
                                }

                                if (/^\d*$/.test(value)) {
                                    if (parseInt(value) > 30) {
                                        value = "30";
                                    }
                                    event.target.value = value;
                                    handletoday(event, "day");
                                }
                            }}
                        ></TextField>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={"auto"}
                    container

                    className="self-items"
                >
                    <Grid item xs={"auto"}>
                        <Typography variant="body1">
                            tháng
                        </Typography>
                    </Grid>
                    <Grid item xs={"auto"}  >
                        <TextField

                            sx={{ width: '20px', mr: 1, ml: 1 }}
                            className="rs-noReadonly"
                            InputProps={{
                                readOnly: false,
                                style: { padding: 0, marginRight: "8px" },
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                maxLength: 2,

                            }}
                            id="standard-adornment-mount"
                            fullWidth
                            size="small"

                            value={today?.month}

                            onChange={(event) => {
                                let value = event.target.value;
                                if (value.length > 2) {
                                    value = value.slice(-2);
                                }
                                if (/^\d*$/.test(value)) {
                                    if (parseInt(value) > 12) {
                                        value = "12";
                                    }
                                    value = value.padStart("0", 2);
                                    event.target.value = value;
                                    handletoday(event, "month");
                                }
                            }}
                        ></TextField>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={"auto"}
                    container
                    spacing={1}
                    className="self-items"
                >
                    <Grid item xs={"auto"}>
                        <Typography variant="body1">
                            năm
                        </Typography>
                    </Grid>
                    <Grid item xs={"auto"}  >
                        <TextField
                            sx={{ width: '40px' }}
                            className="rs-noReadonly"
                            InputProps={{
                                readOnly: false,
                                style: { padding: 0 },
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                maxLength: 4,

                            }}
                            id="standard-adornment-mount"
                            fullWidth
                            size="small"

                            value={today?.year}

                            onKeyDown={(event) => {
                                if (event.target.value.length >= 4 && event.key !== "Backspace" && event.key !== "Delete") {
                                    event.preventDefault();
                                }
                            }}
                            onChange={(event) => {
                                let value = event.target.value;
                                if (/^\d*$/.test(value)) {
                                    if (parseInt(value) > yearCurrent) {
                                        toast.warning("Năm không hợp lệ, vui lòng nhập lại");
                                        return;
                                    }

                                    event.target.value = value;
                                    handletoday(event, "year");
                                }
                            }}
                        ></TextField>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}