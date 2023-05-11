import * as React from "react";
import SaveProfileDialog from "./SaveProfileDIalog";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  IconButton,
  Icon,
} from "@mui/material";
import { useSelector,  } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { approvedEndStatus } from "app/constant";
import TabsCustom from "app/components/TabsCustom/TabsCustom";

export default function ReleaseEmployeeDialog({ handleClose,handleChangeReload }) {

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  const employeeData = useSelector((state) => state?.Employee?.employeeData);
  
  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth className="form-dialog">
        <DialogTitle className="dialog-title"
        >
          Thông tin hồ sơ
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <TabsCustom employeeData={employeeData}/>
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: employeeData?.employeeInfo?.status === approvedEndStatus ? "" : "none"
            }}
            onClick={() => {
              setShouldOpenDialog(true);
            }}
          >
            Lưu hồ sơ
          </Button>
          <Button variant="contained" onClick={handleClose} color="error">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenDialog && (
        <SaveProfileDialog
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
    </>
  );
}
