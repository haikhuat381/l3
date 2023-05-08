import React, { useEffect, useRef } from "react";
import {
  TextField,
  Grid,
  Button,
  Icon,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MaterialTable from "@material-table/core";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import SalaryIncreaseDialog from "./SalaryIncreaseDialog";
import {
  getSalaryIncreaseHistoryAction,
  addSalaryIncreaseAction,
  deleteSalaryIncreaseAction,
  updateSalaryIncreaseAction,
} from "app/redux/actions/actions";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import moment from "moment";
import { async } from "regenerator-runtime";
function SalaryIncrease(props) {
  const { handleClose, ID } = props;
  const dispatch = useDispatch();

  const listSalarydata = useSelector(
    (state) => state.Employee.salaryIncreaseHistory
  );
  const [salaryDialog, setSalaryDialog] = useState({});
  const [deleteSalary, setDeleteSalary] = useState({});
  const [updateSalary, setUpdateSalary] = useState({});
  const [iDSalary, setIdSalary] = useState({});
  const refSalary = useRef();
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [rowDataInfo, setRowDataInfo] = useState();
  const [shouldOpenDeleteDialog, setshouldOpenDeleteDialog] = useState(false);
  const [shouldOpenSalaryIncreaseDialog, setShouldOpenSalaryIncreaseDialog] =
    useState(false);
  const handleReloadPro = (values) => {
    refSalary.current = values;
  };
  useEffect(() => {
    dispatch(getSalaryIncreaseHistoryAction(ID));
  }, [ID, refSalary.current]);

  const handleAllGet = async () => {
    handleGetSalary();
    handleGetSalary();
    // console.log("a");
  };
  const handleGetSalary = async () => {
    dispatch(getSalaryIncreaseHistoryAction(ID));
    // console.log("b");
  };
  const handleRemoveSalary = async () => {
    dispatch(deleteSalaryIncreaseAction(deleteSalary?.salaryId));
    handleReloadPro(Math.random().toString(36).slice(-5));
    setshouldOpenDeleteDialog(false);
  };

  const handleEditSalary = async (rowData) => {
    setUpdateSalary(rowData);
    formik.setValues({
      salary: rowData?.salary,
      salaryScale: rowData?.salaryScale,
      date: moment(rowData?.date).format("YYYY-MM-DD"),
      reason: rowData?.reason,
      note: rowData?.note,
    });
  };
  // api

  const formik = useFormik({
    initialValues: {
      salary: "",
      salaryScale: "",
      date: "",
      reason: "",
      note: "",
    },
    validationSchema: Yup.object({
      salary: Yup.number()
        .typeError("Vui lòng nhập lương")
        .required("Không được bỏ trống"),
      salaryScale: Yup.number()
        .typeError("Vui lòng nhập số lương")
        .required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
      reason: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSalaryDialog(values);

      // console.log(" them luong ", updateSalary);
      if (!updateSalary?.employeeId) {
        dispatch(addSalaryIncreaseAction(ID, values));
      } else {
        setIdSalary(updateSalary?.salaryId);
        dispatch(updateSalaryIncreaseAction(updateSalary?.salaryId, values));

        setUpdateSalary({});
      }
      handleReloadPro(Math.random().toString(36).slice(-5));
      setShouldOpenSalaryIncreaseDialog(true);
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
                  rowData.status !== "Lưu mới" &&
                  (rowData.additionInfo || rowData.refuseInfo)
                    ? false
                    : true
                }
                onClick={() => {
                  if (rowData.additionInfo) {
                    setRowDataInfo({
                      ...rowData.additionInfo,
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
                  // console.log("ROW DATA:", rowData);
                  setShouldOpenRequestDialog(true);
                }}
              >
                <Icon
                  color={
                    rowData.status !== "Lưu mới" &&
                    (rowData.additionInfo || rowData.refuseInfo)
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
                color="primary"
                onClick={() => {
                  handleEditSalary(rowData);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="error"
                onClick={() => {
                  setshouldOpenDeleteDialog(true);
                  setDeleteSalary(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Lương", field: "salary" },
    { title: "Bảng lương", field: "salaryScale" },
    {
      title: "Ngày",
      field: "date",
      render: (rowdata) => moment(rowdata?.date).format("DD-MM-YYYY"),
    },
    { title: "Lý do", field: "reason" },
    {
      title: "Ghi chú",
      field: "note",
      headerStyle: { borderTopRightRadius: "4px" },
    },
  ];
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={5}>
              <TextField
                size="small"
                label="Ngày tăng lương"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                name="date"
                value={formik?.values?.date}
                onChange={formik.handleChange}
                error={formik?.errors?.date && formik?.touched?.date}
                // helperText={formik?.errors?.date}
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
                label="Bảng lương"
                name="salaryScale"
                value={formik?.values?.salaryScale}
                onChange={formik.handleChange}
                error={
                  formik?.errors?.salaryScale && formik?.touched?.salaryScale
                }
                // helperText={formik?.errors?.salaryScale}
                helperText={
                  formik.touched.salaryScale && formik.errors.salaryScale ? (
                    <div>{formik.errors.salaryScale}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                size="small"
                fullWidth
                label="Lương"
                name="salary"
                value={formik?.values?.salary}
                onChange={formik.handleChange}
                error={formik?.errors?.salary && formik?.touched?.salary}
                // helperText={formik?.errors?.salary}
                helperText={
                  formik.touched.salary && formik.errors.salary ? (
                    <div>{formik.errors.salary}</div>
                  ) : null
                }
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={5}>
              <TextField
                size="small"
                fullWidth
                label="Lý do tăng lương"
                name="reason"
                value={formik?.values?.reason}
                onChange={formik.handleChange}
                error={formik?.errors?.reason && formik?.touched?.reason}
                // helperText={formik?.errors?.reason}
                helperText={
                  formik.touched.reason && formik.errors.reason ? (
                    <div>{formik.errors.reason}</div>
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
                value={formik?.values?.note}
                onChange={formik.handleChange}
                error={formik?.errors?.note && formik?.touched?.note}
                // helperText={formik?.errors?.note}
                helperText={
                  formik.touched.note && formik.errors.note ? (
                    <div>{formik.errors.note}</div>
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
              data={listSalarydata}
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
                // padding: 'dense',
                padding: "default",
                // search: false,
                // exportButton: true,
                toolbar: false,
              }}
            />
          </Grid>
        </Grid>
      </form>
      {shouldOpenSalaryIncreaseDialog && (
        <SalaryIncreaseDialog
          dataIncreaseDialog={salaryDialog}
          handleClose={() => setShouldOpenSalaryIncreaseDialog(false)}
          handleCloseAll={handleClose}
          iDSalary={iDSalary}
          handleReloadPro={handleReloadPro}
        />
      )}

      {shouldOpenDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => setshouldOpenDeleteDialog(false)}
          onYesClick={() => {
            handleRemoveSalary();
          }}
          title="Xóa tăng lương"
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          rowDataInfo={rowDataInfo}
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setShouldOpenSalaryIncreaseDialog(true);
          }}
        />
      )}
    </>
  );
}

export default SalaryIncrease;
