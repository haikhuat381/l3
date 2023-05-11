import React, { useEffect, useRef, useState } from "react";
import AddNewEmployeeDialog from "./AddNewEmployeeDialog";
import Breadcrumb from "app/components/Breadcrumb";
import { Button, Box, styled } from "@mui/material";
import MaterialTable from "@material-table/core";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import ApprovedDialog from "../Approved/ApprovedDialog";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteEmployeeAction,
  getListEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction,
  getTotalAction,
  resetEmployeeDataAction,
} from "app/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import { objStatus, newStatus, pendingStatus, needMoreInfoStatus, rejectedStatus, statusOfAddNewEmployee, randomValue } from "app/constant";
import { InfoIcon, DetailIcon, EditIcon, DeleteIcon } from "app/components/Button";

const Container = styled("div")(() => ({
  margin: "30px 30px 0",
  "& .breadcrumb": {
    marginBottom: "20px",
  },
}));

function AddNewEmployee() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(5);

  const [employeeDelete, setEmployeeDelete] = useState();
  const [employeeUpdate, setEmployeeUpdate] = useState();
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false);
  const [dataReport, setDataReport] = useState();
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);

  const listEmployeeDataReducer = useSelector(
    (state) => state?.Employee?.listEmployeeData
  );

  const reloadRef = useRef();

  const handleChangeReload = (value) => {
    reloadRef.current = value;
  };

  useEffect(() => {
    // dispatch(resetEmployeeDataAction({}));
    handleGetListEmployee(page, pagesize);
  }, [page, pagesize, reloadRef.current]);

  const handleGetListEmployee = () => {
    dispatch(getTotalAction(statusOfAddNewEmployee));
    dispatch(getListEmployeeAction(statusOfAddNewEmployee, page, pagesize));
  };

  const handleChangeEmployee = (rowdata, method) => {
    if (method === "edit") {
      setEmployeeUpdate(rowdata);
      dispatch(getEmployeeDataAction(rowdata.employeeId));
      setShouldOpenDialog(true);
    } else {
      handleChangeReload(randomValue());
      setshouldOpenConfirmationDeleteDialog(false);
    }
  };
  const handleClose = () => {
    setShouldOpenRequestDialog(false);
    setShouldOpenDialog(false);
    setEmployeeUpdate({});
    dispatch(resetEmployeeDataAction({}));
  };

  const onHandleChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Hành động",
      width: 140,
      headerStyle: {
        borderTopLeftRadius: "4px",
      },
      render: (rowData) => {
        return (
          <>
            {(rowData.status === needMoreInfoStatus || rowData.status === rejectedStatus) && (
              <InfoIcon onClick={() => {
                dispatch(getEmployeeDataAction(rowData.employeeId));
                setDataReport(rowData);
                setShouldOpenRequestDialog(true);
              }} />

            )}
            {(rowData.status === pendingStatus || rowData.status === rejectedStatus) && (

              <DetailIcon
                onClick={() => {
                  dispatch(getFormDataAction(rowData.employeeId));
                  dispatch(getEmployeeDataAction(rowData.employeeId));
                  setShouldOpenViewDialog(true);
                }}
              />
            )}

            {(rowData.status === newStatus || rowData.status === needMoreInfoStatus) && (
              <EditIcon onClick={() => handleChangeEmployee(rowData, "edit")} />
            )}
            {rowData.status === newStatus && (
              <DeleteIcon
                onClick={() => {
                  setEmployeeDelete(rowData);
                  setshouldOpenConfirmationDeleteDialog(true);
                }}
              />
            )}
          </>
        );
      },
    },
    { title: "Mã nhân viên", width: 150, field: "code" },
    { title: "Họ và tên", field: "fullName" },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", field: "phone" },
    { title: "Mã CCCD/CMT", field: "citizenId" },
    {
      title: "Trạng thái",
      field: "status",
      headerStyle: { borderTopRightRadius: "4px" },
      render: (rowdata) => objStatus[rowdata.status],
    },
  ];

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Quản lý", path: "/" },
            { name: "Thêm mới nhân viên" },
          ]}
        />
      </Box>
      <Box className="toolbar-table-addnewemployee">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setShouldOpenDialog(true)}
        >
          Thêm mới
        </Button>
      </Box>

      <Box width="100%" overflow="auto">
        <MaterialTable
          title={""}
          data={listEmployeeDataReducer}
          columns={columns}
          options={{
            paging: false,
            rowStyle: (rowData, index) => {
              return {
                backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
              };
            },
            maxBodyHeight: "460px",
            minBodyHeight: "460px",
            headerStyle: {
              backgroundColor: "#262e49",
              color: "#fff",
              position: "sticky",
              top: 0,
              zIndex: 1,
            },
            padding: "default",
            toolbar: true,
          }}
        />
        <PaginationCustom onHandleChange={onHandleChange} />
      </Box>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setEmployeeDelete({});
          }}
          onYesClick={() => {
            dispatch(deleteEmployeeAction(employeeDelete.employeeId));

            handleChangeEmployee(employeeDelete, "delete");
          }}
          title="Xóa bản ghi"
          content="Bạn có chhắc chắn muốn xóa Nhân viên này?"
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setEmployeeUpdate(dataReport);
            dispatch(getEmployeeDataAction(dataReport.employeeId));
            setShouldOpenDialog(true);
          }}
        />
      )}

      {shouldOpenDialog && (
        <AddNewEmployeeDialog
          handleClose={handleClose}
          handleChangeReload={handleChangeReload}
          employeeUpdate={employeeUpdate}
        />
      )}
      {shouldOpenViewDialog && (
        <ApprovedDialog
          handleClose={() => {
            setShouldOpenViewDialog(false);
            dispatch(resetEmployeeDataAction({}));
          }}
        />
      )}
    </Container>
  );
}

export default AddNewEmployee;
