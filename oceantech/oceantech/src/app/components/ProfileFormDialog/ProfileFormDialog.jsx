import * as React from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
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
import { pendingEndStatus, approvedEndStatus, savedStatus, approvedStatus, pendingStatus } from "app/constant";
import RefuseDialog from "../RecordComponents/RefuseDialog";
import AcceptDialog from "../RecordComponents/AcceptDialog";
import AdditionalRequestDialog from "../RecordComponents/AdditionalRequestDialog";
import SaveProfileDialog from "../RecordComponents/SaveProfileDialog";
import TabsCustom from "app/components/TabsCustom/TabsCustom";
import LoadingBay from "app/components/LoadingBay";

export default function ProfileFormDialog({ handleClose, handleChangeReload, isType }) {
    const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
    const [shouldOpenRefuseDialog, setShouldOpenRefuseDialog] = useState(false);
    const [shouldOpenAcceptDialog, setShouldOpenAcceptDialog] = useState(false);
    const [shouldOpenSaveProfileDialog, setShouldOpenSaveProfileDialog] = useState(false);

    const employeeData = useSelector((state) => state?.Employee?.employeeData);
    const employeeStatus = useSelector((state) => state?.Employee?.employeeData?.employeeInfo?.status);
    const loading = useSelector((state) => state?.Employee?.loading);
    const statusOfProfileTabs = [pendingStatus, approvedStatus]
    const statusOfButtonSee = [savedStatus, approvedEndStatus, pendingEndStatus]

    const getDisplayPropertyValue = (value) => {
        return value ? "" : "none";
    }

    const [isProfileTabs, setIsProfileTabs] = useState(statusOfProfileTabs.includes(employeeStatus))
    const isDisplayApproval = getDisplayPropertyValue(isType === "approval")
    const isDisplaySaveProfile = getDisplayPropertyValue(employeeStatus === approvedEndStatus && isType === "release")
    const isDisplayButtonSee = getDisplayPropertyValue(statusOfButtonSee.includes(employeeStatus))
    const isCheckSavedStatus = employeeStatus === savedStatus

    let title = ""
    if (isCheckSavedStatus) {
        title = `Thông tin nộp lưu hồ sơ - ${employeeData?.employeeInfo?.storedProfileCode}`
    } else if (isProfileTabs) {
        title = "Thông tin hồ sơ"
    } else {
        title = "Thông tin"
    }


    return (
        <>
            {loading && <LoadingBay />}
            <Dialog
                open={true}
                maxWidth={"lg"}
                fullWidth
                className="form-dialog"
            >
                <DialogTitle className="dialog-title">
                    {title}
                    <IconButton onClick={handleClose}>
                        <Icon color="error">close</Icon>
                    </IconButton>
                </DialogTitle>

                <DialogContent className="dialog-content">
                    <TabsCustom isProfileTabs={isProfileTabs} />
                </DialogContent>

                <DialogActions className="dialog-action">
                    <Button
                        variant="contained"
                        color="info"
                        style={{ display: isDisplayButtonSee }}
                        onClick={() => {
                            setIsProfileTabs(!isProfileTabs)
                        }}
                    >
                        {
                            isProfileTabs ? "Xem biểu mẫu" : "Xem hồ sơ"
                        }
                    </Button>
                    <Button
                        variant="contained"
                        style={{ display: isDisplayApproval }}
                        color="success"
                        onClick={() => {
                            setShouldOpenAcceptDialog(true);
                        }}
                    >
                        Duyệt
                    </Button>
                    <Button
                        variant="contained"
                        style={{ display: isDisplayApproval }}
                        color="primary"
                        onClick={() => {
                            setShouldOpenRequestDialog(true);
                        }}
                    >
                        Yêu cầu bổ sung
                    </Button>
                    <Button
                        variant="contained"
                        style={{ display: isDisplayApproval }}
                        color="warning"
                        onClick={() => {
                            setShouldOpenRefuseDialog(true);
                        }}
                    >
                        Từ Chối
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ display: isDisplaySaveProfile }}
                        onClick={() => {
                            setShouldOpenSaveProfileDialog(true)
                        }}
                    >
                        Nộp lưu
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
            {shouldOpenSaveProfileDialog && (
                <SaveProfileDialog
                    handleClose={() => setShouldOpenSaveProfileDialog(false)}
                    handleCloseAll={handleClose}
                    handleChangeReload={handleChangeReload}
                />
            )}
        </>
    );
}
