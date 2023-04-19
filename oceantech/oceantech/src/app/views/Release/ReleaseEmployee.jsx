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
  getListEmployeeAction, getEmployeeDataAction, getFormDataAction
} from "app/redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import ReleaseEmployeeDialog from "./ReleaseEmployeeDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { Button, Box, Icon, IconButton, styled, Table, Tooltip } from "@mui/material";
import SaveProfileInfo from "./SaveProfileInfo";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));



function ReleaseEmployee() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(5)

  const [shouldOpenReleaseDialog, setShouldOpenReleaseDialog] = useState(false);
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
    // console.log("reloadddddddddd")
    const status = "10,13"
    // const status = "10"
    dispatch(getTotalAction(status))
    dispatch(getListEmployeeAction(status, page, pagesize))
  }
  useEffect(() => {
    // dispatch(getListEmployeeAction("1,3,4,6", page, pagesize))
    handleGetListEmployee(page, pagesize)
  }, [page, pagesize, reloadRef.current])

  const onHandleChange = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }
  const handleClose = () => {
    setShouldOpenReleaseDialog(false);
    // dispatch(getEmployeeData({}));
  };

  const columns = [
    // {
    //   title: "Hành động",
    //   render: (rowdata) => {
    //     return (
    //       <>
    //         <Tooltip title="Thông tin ">
    //           <IconButton
    //             onClick={() => {
    //               dispatch(getEmployeeData(rowdata));
    //               setShouldOpenDialog(true);
    //             }}
    //             disabled={rowdata.status !== "Kết thúc" ? false : true}
    //           >
    //             <Icon color={rowdata.status !== "Kết thúc" ? "primary" : "disabled"}>report</Icon>
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Xem chi tiết">
    //           <IconButton
    //             onClick={() => {
    //               setShouldOpenReleaseDialog(true);
    //               dispatch(getEmployeeData(rowdata));
    //             }}
    //           >
    //             <Icon color="success">visibilityIcon</Icon>
    //           </IconButton>
    //         </Tooltip>
    //       </>
    //     );
    //   },
    // },
    {
      title: "Hành động",
      render: (rowdata) => {
        return (
          <>
            <Tooltip title="Thông tin">
              <IconButton
                onClick={() => {
                  // console.log("rowdata",rowdata)
                  dispatch(getEmployeeDataAction(rowdata.employeeId))
                  dispatch(getFormDataAction(rowdata.employeeId))
                  setShouldOpenDialog(true);
                  // dispatch(getEmployeeData(rowdata));
                }}
                disabled={rowdata.status !== 10 ? false : true}
              >
                <Icon color={rowdata.status !== 10 ? "primary" : "disabled"}>report</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem chi tiết">
              <IconButton
                onClick={() => {
                  // console.log("rowdata",rowdata)
                  dispatch(getEmployeeDataAction(rowdata.employeeId))
                  dispatch(getFormDataAction(rowdata.employeeId))
                  setShouldOpenReleaseDialog(true);
                }}
              >
                <Icon color="success">visibilityIcon</Icon>
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
        <Breadcrumb routeSegments={[{ name: "Lãnh đạo", path: "/" }, { name: "Kết thúc" }]} />
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
            // padding: 'dense',
            padding: "default",
            // search: false,
            // exportButton: true,
            toolbar: true,
          }}
        />
        <PaginationCustom
          onHandleChange={onHandleChange}
        />
      </Box>
      {shouldOpenReleaseDialog && <ReleaseEmployeeDialog handleClose={handleClose} />}
      {shouldOpenDialog && (
        <SaveProfileInfo
          handleClose={() => {
            setShouldOpenDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default ReleaseEmployee;
