import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "app/components/Breadcrumb";
import {
  getListEmployeeAction,
  getEmployeeDataAction,
  getTotalAction,
} from "app/redux/actions/actions";
import MaterialTable from "@material-table/core";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import { Box } from "@mui/material";
import ManagerEmployeeDialog from "./ManagerEmployeeDialog";
import ReleaseDialog from "./ReleaseDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  objStatus,
  statusOfManageEmployee,
} from "app/constant";
import { DetailIcon, InfoIcon } from "app/components/Icon";
import LoadingBay from "app/components/LoadingBay";



function ManagerEmployee() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const reloadRef = useRef();
  const [shouldDialogManage, setShouldDialogManage] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const listEmployee = useSelector((state) => state.Employee.listEmployeeData);
  const loading = useSelector(
    (state) => state.Employee.loading
  );

  const handleChangeReload = (value) => {
    reloadRef.current = value;
  };

  useEffect(() => {
    dispatch(getTotalAction(statusOfManageEmployee));
    dispatch(getListEmployeeAction(statusOfManageEmployee, page, pageSize));
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
                setShouldOpenRequestDialog(true);
              }}
              status={rowData?.status}
            />

            <DetailIcon
              title="Cập nhật diễn biến"
              onClick={() => {
                setShouldDialogManage(true);
                dispatch(getEmployeeDataAction(rowData?.employeeId));

              }}
              status={rowData.status}
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
              { name: "Quản lý nhân viên" },
            ]}
          />
        </Box>


        <Box width="100%" overflow="auto" className="box-content" >
          <div className="box-table-first-column">
            <MaterialTable
              columns={columns}
              data={listEmployee || []}
              title={""}
              localization={{
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
      {shouldDialogManage && (
        <ManagerEmployeeDialog
          handleClose={handleClose}
          handleChangeReload={handleChangeReload}
          handleCloseMoreInfoDialog={() => {
            setShouldOpenRequestDialog(false);
          }}
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setShouldDialogManage(true);
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
