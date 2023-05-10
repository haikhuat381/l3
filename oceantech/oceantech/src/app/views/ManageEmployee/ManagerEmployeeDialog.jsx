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
import { otherFeature, Gender } from "app/constant";
import { formatDateView } from "app/constant/formatDate";

function ManagerEmployeeDialog(props) {
  const employeeData = useSelector(
    (state) => state.Employee.employeeData?.employeeInfo
  );
  const { handleChangeReload, handleClose } = props;
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  return (
    <>
      <Dialog open={true} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle className="dialog-title">
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
                        value={formatDateView(employeeData?.dateOfBirth)}
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
        <DialogActions className="dialog-action">
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
