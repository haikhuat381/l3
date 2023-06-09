import React, { useEffect, useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import MaterialTable from "@material-table/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import {
  updatePromoteHistoryAction,
  getPromoteHistoryAction,
  deletePromoteHistoryAction,
  addPromoteHistoryAction,
} from "app/redux/actions/actions";
import ConfirmationDialog from "app/components/confirmDialog/ConfirmationDialog";
import PromoteDialog from "./PromoteDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { formatDateSend, formatDateView, messageOfNoData } from "app/constant";
import { DeleteIcon, EditIcon } from "app/components/Icon";
function Promote(props) {
  const { handleClose, idRegister } = props;
  const dispatch = useDispatch();

  const promoteData = useSelector(
    (state) => state.ManageEmployee.listPromoteHistory
  );

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [employeeDelete, setEmployeeDelete] = useState({});
  const [updatePromote, setUpdatePromote] = useState({});
  const [idPromoteDialog, setIdPromoteDialog] = useState();
  const [shouldOpenDeleteDialog, setshouldOpenDeleteDialog] = useState(false);
  const [promoteDataDialog, setPromoteDataDialog] = useState({});
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);

  useEffect(() => {
    if (idRegister) dispatch(getPromoteHistoryAction(idRegister));
  }, [idRegister]);


  const handleDeletePromote = () => {
    formik.resetForm();
    dispatch(
      deletePromoteHistoryAction(employeeDelete?.promotionId, idRegister)
    );
    setshouldOpenDeleteDialog(false);

  };
  const handleEditPromote = (rowData) => {
    setUpdatePromote(rowData);
    formik.setValues({
      reason: rowData?.reason,
      note: rowData?.note,
      newPosition: rowData?.newPosition,
      date: formatDateSend(rowData?.date),
    });
  };

  const formik = useFormik({
    initialValues: {
      reason: updatePromote?.reason || "",
      note: updatePromote?.note || "",
      date: updatePromote?.date ? formatDateSend(updatePromote?.date) : "",
      newPosition: updatePromote?.newPosition || "",
    },
    validationSchema: Yup.object({
      reason: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      note: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      newPosition: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      date: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày cấp")
    }),
    onSubmit: (values, { resetForm }) => {
      if (!updatePromote?.employeeId) {
        dispatch(addPromoteHistoryAction(idRegister, values));
      } else {
        setIdPromoteDialog(updatePromote?.promotionId);
        dispatch(
          updatePromoteHistoryAction(
            updatePromote?.promotionId,
            values,
            idRegister
          )
        );
        setUpdatePromote({});
      }


      setPromoteDataDialog(values);
      setShouldOpenDialog(true);


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
                handleEditPromote(rowData);
              }}
              status={rowData.status}
            />
            <DeleteIcon
              onClick={() => {
                setshouldOpenDeleteDialog(true);
                setEmployeeDelete(rowData);
              }}
              status={rowData.status}
            />
          </>
        );
      },
    },
    {
      title: "Số lần",
      field: "count",
    },
    { title: "Chức vụ hiện tại", field: "newPosition" },

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
      {shouldOpenDeleteDialog && (
        <ConfirmationDialog
          onConfirmDialogClose={() => {
            setshouldOpenDeleteDialog(false);
          }}
          onYesClick={() => {
            handleDeletePromote();
          }}
          title="Xóa thăng chức"
          content="Bạn có chắn chắn muốn xóa thăng chức!"
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1} >
          <Grid container item xs={12} spacing={2} className="form-content">
            <Grid item md={4} xs={12} >
              <TextField
                autoComplete="off"
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
                helperText={
                  formik.touched.date && formik.errors.date ? (
                    <div>{formik.errors.date}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item md={4} xs={12} >
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Chức vụ mới"
                name="newPosition"
                value={formik.values.newPosition}
                onChange={formik.handleChange}
                error={formik.errors.newPosition && formik.touched.newPosition}
                helperText={
                  formik.touched.newPosition && formik.errors.newPosition ? (
                    <div>{formik.errors.newPosition}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item md={4} xs={12} >
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Ghi chú"
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                error={formik.errors.note && formik.touched.note}
                helperText={
                  formik.touched.note && formik.errors.note ? (
                    <div>{formik.errors.note}</div>
                  ) : null
                }
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2} className="form-content">
            <Grid item md={8} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Lý do"
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={formik.errors.reason && formik.touched.reason}
                helperText={
                  formik.touched.reason && formik.errors.reason ? (
                    <div>{formik.errors.reason}</div>
                  ) : null
                }
              />
            </Grid>

            <Grid container item md={3} xs={12} spacing={1}>
              <Grid item>
                <Button
                  className="button-custom"
                  variant="contained"
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
                    setUpdatePromote({});
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
                title={""}
                data={promoteData}
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

      {shouldOpenDialog && (
        <PromoteDialog
          promoteDataDialog={promoteDataDialog}
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
          status={false}
          idPromoteDialog={idPromoteDialog}
          idRegister={idRegister}
        />
      )}

      {shouldOpenRequestDialog && (
        <MoreInfoDialog
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
