import React, { useEffect, useRef, useState } from "react";
import NewEmployeeDialog from "./NewEmployeeDialog";
import Breadcrumb from "app/components/Breadcrumb";
import { Button, Box, styled } from "@mui/material";
import MaterialTable from "@material-table/core";
import ConfirmationDialog from "app/components/confirmDialog/ConfirmationDialog";
import { ToastContainer } from "react-toastify";
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
import { pageDefault, pageSizeDefault, objStatus, statusOfAddNewEmployee, rejectedStatus, needMoreInfoStatus, messageOfNoData } from "app/constant";
import {
  DetailIcon,
  InfoIcon,
  EditIcon,
  DeleteIcon,
} from "app/components/Icon";
import LoadingBay from "app/components/LoadingBay";
import ProfileFormDialog from "app/components/ProfileFormDialog/ProfileFormDialog";
const Container = styled("div")(() => ({
  height: "100%",
  padding: "30px 30px 0",
  boxSizing: "border-box",
  "& .breadcrumb": {
    marginBottom: "20px",
  },
}));

function AddNewEmployee() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(pageDefault);
  const [pagesize, setPageSize] = useState(pageSizeDefault);
  const isResetEmployeeData = useRef(true)
  const reloadDataEmployee = useRef();
  const loading = useSelector((state) => state?.Employee?.loading);

  const [employeeDelete, setEmployeeDelete] = useState();
  const [employeeUpdate, setEmployeeUpdate] = useState();
  const [shouldOpenProfileFormDialog, setShouldOpenProfileFormDialog] = useState(false);
  const [shouldOpenEmployeeDialog, setShouldOpenEmployeeDialog] = useState(false);
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);
  const [dataReport, setDataReport] = useState();


  const listEmployeeData = useSelector(
    (state) => state?.Employee?.listEmployeeData
  );

  const getListNewEmployee = () => {
    dispatch(getTotalAction(statusOfAddNewEmployee));
    dispatch(getListEmployeeAction(statusOfAddNewEmployee, page, pagesize));
  };

  const handleChangeReload = (value) => {
    reloadDataEmployee.current = value;
  };

  useEffect(() => {
    if (isResetEmployeeData.current) {
      dispatch(resetEmployeeDataAction({}));
      isResetEmployeeData.current = false
    }
    getListNewEmployee();
  }, [page, pagesize, reloadDataEmployee.current]);


  const handleChangeEmployee = (rowdata, method) => {
    if (method === "edit") {
      setEmployeeUpdate(rowdata);
      dispatch(getEmployeeDataAction(rowdata.employeeId));
      setShouldOpenEmployeeDialog(true);
    } else {
      setshouldOpenConfirmationDeleteDialog(false);
      handleChangeReload({});
    }
  };
  const handleClose = () => {
    setShouldOpenEmployeeDialog(false);
    setShouldOpenRequestDialog(false);
    dispatch(resetEmployeeDataAction({}));
    setEmployeeUpdate({});
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
            <InfoIcon
              onClick={() => {
                dispatch(getEmployeeDataAction(rowData?.employeeId));
                setDataReport(rowData);
                setShouldOpenRequestDialog(true);
              }}
              status={rowData?.status}
            />

            <DetailIcon
              onClick={() => {
                dispatch(getFormDataAction(rowData?.employeeId));
                dispatch(getEmployeeDataAction(rowData?.employeeId));
                setTimeout(() => {
                  setShouldOpenProfileFormDialog(true);
                }, 300)
              }}
              status={rowData?.status}
            />

            <EditIcon
              onClick={() => {
                handleChangeEmployee(rowData, "edit")
                if (rowData?.status === rejectedStatus || rowData?.status === needMoreInfoStatus) {
                  setShouldOpenRequestDialog(true);
                }
              }}
              status={rowData?.status}
            />
            <DeleteIcon
              onClick={() => {
                setEmployeeDelete(rowData);
                setshouldOpenConfirmationDeleteDialog(true);
              }}
              status={rowData?.status}
            />
          </>
        );
      },
    },
    { title: "Mã nhân viên", width: 150, field: "code" },
    { title: "Họ và tên", field: "fullName" },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", field: "phone" },
    {
      title: "Trạng thái",
      field: "status",
      headerStyle: { borderTopRightRadius: "4px" },
      render: (rowdata) => objStatus[rowdata?.status],
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
      <div className="box-container">
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
            onClick={() => setShouldOpenEmployeeDialog(true)}
          >
            Thêm mới
          </Button>
        </Box>

        <Box width="100%" overflow="auto" className="box-content" >
          <div className="box-table-first-column">
            <MaterialTable
              columns={columns}
              data={listEmployeeData}
              title={""}
              localization={{
                body: {
                  emptyDataSourceMessage: messageOfNoData,
                },
                toolbar: {
                  searchPlaceholder: 'Tìm kiếm',
                  searchTooltip: 'Tìm kiếm',
                },
              }}
              options={{
                rowStyle: (rowData, index) => {
                  return {
                    backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                  };
                },
                headerStyle: {
                  pointerEvents: "none",
                  backgroundColor: "#222943",
                  color: "#fff",
                  zIndex: 1,
                  position: "sticky",
                  top: 0,
                },
                paging: false,
                padding: "default",
                maxBodyHeight: "816px",
                toolbar: true,
              }}
            />
          </div>
          <PaginationCustom onHandleChange={onHandleChange} className="box-content-pagination" />
        </Box>
      </div>
      {loading && <LoadingBay />}
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmationDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setEmployeeDelete({});
          }}
          onYesClick={() => {
            dispatch(deleteEmployeeAction(employeeDelete?.employeeId));
            handleChangeEmployee(employeeDelete, "delete");
          }}
          title="Xóa Nhân viên"
          content="Bạn có chắc chắn muốn xóa Nhân viên này?"
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setEmployeeUpdate(dataReport);
            dispatch(getEmployeeDataAction(dataReport?.employeeId));
            setShouldOpenEmployeeDialog(true);
          }}
        />
      )}


      {shouldOpenEmployeeDialog && (
        <NewEmployeeDialog
          handleClose={handleClose}
          handleChangeReload={handleChangeReload}
          employeeUpdate={employeeUpdate}
          handleCloseMoreInfoDialog={() => {
            setShouldOpenRequestDialog(false);
          }}
        />
      )}
      {shouldOpenProfileFormDialog && (
        <ProfileFormDialog
          handleClose={() => {
            setShouldOpenProfileFormDialog(false);
            dispatch(resetEmployeeDataAction({}));
          }}
        />
      )}
    </Container>
  );
}

export default AddNewEmployee;
