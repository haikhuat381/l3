import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getTotalAction,
  getListEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction,
  resetFormDataAction,
  resetEmployeeDataAction,
} from "app/redux/actions/actions";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import { objStatus, statusOfApproval, Container, pageDefault, pageSizeDefault, messageOfNoData } from "app/constant";
import { DetailIcon } from "app/components/Icon";
import LoadingBay from "app/components/LoadingBay";
import ProfileFormDialog from "app/components/ProfileFormDialog/ProfileFormDialog";


function Approval() {
  const dispatch = useDispatch();
  const loadingChange = useSelector((state) => state?.Employee?.loading);

  const reloadData = useRef();
  const handleChangeReloadData = (value) => {
    reloadData.current = value;
  };

  const [page, setPage] = useState(pageDefault);
  const [pagesize, setPageSize] = useState(pageSizeDefault);

  const [shouldOpenProfileFormDialog, setShouldOpenProfileFormDialog] = useState(false);
  const listEmployeeDataApproval = useSelector(
    (state) => state?.Employee?.listEmployeeData
  );


  const getListEmployeeOfApproval = () => {
    dispatch(getListEmployeeAction(statusOfApproval, page, pagesize));
    dispatch(getTotalAction(statusOfApproval));
  };

  useEffect(() => {
    getListEmployeeOfApproval();
  }, [page, pagesize, reloadData.current]);

  const onHandleChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleCloseProfileFormDialog = () => {
    dispatch(resetEmployeeDataAction({}));
    dispatch(resetFormDataAction({}));
    setShouldOpenProfileFormDialog(false);
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
              { name: "Chờ duyệt" },
            ]}
          />
        </Box>
        <Box width="100%" overflow="auto" className="box-content" >
          <div className="box-table-first-column">
            <MaterialTable
              title={""}
              data={listEmployeeDataApproval}
              columns={columns}
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
                paging: false,
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
                padding: "default",
                toolbar: true,
                maxBodyHeight: "823px",
              }}
            />
          </div>
          <PaginationCustom onHandleChange={onHandleChange} className="box-content-pagination" />
        </Box>
      </div>

      {shouldOpenProfileFormDialog && (
        <ProfileFormDialog
          handleChangeReload={handleChangeReloadData}
          handleClose={handleCloseProfileFormDialog}
          isType={"approval"}
        />
      )}
      {loadingChange && <LoadingBay />}
    </Container>
  );
}

export default Approval;
