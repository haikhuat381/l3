import React from "react";
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
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import {
  getProposalConsultationAction,
  addProposalConsult,
  updateProposalConsult,
  deleteProposalConsult,
} from "app/redux/actions/actions";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import ProposeAdvisoryDialog from "./ProposeAdvisoryDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import moment from "moment";
import { async } from "regenerator-runtime";
function ProposeAdvisory(props) {
  const { handleClose, ID } = props;
  const dispatch = useDispatch();
  const listPropose = useSelector(
    (state) => state.Employee.proposalConsulHistory
  );
  const reloadProposal = useRef();
  const [deleteProposal, setDeleteProposal] = useState({});
  const [updateProposal, setUpdateProposal] = useState({});
  const [idProposal, SetIdProposal] = useState();
  const [shouldOpenDeleteDialog, setshouldOpenDeleteDialog] = useState(false);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [proposeDataDialog, setProposeDataDialog] = useState({});
  const handleReloadPro = (values) => {
    reloadProposal.current = values;
  };
  useEffect(() => {
    dispatch(getProposalConsultationAction(ID));
  }, [ID, reloadProposal.current]);

  const handleEditPropose = (rowData) => {
    setUpdateProposal(rowData);
    formik.setValues({
      type: rowData?.type,
      content: rowData?.content,
      note: rowData?.note,
      date: moment(rowData?.date).format("YYYY-MM-DD"),
    });
  };

  const handleRemovePropose = () => {
    dispatch(deleteProposalConsult(deleteProposal?.proposalConsultationId));
    handleReloadPro(Math.random().toString(36).slice(-5));
    setshouldOpenDeleteDialog(false);
  };
  // api

  const employee = useSelector((state) => state.Employee.employeeData);

  const [rowDataInfo, setRowDataInfo] = useState();
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      content: "",
      note: "",
      date: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
      type: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      setProposeDataDialog(values);
      if (!updateProposal?.employeeId) {
        dispatch(addProposalConsult(ID, values));
      } else {
        SetIdProposal(updateProposal?.proposalConsultationId);

        dispatch(
          updateProposalConsult(updateProposal?.proposalConsultationId, values)
        );

        setUpdateProposal({});
      }
      handleReloadPro(Math.random().toString(36).slice(-5));
      setShouldOpenDialog(true);
      resetForm();
    },
  });

  const handleSave = () => {
    toast.success("Lưu thành công");
  };
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
                  }

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
                  handleEditPropose(rowData);
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
                  // handleRemovePropose(rowData);
                  setshouldOpenDeleteDialog(true);
                  setDeleteProposal(rowData);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },

    { title: "Loại", field: "type" },
    { title: "Nội dung", field: "content" },
    {
      title: "Ngày",
      field: "date",
      render: (rowdata) => moment(rowdata?.date).format("DD/MM/YYYY"),
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
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenDeleteDialog(false);
          }}
          onYesClick={() => {
            handleRemovePropose();
          }}
          title="Xóa đề xuất tham mưu"
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
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
                // helperText={formik.errors.date}
                helperText={
                  formik.touched.date && formik.errors.date ? (
                    <div>{formik.errors.date}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Loại"
                fullWidth
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.errors.type && formik.touched.type}
                // helperText={formik.errors.type}
                helperText={
                  formik.touched.type && formik.errors.type ? (
                    <div>{formik.errors.type}</div>
                  ) : null
                }
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                size="small"
                fullWidth
                label="Nội dung"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.errors.content && formik.touched.content}
                // helperText={formik.errors.content}
                helperText={
                  formik.touched.content && formik.errors.content ? (
                    <div>{formik.errors.content}</div>
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={3}>
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
              data={listPropose}
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

      {shouldOpenDialog && (
        <ProposeAdvisoryDialog
          proposeDataDialog={proposeDataDialog}
          handleClose={() => setShouldOpenDialog(false)}
          handleReloadPro={handleReloadPro}
          handleCloseAll={handleClose}
          idProposal={idProposal}
        />
      )}
      {shouldOpenRequestDialog && (
        <MoreInfoDialog
          rowDataInfo={rowDataInfo}
          handleClose={() => {
            setShouldOpenRequestDialog(false);
          }}
          openEditDialog={() => {
            setShouldOpenDialog(true);
          }}
        />
      )}
    </>
  );
}

export default ProposeAdvisory;
