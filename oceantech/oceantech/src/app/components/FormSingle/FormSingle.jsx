import React from "react"
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SingleInfo from "./SingleInfo";
function FormSingle(props) {
    const { title } = props;

    const employeeData = useSelector((state) => state.Employee.employeeData);
    return (
        <>
            <Grid className="content" container item sm={12} xs={12}>
                <Grid container item sm={12} xs={12}>
                    <Grid textTransform="uppercase" sm={12} xs={12} fullWidth>
                        <Typography variant="h5" className="banner">
                            Cộng hòa xã hội chủ nghĩa Việt Nam
                        </Typography>
                    </Grid>
                    <Grid variant="h6" sm={12} xs={12} fullWidth>
                        <Typography variant="h6">
                            Độc lập - Tự do - Hạnh phúc
                        </Typography>
                    </Grid>
                    <Grid sm={12} xs={12} fullWidth>
                        <Typography variant="h6">
                            -------------------------------------
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography variant="h5" className="banner">
                    QUYẾT ĐỊNH
                </Typography>
            </Grid>
            <Grid
                container
                item
                sm={12}
                xs={12}
                justifyContent="center"
                pt={2}
                pb={2}
            >
                <Typography variant="h6">
                    {title}
                </Typography>
            </Grid>
            <Grid container item sm={12} xs={12}>
                <Grid item sm={8} xs={8} className="container-form">
                    <Typography>
                        - Căn cứ tại quy chế, điều lệ của Công ty OceanTech
                    </Typography>
                </Grid>
                <Grid item sm={12} xs={12} className="container-form">
                    <Typography>
                        - Căn cứ vào hợp đồng lao động với người lao động
                    </Typography>
                </Grid>
                <Grid item sm={12} xs={12} className="container-form">
                    <Typography>
                        - Xét những đóng góp của người lao động và đề nghị của trưởng
                        phòng nhân sự
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item sm={12} xs={12} justifyContent="center">
                <Typography variant="h5" className="banner ">
                    GIÁM ĐỐC CÔNG TY QUYẾT ĐỊNH
                </Typography>
            </Grid>
            <SingleInfo employeeData={employeeData} />
        </>
    )
}

export default FormSingle;