import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Card,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  Icon,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import ReleaseDialog from "./ReleaseDialog";
import UpdateOptions from "./UpdateOptions";
import { useSelector } from "react-redux";
import { otherFeature, formatDateView, imageDefault, pendingEndStatus } from "app/constant";

import LoadingBay from "app/components/LoadingBay";
function ManagerEmployeeDialog(props) {
  const employeeData = useSelector(
    (state) => state.Employee.employeeData?.employeeInfo
  );
  const loadingEmploy = useSelector(
    (state) => state.Employee.loading
  );
  const loadingManage = useSelector(
    (state) => state.ManageEmployee.loading
  );
  const { handleChangeReload, handleClose, handleCloseMoreInfoDialog } = props;
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [saved, setSaved] = useState("block");
  useEffect(() => {
    if (employeeData?.status === pendingEndStatus) {
      setSaved("none");

    }
  }, [employeeData])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseMoreInfoDialog();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleCloseMoreInfoDialog]);
  return (

    <>
      {loadingEmploy || loadingManage && <LoadingBay />}
      <Dialog open={true} onClose={handleClose} maxWidth="xl" fullWidth className="manager-employee-dialog">
        <DialogTitle className="dialog-title">
          Cập nhật diễn biến
          <IconButton onClick={() => {
            handleClose();
            handleCloseMoreInfoDialog();
          }}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>

          <Grid container xs={12} spacing={4} mt={1}>
            <Grid item container xs={12} md={4} spacing={2} height='10px' pt={0} mt={-4}>
              <Grid
                className="conent-mangager"
                item
                xs={12}
                md={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",

                }}
              >
                <div >
                  {
                    <img src={employeeData?.photoUrl ? employeeData.photoUrl : imageDefault} className="avatar-manager-img avatar-manager-img-content " />
                  }
                </div>
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
            <Grid item container xs={12} md={8} spacing={2}>
              <Card>
                <CardHeader title="Thông tin cơ bản " />
                <Divider />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Họ và tên"
                        variant="outlined"
                        size="small"
                        value={employeeData?.fullName || ""}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Mã nhân viên"
                        size="small"
                        variant="outlined"
                        value={employeeData?.code || ""}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        label="Số CMND"
                        size="small"
                        value={employeeData?.citizenId || ""}
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
                        size="small"
                        value={employeeData?.email || ""}
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
                        size="small"
                        value={employeeData?.phone || ""}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Ngày sinh"
                        size="small"
                        variant="outlined"
                        value={formatDateView(employeeData?.dateOfBirth) || ""}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
              </Card>
            </Grid>
            <Grid item container xs={12} mt={2}>
              <UpdateOptions EmployeeId={employeeData?.employeeId} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="dialog-action">
          <Button
            variant="contained"
            color="warning"
            onClick={() => setShouldOpenDialog(true)}
            sx={{ display: saved }}
          >
            Kết thúc
          </Button>
          <Button variant="contained" color="error"
            onClick={() => {
              handleClose();
              handleCloseMoreInfoDialog();
            }}>
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
