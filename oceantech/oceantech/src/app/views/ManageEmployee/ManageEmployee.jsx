import React, { useRef } from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "app/components/Breadcrumb";
import {
  getListEmployeeAction,
  getEmployeeDataAction,
} from "app/redux/actions/actions";
import MaterialTable from "@material-table/core";
import moment from "moment";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import {
  Button,
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  Tooltip,
} from "@mui/material";
import ManagerEmployeeDialog from "./ManagerEmployeeDialog";
import ReleaseDialog from "./ReleaseDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function ManagerEmployee() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const reloadRef = useRef();
  const [shouldDialogManage, setShouldDialogManage] = useState(false);
  const listEmployee = useSelector((state) => state.Employee.listEmployeeData);
  const objStatus = useSelector((state) => state?.Employee?.objStatus);
  const handleChangeReload = (value) => {
    console.log(" reof", value);
    reloadRef.current = value;
  };

  useEffect(() => {
    dispatch(getListEmployeeAction("5", page, pageSize));
  }, [page, pageSize, reloadRef.current]);

  const onHandleChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const handleClose = () => {
    setShouldDialogManage(false);
  };
  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Thông tin">
              <IconButton>
                <Icon>report</Icon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Cập nhật diễn biến">
              <IconButton
                onClick={() => {
                  setShouldDialogManage(true);
                  dispatch(getEmployeeDataAction(rowData?.employeeId));
                }}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Họ tên", field: "fullName" },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      render: (rowdata) => moment(rowdata).format("DD/MM/YYYY"),
    },
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
            { name: "Quản lý nhân viên" },
          ]}
        />
      </Box>
      <MaterialTable
        columns={columns}
        data={listEmployee}
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
      <PaginationCustom onHandleChange={onHandleChange} />
      {shouldDialogManage && (
        <ManagerEmployeeDialog
          handleClose={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
    </Container>
  );
}

export default ManagerEmployee;
