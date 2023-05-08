import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Card,
  styled,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Icon,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import moment from "moment";
import CustomAvatar from "app/components/Avatar/Avatar";
import ReleaseDialog from "./ReleaseDialog";
import UpdateOptions from "./UpdateOptions";
import { useSelector, useDispatch } from "react-redux";

function ManagerEmployeeDialog(props) {
  const employeeData = useSelector(
    (state) => state.Employee.employeeData?.employeeInfo
  );
  const { handleChangeReload, handleClose } = props;
  const otherFeature = useSelector((state) => state.Employee.otherFeature);
  const Gender = useSelector((state) => state.Employee.Gender);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  console.log("chao bn ", employeeData?.photoUrl);
  // console.log("dm asdasd", employeeData);
  return (
    <>
      <Dialog open={true} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            padding: "9px 24px",
            fontSize: 24,
          }}
        >
          Cập nhật diễn biến
          <IconButton onClick={() => handleClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container xs={12} spacing={4} sx={{ mt: 1 }}>
            <Grid item container xs={4} spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CustomAvatar
                  image={employeeData?.photoUrl}
                  displayButton={"none"}
                  isNoneBorder={true}
                />
                <Typography
                  mt={2}
                  variant="h5"
                  textAlign={"center"}
                  textTransform={"uppercase"}
                >
                  {employeeData?.fullName}
                </Typography>
                <Typography variant="subtitle1" textAlign={"center"}>
                  {otherFeature[employeeData?.teamId]?.name || ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={8} spacing={2}>
              <Card>
                <CardHeader title="Thông tin cơ bản " />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Họ và tên"
                        variant="outlined"
                        value={employeeData?.fullName}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Mã nhân viên"
                        variant="outlined"
                        value={employeeData?.code}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Số CMND"
                        value={employeeData?.citizenId}
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Email"
                        variant="outlined"
                        value={employeeData?.email}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Số điện thoại"
                        variant="outlined"
                        value={employeeData?.phone}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Ngày sinh"
                        variant="outlined"
                        value={moment(employeeData?.dateOfBirth).format(
                          "DD/MM/YYYY"
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                ></Box>
              </Card>
            </Grid>
            <Grid item container xs={12}>
              <UpdateOptions EmployeeId={employeeData?.employeeId} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            justifyContent: "center",
            zIndex: 9,
          }}
        >
          <Button
            variant="contained"
            color="warning"
            onClick={() => setShouldOpenDialog(true)}
          >
            Kết thúc
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenDialog && (
        <ReleaseDialog
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
    </>
  );
}

export default ManagerEmployeeDialog;
