import React from "react";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { useState, useEffect, useRef } from "react";
import {
  getTotalAction,
  getListEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction,
  resetEmployeeDataAction,
} from "app/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import ReleaseEmployeeDialog from "./ReleaseEmployeeDialog";
import {
  Box,
  styled,
} from "@mui/material";
import SaveProfileInfo from "./SaveProfileInfo";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { objStatus, approvedEndStatus , savedStatus, statusOfRelease } from "app/constant";
import { DetailIcon, InfoIcon } from "app/components/Button";

const Container = styled("div")(({ theme }) => ({
  margin: "30px 30px 0",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "0px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function ReleaseEmployee() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(5);

  const [shouldOpenReleaseDialog, setShouldOpenReleaseDialog] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [idView, setIdview] = useState();

  const listEmployeeDataReducer = useSelector(
    (state) => state?.Employee?.listEmployeeData
  );
  
  const reloadRef = useRef();
  const handleChangeReload = (value) => {
    reloadRef.current = value;
  };

  const handleGetListEmployee = () => {
    dispatch(getTotalAction(statusOfRelease));
    dispatch(getListEmployeeAction(statusOfRelease, page, pagesize));
  };
  useEffect(() => {
    handleGetListEmployee(page, pagesize);
  }, [page, pagesize, reloadRef.current]);

  const onHandleChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const handleClose = () => {
    setShouldOpenReleaseDialog(false);
    dispatch(resetEmployeeDataAction({}))
  };

  const columns = [
    {
      title: "Hành động",
      width: 130,
      headerStyle: {
        borderTopLeftRadius: "4px",
      },
      render: (rowdata) => {
        return (
          <>
            {rowdata.status === savedStatus  && (
                <InfoIcon
                  onClick={() => {
                    dispatch(getFormDataAction(rowdata.employeeId));
                    dispatch(getEmployeeDataAction(rowdata.employeeId));
                    setShouldOpenDialog(true);
                    setIdview(rowdata.employeeId);
                  }}
                />
            )}
            {rowdata.status === approvedEndStatus && (
                <DetailIcon
                  onClick={() => {
                    dispatch(getFormDataAction(rowdata.employeeId));
                    dispatch(getEmployeeDataAction(rowdata.employeeId));
                    setShouldOpenReleaseDialog(true);
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
    { title: "Số điện thoại", field: "phone", width: 170 },
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
            { name: "Lãnh đạo", path: "/" },
            { name: "Kết thúc" },
          ]}
        />
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
            maxBodyHeight: "470px",
            minBodyHeight: "470px",
            headerStyle: {
              backgroundColor: "#222943",
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
      {shouldOpenReleaseDialog && (
        <ReleaseEmployeeDialog
          handleClose={handleClose}
          handleChangeReload={handleChangeReload}
        />
      )}
      {shouldOpenDialog && (
        <SaveProfileInfo
          handleClose={() => {
            setShouldOpenDialog(false);
          }}
          openViewDialog={() => {
            dispatch(getFormDataAction(idView));
            dispatch(getEmployeeDataAction(idView));
            setShouldOpenReleaseDialog(true);
          }}
        />
      )}
    </Container>
  );
}

export default ReleaseEmployee;
