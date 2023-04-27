import React, { useState } from "react";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { Button, Box, Icon, IconButton, styled, Table, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import ReleaseDialog from "../ManageEmployee/ReleaseDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteEmployee,
  getEmployeeData,
  getListEmployeeRequest,
  getListLocation,
  getOtherFeature,
  getTotalAction,
  getListEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction
} from "app/redux/actions/actions";
import ApprovalDialog from "./ApprovalDialog";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import moment from "moment";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));



function Approval() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(5)
  
  
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const listEmployeeDataReducer = useSelector(state => state?.Employee?.listEmployeeData)
  const objStatus = useSelector(state => state?.Employee?.objStatus)
  const employeeData = useSelector(state => state?.Employee?.employeeData)
  // console.log("employeeData bbbbbb", employeeData)
  const reloadRef = useRef()
  const handleChangeReload = (value) => {
    reloadRef.current = value
  }
  
  const handleGetListEmployee = () => {
    const status = "3,8"
    // const status = "1,3,4,6"
    dispatch(getTotalAction(status))
    dispatch(getListEmployeeAction(status, page, pagesize))
  }
  useEffect(() => {
    handleGetListEmployee(page, pagesize)
  }, [page, pagesize, reloadRef.current])
  const onHandleChange = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }
  
  const handleClose = () => {
    setShouldOpenDialog(false);
  };
  const columns = [
    {
      title: "Hành động",
      width: 150,
      // cellStyle: { textAlign: 'center' },
      headerStyle: { 
        borderTopLeftRadius: "4px"
      },
      render: (rowdata) => {
        return (
          <>
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={() => {
                  dispatch(getFormDataAction(rowdata.employeeId))
                  dispatch(getEmployeeDataAction(rowdata.employeeId))
                  setShouldOpenDialog(true);
                }}
              >
                <Icon color="success">visibilityIcon</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Mã nhân viên", field: "code" },
    { title: "Họ tên", field: "fullName",
    },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", field: "phone" },
    {
      title: "Trạng thái",
      field: "status",
      headerStyle: {borderTopRightRadius: "4px"},
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
        <Breadcrumb routeSegments={[{ name: "Lãnh đạo", path: "/" }, { name: "Chờ duyệt" }]} />
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
            headerStyle: {
              backgroundColor: "#222943",
              color: "#fff",
            },

            padding: "default",

            toolbar: true,
          }}
        />
        <PaginationCustom
          onHandleChange={onHandleChange}
        />
      </Box>
      {shouldOpenDialog && <ApprovalDialog 
                              handleClose={handleClose} 
                              handleChangeReload={handleChangeReload}
                            />
      }
    </Container>
  );
}

export default Approval;
