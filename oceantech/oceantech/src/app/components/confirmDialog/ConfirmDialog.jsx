import * as React from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  IconButton,
  Icon,
} from "@mui/material";

export default function ConfirmDialog({ onConfirmDialogClose, onYesClick, title, content }) {
  console.log("ra");
  return (
    <>
      <Dialog
        className="confirm-dialog"
        open={true}
        onClose={onConfirmDialogClose}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "9px 24px",
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            zIndex: 10000
          }}
        >
          {title}
          <IconButton onClick={() => onConfirmDialogClose()}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          {content}
        </DialogContent>
        <DialogActions style={{justifyContent: 'center', boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}>
          <Button
            onClick={onYesClick}
            variant="contained"
            color="primary"
            type="submit"
          >
            Xác nhận
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirmDialogClose}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
