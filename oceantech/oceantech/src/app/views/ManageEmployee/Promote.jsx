import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Grid,
  Button,
  Icon,
  Tooltip,
  IconButton,
} from "@mui/material";
import MaterialTable from "@material-table/core";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import {
  updatePromoteHistoryAction,
  getPromoteHistoryAction,
  deletePromoteHistoryAction,
  addPromoteHistoryAction,
} from "app/redux/actions/actions";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import PromoteDialog from "./PromoteDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";

import moment from "moment";
import { async } from "regenerator-runtime";
function Promote(props) {
  const { handleClose, ID } = props;
  const dispatch = useDispatch();
  const reloadPro = useRef();
  const promoteData = useSelector((state) => state.Employee.listPromoteHistory);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [employeeDelete, setEmployeeDelete] = useState({});
  const [updatePromote, setUpdatePromote] = useState({});
  const [idPromoteDialog, setIdPromoteDialog] = useState();
  const [shouldOpenDeleteDialog, setshouldOpenDeleteDialog] = useState(false);
  const [promoteDataDialog, setPromoteDataDialog] = useState({});
  const [rowDataInfo, setRowDataInfo] = useState();
  const [rowData, setRowData] = useState();
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const handleReloadPro = (values) => {
    reloadPro.current = values;
  };

  useEffect(() => {
    dispatch(getPromoteHistoryAction(ID));
  }, [ID, reloadPro.current]);

  const handleDeletePromote = () => {
    dispatch(deletePromoteHistoryAction(employeeDelete?.promotionId));

    handleReloadPro(Math.random().toString(36).slice(-5));
    setshouldOpenDeleteDialog(false);
  };
  const handleEditPromote = (rowData) => {
    setUpdatePromote(rowData);
    formik.setValues({
      reason: rowData?.reason,
      note: rowData?.note,
      newPosition: rowData?.newPosition,
      date: moment(rowData?.date).format("YYYY-MM-DD"),
    });
  };

  // fake-api
  // showSuccessMessage

  const formik = useFormik({
    initialValues: {
      reason: updatePromote?.reason || "",
      note: updatePromote?.note || "",
      date: updatePromote?.date
        ? moment(updatePromote?.date).format("YYYY-MM-DD")
        : "",
      newPosition: updatePromote?.newPosition || "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
      newPosition: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!updatePromote?.employeeId) {
        dispatch(addPromoteHistoryAction(ID, values));
      } else {
        setIdPromoteDialog(updatePromote?.promotionId);
        dispatch(
          updatePromoteHistoryAction(updatePromote?.promotionId, values)
        );
        setUpdatePromote({});
      }
      handleReloadPro(Math.random().toString(36).slice(-5));
      setShouldOpenDialog(true);
      setPromoteDataDialog(values);
      resetForm();
    },
  });

  const columns = [
    {
      title: "Hành động",
      headerStyle: { borderTopLeftRadius: "4px" },
      render: (rowData) => {
        return (
          <>
            {/* <Tooltip title="Thông tin">
              <IconButton
                disabled={
                  (rowData.additionalRequest || rowData.refuseInfo) &&
                  rowData.status !== "Lưu mới"
                    ? false
                    : true
                }
                onClick={() => {
                  if (rowData.additionalRequest) {
                    setRowDataInfo({
                      ...rowData.additionalRequest,
                      status: "Yêu cầu bổ sung",
                    });
                  }
                  if (rowData.refuseInfo) {
                    setRowDataInfo({
                      ...rowData.refuseInfo,
                      status: "Từ chối",
                    });
                    // console.log("hai");
                    // console.log({ ...rowData.refuseInfo, status: "Từ chối" });
                  }
                  setRowData(rowData);
                  setShouldOpenRequestDialog(true);
                }}
              >
                <Icon
                  color={
                    (rowData.additionalRequest || rowData.refuseInfo) &&
                    rowData.status !== "Lưu mới"
                      ? "primary"
                      : "disabled"
                  }
                >
                  report
                </Icon>
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Sửa">
              <IconButton
                disabled={rowData.status === "Đã duyệt" ? true : false}
                color="primary"
                onClick={() => {
                  handleEditPromote(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                disabled={rowData.status === "Đã duyệt" ? true : false}
                color="error"
                onClick={() => {
                  setshouldOpenDeleteDialog(true);
                  setEmployeeDelete(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },

    { title: "Chực vụ hiện tại", field: "newPosition" },
    { title: "Lý do", field: "reason" },

    {
      title: "Ngày",
      field: "date",
      render: (rowdata) => moment(rowdata?.date).format("DD-MM-YYYY"),
    },
    { title: "Ghi chú", field: "note" },
    {
      title: "Số lần",
      field: "count",
      headerStyle: { borderTopRightRadius: "4px" },
    },
  ];
  return (
    <>
      {shouldOpenDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenDeleteDialog(false);
          }}
          onYesClick={() => {
            handleDeletePromote();
          }}
          title="Xóa thăng chức"
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={4}>
              <TextField
                style={{ height: 5 }}
                size="small"
                label="Ngày tăng chức"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                name="date"
                value={formik?.values?.date}
                onChange={formik.handleChange}
                error={formik.errors.date && formik.touched.date}
                // helperText={formik.errors.date}
                helperText={
                  formik.touched.date && formik.errors.date ? (
                    <div>{formik.errors.date}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                fullWidth
                label="Chức vụ mới"
                name="newPosition"
                value={formik.values.newPosition}
                onChange={formik.handleChange}
                error={formik.errors.newPosition && formik.touched.newPosition}
                // helperText={formik.errors.newPosition}
                helperText={
                  formik.touched.newPosition && formik.errors.newPosition ? (
                    <div>{formik.errors.newPosition}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                fullWidth
                label="Ghi chú"
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                error={formik.errors.note && formik.touched.note}
                // helperText={formik.errors.note}
                helperText={
                  formik.touched.note && formik.errors.note ? (
                    <div>{formik.errors.note}</div>
                  ) : null
                }
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={8}>
              <TextField
                size="small"
                fullWidth
                label="Lý do"
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={formik.errors.reason && formik.touched.reason}
                // helperText={formik.errors.reason}
                helperText={
                  formik.touched.reason && formik.errors.reason ? (
                    <div>{formik.errors.reason}</div>
                  ) : null
                }
              />
            </Grid>

            <Grid container item xs={3} spacing={1}>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Lưu
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => formik.resetForm()}
                >
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              title={""}
              // data={listPromote}
              data={promoteData}
              columns={columns}
              options={{
                paging: false,
                pageSize: 5,
                pageSizeOptions: [5, 10, 15, 20],
                rowStyle: (rowData, index) => {
                  return {
                    backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                  };
                },
                maxBodyHeight: "215px",
                minBodyHeight: "215px",
                headerStyle: {
                  backgroundColor: "#262e49",
                  color: "#fff",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                },

                padding: "default",

                toolbar: false,
              }}
            />
          </Grid>
        </Grid>
      </form>

      {shouldOpenDialog && (
        <PromoteDialog
          promoteDataDialog={promoteDataDialog}
          handleReloadPro={handleReloadPro}
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
          status={false}
          idPromoteDialog={idPromoteDialog}
        />
      )}

      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          rowDataInfo={rowDataInfo}
          rowData={rowData}
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          handleEditPromote={handleEditPromote}
          openEditDialog={() => {
            setShouldOpenRequestDialog(false);
            handleEditPromote(rowData);
          }}
        />
      )}
    </>
  );
}

export default Promote;
