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
import { Box } from "@mui/material";
import ProfileFormDialog from "app/components/ProfileFormDialog/ProfileFormDialog";
import { DetailIcon } from "app/components/Icon";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageDefault, pageSizeDefault, objStatus, statusOfRelease, Container, messageOfNoData } from "app/constant";
import LoadingBay from "app/components/LoadingBay";

function ReleaseEmployee() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(pageDefault);
  const [pagesize, setPageSize] = useState(pageSizeDefault);

  const [shouldOpenProfileFormDialog, setShouldOpenProfileFormDialog] = useState(false);

  const reloadDataReleaseEmployee = useRef();

  const listReleaseEmployeeData = useSelector(
    (state) => state?.Employee?.listEmployeeData
  );

  const loading = useSelector(
    (state) => state.Employee.loading
  );
  const handleChangeReload = (value) => {
    reloadDataReleaseEmployee.current = value;
  };

  useEffect(() => {
    dispatch(getTotalAction(statusOfRelease));
    dispatch(getListEmployeeAction(statusOfRelease, page, pagesize));
  }, [reloadDataReleaseEmployee.current, page, pagesize]);

  const handleCloseProfileFormDialog = () => {
    dispatch(resetEmployeeDataAction({}));
    setShouldOpenProfileFormDialog(false);
  };

  const onHandleChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
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
          <DetailIcon
            onClick={() => {
              dispatch(getFormDataAction(rowdata?.employeeId));
              dispatch(getEmployeeDataAction(rowdata?.employeeId));
              setTimeout(() => {
                setShouldOpenProfileFormDialog(true);
              }, 300)
            }}
            status={rowdata?.status}
          />
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
      <div className="box-container">
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Lãnh đạo", path: "/" },
              { name: "Kết thúc" },
            ]}
          />
        </Box>
        <Box width="100%" overflow="auto" className="box-content" >
          <div className="box-table-first-column">
            <MaterialTable
              title={""}
              columns={columns}
              data={listReleaseEmployeeData}
              localization={{
                toolbar: {
                  searchTooltip: 'Tìm kiếm',
                  searchPlaceholder: 'Tìm kiếm',
                },
                body: {
                  emptyDataSourceMessage: messageOfNoData,
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
                maxBodyHeight: "823px",
                toolbar: true,
              }}
            />
          </div>
          <PaginationCustom onHandleChange={onHandleChange} className="box-content-pagination" />
        </Box>
      </div>
      {loading && <LoadingBay />}
      {shouldOpenProfileFormDialog && (
        <ProfileFormDialog
          handleClose={handleCloseProfileFormDialog}
          handleChangeReload={handleChangeReload}
          isType={"release"}
        />
      )}
    </Container>
  );
}

export default ReleaseEmployee;
