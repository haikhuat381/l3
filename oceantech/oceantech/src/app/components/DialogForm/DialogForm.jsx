import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent,
    IconButton,
    Icon,
} from "@mui/material";
import { useSelector } from "react-redux";
import SendToLeadershipDialog from "../RecordComponents/SendToLeadershipDialog";
import { processingStatus } from "app/constant";
import TabsLetter from "app/components/TabsLetter/TabsLetter";
import LoadingBay from "app/components/LoadingBay";


function DialogForm(props) {
    const { title, componet, handleClose, idRegister, handleSubmit } = props;
    const [saved, setSaved] = useState("none");
    const [shoulSendLeader, setShoulSendLeader] = useState(false);
    const loading = useSelector(
        (state) => state.ManageEmployee.loading
    );

    const handleCloseAll = () => {
        handleClose();
        setShoulSendLeader(false);
    };

    return (
        <>

            <Dialog open={true} maxWidth={"lg"} fullWidth className="manager-employee-dialog" >
                <DialogTitle className="dialog-title" >
                    Biểu mẫu
                    <IconButton onClick={handleClose}>
                        <Icon color="error">close</Icon>
                    </IconButton>
                </DialogTitle>

                <DialogContent className="dialog-content"  >
                    {loading && <LoadingBay />}
                    <TabsLetter title={title}
                        element={componet}
                    />

                </DialogContent>
                <DialogActions className="dialog-action">
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ display: saved }}
                        onClick={() => setShoulSendLeader(true)}
                    >
                        Trình lãnh đạo
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ display: saved === "none" ? "block" : "none" }}
                        onClick={() => {
                            setSaved("block");
                            handleSubmit();
                        }}
                    >
                        Lưu
                    </Button>
                    <Button
                        className="button-cancel"
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                    >
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
            {shoulSendLeader && (
                <SendToLeadershipDialog
                    handleCloseAll={handleCloseAll}
                    handleClose={() => {
                        setShoulSendLeader(false);
                    }}
                    employeeId={idRegister}
                    status={processingStatus}
                />
            )}
        </>
    );
}
export default DialogForm;
