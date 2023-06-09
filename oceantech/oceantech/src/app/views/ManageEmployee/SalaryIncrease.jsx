import React, { useEffect, useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MaterialTable from "@material-table/core";
import { useSelector, useDispatch } from "react-redux";
import SalaryIncreaseDialog from "./SalaryIncreaseDialog";
import {
  getSalaryIncreaseHistoryAction,
  addSalaryIncreaseAction,
  deleteSalaryIncreaseAction,
  updateSalaryIncreaseAction,
} from "app/redux/actions/actions";
import ConfirmationDialog from "app/components/confirmDialog/ConfirmationDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { formatDateSend, formatDateView, messageOfNoData } from "app/constant";
import { DeleteIcon, EditIcon } from "app/components/Icon";

function SalaryIncrease(props) {
  const { handleClose, idRegister } = props;
  const dispatch = useDispatch();

  const listSalarydata = useSelector(
    (state) => state.ManageEmployee.salaryIncreaseHistory
  );
  const [salaryDialog, setSalaryDialog] = useState({});
  const [deleteSalary, setDeleteSalary] = useState({});
  const [updateSalary, setUpdateSalary] = useState({});
  const [iDSalary, setIdSalary] = useState();

  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);
  const [shouldOpenDeleteDialog, setshouldOpenDeleteDialog] = useState(false);
  const [shouldOpenSalaryIncreaseDialog, setShouldOpenSalaryIncreaseDialog] =
    useState(false);

  useEffect(() => {
    if (idRegister) dispatch(getSalaryIncreaseHistoryAction(idRegister));
  }, [idRegister]);

  const handleRemoveSalary = () => {
    formik.resetForm();
    dispatch(deleteSalaryIncreaseAction(deleteSalary?.salaryId, idRegister));

    setshouldOpenDeleteDialog(false);
  };

  const handleEditSalary = (rowData) => {
    setUpdateSalary(rowData);
    formik.setValues({
      salary: rowData?.salary,
      salaryScale: rowData?.salaryScale,
      date: formatDateSend(rowData?.date),
      reason: rowData?.reason,
      note: rowData?.note,
    });
  };

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
        .max(999999999, "Nhập tối đa 9 chữ số")
        .typeError("Vui lòng nhập số tiền")
        .required("Không được bỏ trống")
        .test('is-number', 'Vui lòng chỉ nhập kí tự số', value => {
          if (value) {
            return /^\d+$/.test(value.toString());
          }
          return true;
        }),
      salaryScale: Yup.number()

        .typeError("Vui lòng nhập bảng lương")
        .required("Không được bỏ trống"),

      date: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày cấp"),

      reason: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      note: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values, { resetForm }) => {
      setSalaryDialog(values);

      if (!updateSalary?.employeeId) {
        dispatch(addSalaryIncreaseAction(idRegister, values));
      } else {
        setIdSalary(updateSalary?.salaryId);
        dispatch(
          updateSalaryIncreaseAction(updateSalary?.salaryId, values, idRegister)
        );

        setUpdateSalary({});
      }
      setShouldOpenSalaryIncreaseDialog(true);
      resetForm();
    },
  });

  const columns = [
    {
      title: "STT",
      render: (rowData) => rowData.tableData.index + 1,
      headerStyle: { borderTopLeftRadius: "4px" },
      width: 50
    },
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <EditIcon
              onClick={() => {
                handleEditSalary(rowData);
              }}
              status={rowData.status}
            />
            <DeleteIcon
              onClick={() => {
                setshouldOpenDeleteDialog(true);
                setDeleteSalary(rowData);
              }}
              status={rowData.status}
            />
          </>
        );
      },
    },
    { title: "Bảng lương", field: "salaryScale" },
    {
      title: "lương",
      field: "salary",
      render: (rowdata) => `${Number(rowdata.salary).toLocaleString()} đ`,
    },
    {
      title: "Ngày",
      field: "date",
      render: (rowdata) => formatDateView(rowdata?.date),
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
          <Grid container item xs={12} spacing={2} className="form-content">
            <Grid item md={5} xs={12}>
              <TextField
                autoComplete="off"
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
                helperText={
                  formik.touched.date && formik.errors.date ? (
                    <div>{formik.errors.date}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Lương"
                name="salary"
                value={formik?.values?.salary}
                onChange={formik.handleChange}
                error={formik?.errors?.salary && formik?.touched?.salary}
                helperText={
                  formik.touched.salary && formik.errors.salary ? (
                    <div>{formik.errors.salary}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Bảng lương"
                name="salaryScale"
                value={formik?.values?.salaryScale}
                onChange={formik.handleChange}
                error={
                  formik?.errors?.salaryScale && formik?.touched?.salaryScale
                }
                helperText={
                  formik.touched.salaryScale && formik.errors.salaryScale ? (
                    <div>{formik.errors.salaryScale}</div>
                  ) : null
                }
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2} className="form-content">
            <Grid item md={5} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Lý do tăng lương"
                name="reason"
                value={formik?.values?.reason}
                onChange={formik.handleChange}
                error={formik?.errors?.reason && formik?.touched?.reason}
                helperText={
                  formik.touched.reason && formik.errors.reason ? (
                    <div>{formik.errors.reason}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Ghi chú"
                name="note"
                value={formik?.values?.note}
                onChange={formik.handleChange}
                error={formik?.errors?.note && formik?.touched?.note}
                helperText={
                  formik.touched.note && formik.errors.note ? (
                    <div>{formik.errors.note}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid container item md={3} xs={12} spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  className="button-custom"
                  color="primary"
                  type="submit"
                >
                  Lưu
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className="button-custom"
                  color="error"
                  onClick={() => {
                    formik.resetForm();
                    setUpdateSalary({});
                  }}
                >
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className="table-two-columns">
              <MaterialTable
                data={listSalarydata}
                columns={columns}
                options={{
                  paging: false,
                  rowStyle: (rowData, index) => {
                    return {
                      backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                    };
                  },
                  maxBodyHeight: "336px",
                  minBodyHeight: "336px",
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
                localization={{
                  body: {
                    emptyDataSourceMessage: messageOfNoData,
                  },
                }}
              />
            </div>
          </Grid>
        </Grid>
      </form>
      {shouldOpenSalaryIncreaseDialog && (
        <SalaryIncreaseDialog
          dataIncreaseDialog={salaryDialog}
          handleClose={() => setShouldOpenSalaryIncreaseDialog(false)}
          handleCloseAll={handleClose}
          iDSalary={iDSalary}
          idRegister={idRegister}
        />
      )}

      {shouldOpenDeleteDialog && (
        <ConfirmationDialog
          onConfirmDialogClose={() => setshouldOpenDeleteDialog(false)}
          onYesClick={() => {
            handleRemoveSalary();
          }}
          title="Xóa tăng lương"
          content="Bạn có chắn chắn muốn xóa tăng lương!"
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
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
