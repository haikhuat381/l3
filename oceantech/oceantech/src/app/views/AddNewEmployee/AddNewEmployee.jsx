import React, { useEffect, useRef, useState } from "react";
import AddNewEmployeeDialog from "./AddNewEmployeeDialog";
import Breadcrumb from "app/components/Breadcrumb";
import { Button, Box, Icon, IconButton, styled, Tooltip } from "@mui/material";
import MaterialTable from "@material-table/core";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import ApprovedDialog from "../Approved/ApprovedDialog";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteEmployee,
  getEmployeeData,
  getListEmployeeRequest,
  getListLocation,
  getOtherFeature,

  getListEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction,
  getTotalAction
} from "app/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { getdata } from "./EmployeeServices";
import { async, awrap } from "regenerator-runtime";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import { resetEmployeeDataAction } from "app/redux/actions/actions";


const Container = styled("div")(() => ({
  margin: "30px",
  "& .breadcrumb": {
    marginBottom: "30px",
  },
}));



function AddNewEmployee() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(5)

  const listEmployeeDataReducer = useSelector(state => state?.Employee?.listEmployeeData)
  const objStatus = useSelector(state => state?.Employee?.objStatus)
  const employeeData = useSelector(state => state?.Employee?.employeeData)
  // console.log("employeeData bbbbbb", employeeData)
  const reloadRef = useRef()
  const handleChangeReload = (value) => {
    reloadRef.current = value
  }

  useEffect(() => {
    handleGetListEmployee(page, pagesize)
  }, [page, pagesize, reloadRef.current])

  const handleGetListEmployee = () => {
    // const status = "1"
    const status = "1,3,4,6"
    dispatch(getTotalAction(status))
    dispatch(getListEmployeeAction(status, page, pagesize))
  }
  // console.log("listEmployeeDataReducer",listEmployeeDataReducer)
  // const [listEmployeeData, setListEmployeeData] = useState([]);

  const [employeeDelete, setEmployeeDelete] = useState();
  const [employeeUpdate, setEmployeeUpdate] = useState();
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false);
  const [dataReport, setDataReport] = useState()
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);

  const handleChangeEmployee = (rowdata, method) => {
    if (method === 1) {
      console.log("rowdataaaaaa", rowdata)
      setEmployeeUpdate(rowdata)
      dispatch(getEmployeeDataAction(rowdata.employeeId))
      setShouldOpenDialog(true);
    }
    if (method === 0) {
      handleChangeReload(rowdata.employeeId)
      setshouldOpenConfirmationDeleteDialog(false);
      toast.success("Xóa nhân viên thành công");
    }
  };
  const handleClose = () => {
    setShouldOpenRequestDialog(false);
    setShouldOpenDialog(false);
    setEmployeeUpdate({})
    dispatch(resetEmployeeDataAction({}))
  };

  const onHandleChange = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const columns = [
    {
      title: "Hành động",
      width: 120,
      // marginLeft: "-10px",
      cellStyle: { textAlign: 'center' },
      render: (rowData) => {
        return (
          <>
            {
              (rowData.status === 4 || rowData.status === 6) && 
                <Tooltip title="Thông tin">
                  <span>
                    <IconButton
                      // disabled={
                      //   rowData.additionalRequest || rowData.refuseInfo ? false : true
                      // }
                      onClick={() => {
                        dispatch(getEmployeeDataAction(rowData.employeeId))
                        // dispatch(getFormDataAction(rowData.employeeId))
                        setDataReport(rowData)
                        setShouldOpenRequestDialog(true);
                      }}
                    >
                      <Icon
                        // color="warning"
                        style={{color: "#EED370"}}
                      >
                        report
                      </Icon>
                    </IconButton>
                  </span>
                </Tooltip>
            }
            {
              rowData.status === 3 && 
                <Tooltip title="Xem chi tiết">
              <span>
                <IconButton
                  // disabled={rowData.status !== 1 ? false : true}
                  onClick={() => {
                    // setIDEmployeeData(rowData.employeeId)
                    dispatch(getEmployeeDataAction(rowData.employeeId))
                    dispatch(getFormDataAction(rowData.employeeId))
                    setShouldOpenViewDialog(true);
                    // dispatch(getEmployeeData(rowData));
                  }}
                >
                  <Icon
                    color="success"
                  // color={rowData.status !== 1 ? "success" : "disabled"}
                  >
                    visibilityIcon
                  </Icon>
                </IconButton>
              </span>
                </Tooltip>
            }
            
            {
              (rowData.status === 1 || rowData.status === 4 || rowData.status === 6) &&
              <Tooltip title="Sửa">
                <span>
                  <IconButton
                    // disabled={rowData.status === 1 || rowData.status === 4 ? false : true}
                    onClick={() => handleChangeEmployee(rowData, 1)}
                  >
                    <Icon
                      color="primary"
                    // color={rowData.status === 1 || rowData.status === 4 ? "primary" : "disabled"}

                    >edit
                    </Icon>
                  </IconButton>
                </span>
              </Tooltip>
            }
            {
              rowData.status === 1 &&
              <Tooltip title="Xóa">
                <span>
                  <IconButton
                    // disabled={rowData.status === 1 ? false : true}
                    onClick={() => {
                      setEmployeeDelete(rowData);
                      setshouldOpenConfirmationDeleteDialog(true);
                    }}
                  >
                    <Icon
                      color="error"
                    // color={rowData.status === 1 ? "error" : "disabled"}
                    >
                      delete
                    </Icon>
                  </IconButton>
                </span>
              </Tooltip>
            }
            {/* <Tooltip title="Sửa" style={{display: rowData.status === 1 || rowData.status === 4 ? "" : "none"}}>
              <span>
                <IconButton
                  // disabled={rowData.status === 1 || rowData.status === 4 ? false : true}
                  onClick={() => handleChangeEmployee(rowData, 1)}
                >
                  <Icon
                    color="primary"
                    // color={rowData.status === 1 || rowData.status === 4 ? "primary" : "disabled"}

                  >edit
                  </Icon>
                </IconButton>
              </span>
            </Tooltip> */}
            {/* <Tooltip title="Xóa" style={{display: rowData.status === 1 ? "" : "none"}}>
              <span>
                <IconButton
                  // disabled={rowData.status === 1 ? false : true}
                  onClick={() => {
                    setEmployeeDelete(rowData);
                    setshouldOpenConfirmationDeleteDialog(true);
                  }}
                >
                  <Icon
                    color="error"
                    // color={rowData.status === 1 ? "error" : "disabled"}
                  >
                    delete
                  </Icon>
                </IconButton>
              </span>
            </Tooltip> */}
          </>
        );
      },
    },
    { title: "Mã nhân viên", field: "code" },
    { title: "Họ tên", field: "fullName", width: 250 },
    // {
    //   title: "Ngày sinh",
    //   field: "dateOfBirth",
    //   render: (rowdata) => moment(rowdata.dateOfBirth).format("DD/MM/YYYY"),
    // },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", field: "phone" },
    { title: "Mã CCCD/CMT", field: "citizenId" },
    {
      title: "Trạng thái",
      field: "status",
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
      <Box>
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
            maxBodyHeight: "1000px",
            minBodyHeight: "370px",
            headerStyle: {
              backgroundColor: "#262e49",
              color: "#fff",
            },
            padding: "default",
            toolbar: false,
          }}
        />
        <PaginationCustom
          onHandleChange={onHandleChange}
        />
      </Box>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setEmployeeDelete({});
          }}
          onYesClick={() => {
            dispatch(deleteEmployee(employeeDelete.employeeId))

            handleChangeEmployee(employeeDelete, 0);
          }}
          title= "Xóa bản ghi"
          content= "Bạn có chhắc chắn muốn xóa Nhân viên này?"
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setEmployeeUpdate(dataReport)
            dispatch(getEmployeeDataAction(dataReport.employeeId))
            setShouldOpenDialog(true);
          }}
        />
      )}

      {shouldOpenDialog && <AddNewEmployeeDialog
        handleClose={handleClose}
        handleChangeReload={handleChangeReload}
        employeeUpdate={employeeUpdate}
      />}
      {shouldOpenViewDialog && (
        <ApprovedDialog
          handleClose={() => {
            setShouldOpenViewDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default AddNewEmployee;
