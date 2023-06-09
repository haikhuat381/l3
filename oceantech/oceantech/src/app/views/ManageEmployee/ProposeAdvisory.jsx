import { TextField, Grid, Button } from "@mui/material";
import MaterialTable from "@material-table/core";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  getProposalConsultationAction,
  addProposalConsult,
  updateProposalConsult,
  deleteProposalConsult,
} from "app/redux/actions/actions";
import ConfirmationDialog from "app/components/confirmDialog/ConfirmationDialog";
import ProposeAdvisoryDialog from "./ProposeAdvisoryDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { formatDateSend, formatDateView, messageOfNoData } from "app/constant";
import { DeleteIcon, EditIcon } from "app/components/Icon";

function ProposeAdvisory(props) {
  const { handleClose, idRegister } = props;
  const dispatch = useDispatch();
  const listPropose = useSelector(
    (state) => state.ManageEmployee.proposalConsulHistory
  );

  const [deleteProposal, setDeleteProposal] = useState({});
  const [updateProposal, setUpdateProposal] = useState({});
  const [idProposal, SetIdProposal] = useState();
  const [shouldOpenDeleteDialog, setshouldOpenDeleteDialog] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [proposeDataDialog, setProposeDataDialog] = useState({});

  useEffect(() => {
    if (idRegister) dispatch(getProposalConsultationAction(idRegister));
  }, [idRegister]);

  const handleRemovePropose = () => {
    formik.resetForm();
    dispatch(
      deleteProposalConsult(deleteProposal?.proposalConsultationId, idRegister)
    );

    setshouldOpenDeleteDialog(false);
  };

  const handleEditPropose = (rowData) => {
    setUpdateProposal(rowData);
    formik.setValues({
      type: rowData?.type,
      content: rowData?.content,
      note: rowData?.note,
      date: formatDateSend(rowData?.date),
    });
  };

  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      content: "",
      note: "",
      date: "",
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      note: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      type: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      date: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày cấp")
    }),
    onSubmit: (values, { resetForm }) => {
      setProposeDataDialog(values);
      if (!updateProposal?.employeeId) {
        dispatch(addProposalConsult(idRegister, values));
      } else {
        SetIdProposal(updateProposal?.proposalConsultationId);

        dispatch(
          updateProposalConsult(
            updateProposal?.proposalConsultationId,
            values,
            idRegister
          )
        );

        setUpdateProposal({});
      }

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
                handleEditPropose(rowData);
              }}
              status={rowData.status}
            />
            <DeleteIcon
              onClick={() => {
                setshouldOpenDeleteDialog(true);
                setDeleteProposal(rowData);
              }}
              status={rowData.status}
            />
          </>
        );
      },
    },

    { title: "Loại", field: "type" },
    { title: "Nội dung", field: "content" },
    {
      title: "Ngày",
      field: "date",
      render: (rowdata) => formatDateView(rowdata?.date),
    },
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
            handleRemovePropose();
          }}
          title="Xóa đề xuất tham mưu"
          content="Bạn có chắn chắn muốn xóa đề xuất tham mưu!"
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid item container xs={12} spacing={2} className="form-content">
            <Grid item md={6} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                label="Ngày đăng kí"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.errors.date && formik.touched.date}
                helperText={
                  formik.touched.date && formik.errors.date ? (
                    <div>{formik.errors.date}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                label="Vấn đề"
                fullWidth
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.errors.type && formik.touched.type}
                helperText={
                  formik.touched.type && formik.errors.type ? (
                    <div>{formik.errors.type}</div>
                  ) : null
                }
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2} className="form-content">
            <Grid item md={6} xs={12}>
              <TextField
                autoComplete="off"
                size="small"
                fullWidth
                label="Nội dung"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.errors.content && formik.touched.content}
                helperText={
                  formik.touched.content && formik.errors.content ? (
                    <div>{formik.errors.content}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item md={3} xs={12}>
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
            <Grid container item md={3} xs={12} spacing={1} >
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
                    setUpdateProposal({});
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
                data={listPropose}
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
      </form >

      {shouldOpenDialog && (
        <ProposeAdvisoryDialog
          proposeDataDialog={proposeDataDialog}
          handleClose={() => setShouldOpenDialog(false)}
          handleCloseAll={handleClose}
          idProposal={idProposal}
          idRegister={idRegister}
        />
      )
      }
      {
        shouldOpenRequestDialog && (
          <MoreInfoDialog
            handleClose={() => {
              setShouldOpenRequestDialog(false);
            }}
            openEditDialog={() => {
              setShouldOpenDialog(true);
            }}
          />
        )
      }
    </>
  );
}

export default ProposeAdvisory;
