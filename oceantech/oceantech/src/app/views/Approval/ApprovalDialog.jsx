import * as React from "react";
import AdditionalRequestDialog from "./AdditionalRequestDialog";
import RefuseDialog from "./RefuseDialog";
import AcceptDialog from "./AcceptDialog";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  Box,
  IconButton,
  Icon,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ReleaseLetter from "app/components/ReleaseLetter/ReleaseLetter";
import { pendingEndStatus } from "app/constant";
import TabsCustom from "app/components/TabsCustom/TabsCustom";

export default function ApprovalDialog({ handleClose, handleChangeReload }) {
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [shouldOpenRefuseDialog, setShouldOpenRefuseDialog] = useState(false);
  const [shouldOpenAcceptDialog, setShouldOpenAcceptDialog] = useState(false);

  const employeeData = useSelector((state) => state?.Employee?.employeeData);

  return (
    <>
      <Dialog
        open={true}
        maxWidth={"lg"}
        fullWidth
        className="form-dialog"
      >
        <DialogTitle className="dialog-title">
          {employeeData?.employeeInfo?.status === pendingEndStatus
            ? "Thông tin"
            : "Thông tin hồ sơ"}
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ padding: "0 24px", mt: 1 }}>
          {employeeData?.employeeInfo?.status === pendingEndStatus ? (
            <ReleaseLetter
              employeeData={employeeData?.employeeInfo}
              status={true}
            />
          ) : (
            <Box
              sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}
            >
              <TabsCustom employeeData={employeeData} />
            </Box>
          )}
        </DialogContent>

        <DialogActions className="dialog-action">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setShouldOpenAcceptDialog(true);
            }}
          >
            Duyệt
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShouldOpenRequestDialog(true);
            }}
          >
            Yêu cầu bổ sung
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setShouldOpenRefuseDialog(true);
            }}
          >
            Từ Chối
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {shouldOpenRequestDialog && (
        <AdditionalRequestDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
      {shouldOpenRefuseDialog && (
        <RefuseDialog
          handleClose={() => {
            setShouldOpenRefuseDialog(false);
          }}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
      {shouldOpenAcceptDialog && (
        <AcceptDialog
          handleClose={() => {
            setShouldOpenAcceptDialog(false);
          }}
          handleCloseAll={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
    </>
  );
}
