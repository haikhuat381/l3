import React from "react";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { useState, useEffect, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import ApprovedDialog from "./ApprovedDialog";
import { Button, Box, Icon, IconButton, styled, Table, Tooltip } from "@mui/material";
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

function Approved() {
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
    const status = "5,6,10,11,18"
    // const status = "5,6,10,11,18"
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
      render: (rowdata) => {
        return (
          <>
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={() => {
                  // console.log("rowdata",rowdata)
                  dispatch(getEmployeeDataAction(rowdata.employeeId))
                  dispatch(getFormDataAction(rowdata.employeeId))
                  setShouldOpenDialog(true);
                  // dispatch(getEmployeeData(rowdata));
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
    { title: "Họ tên", field: "fullName" },
    // {
    //   title: "Ngày sinh",
    //   field: "dateOfBirth",
    //   render: (rowdata) => moment(rowdata.dateOfBirth).format("DD/MM/YYYY"),
    // },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", field: "phone" },
    {
      title: "Trạng thái",
      field: "status",
      render: (rowdata) => objStatus[rowdata.status],
    },
  ];


  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Lãnh đạo", path: "/" }, { name: "Đã duyệt" }]} />
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
      {shouldOpenDialog && <ApprovedDialog handleClose={handleClose} />}
    </Container>
  );
}

export default Approved;
