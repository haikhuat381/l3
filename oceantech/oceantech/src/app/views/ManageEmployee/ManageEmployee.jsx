import React, { useRef } from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "app/components/Breadcrumb";
import {
  getListEmployeeAction,
  getEmployeeDataAction,
  getTotalAction,
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
  margin: "30px 30px 0",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "0",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function ManagerEmployee() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const reloadRef = useRef();
  const [shouldDialogManage, setShouldDialogManage] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [dataReport, setDataReport] = useState();
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const listEmployee = useSelector((state) => state.Employee.listEmployeeData);
  const objStatus = useSelector((state) => state?.Employee?.objStatus);
  const handleChangeReload = (value) => {
    reloadRef.current = value;
    console.log(" cjao bn ", reloadRef.current);
  };

  useEffect(() => {
    dispatch(getTotalAction("5,8,9"));
    dispatch(getListEmployeeAction("5,8,9", page, pageSize));
  }, [page, pageSize, reloadRef.current]);

  const onHandleChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const handleClose = () => {
    setShouldDialogManage(false);
  };
  const handleCloseMoreInfoDialog = () => {
    setShouldOpenRequestDialog(false);
    setShouldOpenDialog(false);
  };
  const columns = [
    {
      title: "Hành động",
      width: 130,
      headerStyle: {
        borderTopLeftRadius: "4px",
      },
      render: (rowData) => {
        return (
          <>
            {rowData.status === 9 && (
              <Tooltip title="Thông tin">
                <span>
                  <IconButton
                    onClick={() => {
                      dispatch(getEmployeeDataAction(rowData?.employeeId));
                      setDataReport(rowData);
                      setShouldOpenRequestDialog(true);
                    }}
                  >
                    <Icon
                      // color="warning"
                      style={{ color: "#EED370" }}
                    >
                      report
                    </Icon>
                  </IconButton>
                </span>
              </Tooltip>
            )}

            <Tooltip title="Cập nhật diễn biến">
              <IconButton
                onClick={() => {
                  setShouldDialogManage(true);
                  dispatch(getEmployeeDataAction(rowData?.employeeId));
                }}
              >
                <Icon color="success">visibilityIcon</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    // { title: "Mã nhân viên", width: 160, field: "code" },
    { title: "Họ và tên", field: "fullName", width: 220 },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      width: 150,
      render: (rowdata) => moment(rowdata?.dateOfBirth).format("DD/MM/YYYY"),
    },
    { title: "Email", field: "email" },
    { title: "Số điện thoại", width: 150, field: "phone" },
    {
      title: "Trạng thái",
      width: 300,
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
            { name: "Quản lý nhân viên" },
          ]}
        />
      </Box>
      <Box width="100%" overflow="auto">
        <MaterialTable
          title={""}
          columns={columns}
          data={listEmployee || []}
          options={{
            paging: false,
            rowStyle: (rowData, index) => {
              return {
                backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
              };
            },
            maxBodyHeight: "470px",
            minBodyHeight: "470px",
            headerStyle: {
              position: "sticky",
              top: 0,
              zIndex: 1,

              backgroundColor: "#262e49",
              color: "#fff",
            },
            padding: "default",
            toolbar: true,
          }}
        />

        <PaginationCustom onHandleChange={onHandleChange} />
      </Box>
      {shouldDialogManage && (
        <ManagerEmployeeDialog
          handleClose={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setShouldOpenDialog(true);
          }}
        />
      )}
      {shouldOpenDialog && (
        <ReleaseDialog
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleCloseMoreInfoDialog}
          handleChangeReload={handleChangeReload}
        />
      )}
    </Container>
  );
}

export default ManagerEmployee;
