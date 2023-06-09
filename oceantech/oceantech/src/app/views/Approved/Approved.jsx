import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DetailIcon } from "app/components/Icon";
import Breadcrumb from "app/components/Breadcrumb";
import MaterialTable from "@material-table/core";
import { Box } from "@mui/material";
import {
  getTotalAction,
  getListEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction,
  resetEmployeeDataAction,
} from "app/redux/actions/actions";
import PaginationCustom from "app/components/Pagination/PaginationCustom";
import ProfileFormDialog from "app/components/ProfileFormDialog/ProfileFormDialog";
import { pageDefault, pageSizeDefault, objStatus, statusOfApproved, Container, messageOfNoData } from "app/constant";
import LoadingBay from "app/components/LoadingBay";

function Approved() {
  const dispatch = useDispatch();

  const listEmployeeData = useSelector(
    (state) => state?.Employee?.listEmployeeData
  );
  const loading = useSelector(
    (state) => state.Employee.loading
  );
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  const [page, setPage] = useState(pageDefault);
  const [pagesize, setPageSize] = useState(pageSizeDefault);

  useEffect(() => {
    dispatch(getListEmployeeAction(statusOfApproved, page, pagesize));
    dispatch(getTotalAction(statusOfApproved));
  }, [pagesize, page]);

  const handleCloseDialog = () => {
    setShouldOpenDialog(false);
    dispatch(resetEmployeeDataAction({}));
  };

  const onChangePageAndPageSize = (page, pageSize) => {
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
            status={rowdata?.status}
            onClick={() => {
              dispatch(getEmployeeDataAction(rowdata?.employeeId));
              dispatch(getFormDataAction(rowdata?.employeeId));
              setTimeout(() => {
                setShouldOpenDialog(true);
              }, 300)
            }}
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
      render: (rowdata) => objStatus[rowdata?.status],
    },
  ];

  return (
    <Container>
      <div className="box-container">
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Lãnh đạo", path: "/" },
              { name: "Đã duyệt" },
            ]}
          />
        </Box>
        <Box width="100%" overflow="auto" className="box-content" >
          <div className="box-table-first-column">
            <MaterialTable
              title={""}
              columns={columns}
              data={listEmployeeData}
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
              localization={{
                body: {
                  emptyDataSourceMessage: messageOfNoData,
                },
                toolbar: {
                  searchTooltip: 'Tìm kiếm',
                  searchPlaceholder: 'Tìm kiếm',
                },
              }}
            />
          </div>
          <PaginationCustom onHandleChange={onChangePageAndPageSize} className="box-content-pagination" />
        </Box>
      </div>
      {loading && <LoadingBay />}
      {shouldOpenDialog && <ProfileFormDialog handleClose={handleCloseDialog} />}
    </Container>
  );
}

export default Approved;
