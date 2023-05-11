import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  IconButton,
  Icon,
} from "@mui/material";
import { useSelector } from "react-redux";
import TabsCustom from "app/components/TabsCustom/TabsCustom";


export default function ApprovedDialog({ handleClose }) {

  const employeeData = useSelector((state) => state?.Employee?.employeeData);

  return (
    <>
      <Dialog open={true} maxWidth={"lg"} fullWidth className="form-dialog">
        <DialogTitle className="dialog-title" >
          Thông tin hồ sơ
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content"
          id="dialog"
        >
          <TabsCustom employeeData={employeeData}/>
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button variant="contained" onClick={handleClose} color="error">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
