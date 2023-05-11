import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Grid,
  Button,
} from "@mui/material";
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import RegisterDocumentDialog from "./RegisterDocumentDialog";
import MoreInfoDialog from "app/components/MoreInfoDialog/MoreInfoDialog";
import { DeleteIcon, EditIcon } from "app/components/Button";

function RegisterDocument(props) {
  const { handleClose } = props;
  const dispatch = useDispatch();

  const employee = useSelector((state) => state.Employee.employeeData);
  const [employeeData, setEmployee] = useState(employee);
  const [registerData, setRegisterData] = useState({});

  const [registerDataDialog, setRegisterDataDialog] = useState({});
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);

  const [rowDataInfo, setRowDataInfo] = useState();
  const [shouldOpenRequestDialog, setShouldOpenRequestDialog] = useState(false);

  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);

  useEffect(() => {
    setEmployee(employee);
  }, [employee]);

  const formik = useFormik({
    initialValues: {
      document: "",
      content: "",
      note: "",
      date: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Không được bỏ trống"),
      note: Yup.string().required("Không được bỏ trống"),
      document: Yup.string().required("Không được bỏ trống"),
      date: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      setRegisterDataDialog(values);
      setShouldOpenDialog(true);

      if (!values.id) {
        values.id = uuidv4();
        setEmployee({
          ...employeeData,
          listRegister: [
            ...employeeData.listRegister,
            { ...values, status: "Lưu mới" },
          ],
        });
        const dataUpdate = {
          ...employeeData,
          listRegister: [
            ...employeeData.listRegister,
            { ...values, status: "Lưu mới" },
          ],
        };
      } else {
        employeeData.listRegister = employeeData.listRegister.filter(
          (register) => register.id !== values.id
        );
        employeeData.listRegister.push({ ...values, status: "Lưu mới" });
        // dispatch(updateEmployee(employeeData));
        toast.success("Sửa thành công");
      }

      resetForm();
    },
  });

  const handleEditPropose = (rowData) => {
    formik.setValues(rowData);
  };

  const handleRemovePropose = (rowData) => {
    employeeData.listRegister = employeeData.listRegister.filter(
      (register) => register.id !== registerData.id
    );
    setEmployee(employeeData);

    setshouldOpenConfirmationDeleteDialog(false);
    toast.success("Xóa thành công");
  };

  const columns = [
    {
      title: "Hành động",
      headerStyle: { borderTopLeftRadius: "4px" },
      render: (rowData) => {
        return (
          <>
              <EditIcon
                onClick={() => {
                  handleEditPropose(rowData);
                }}
              />
              <DeleteIcon
                onClick={() => {
                  setshouldOpenConfirmationDeleteDialog(true);
                  setRegisterData(rowData);
                }}
              />
          </>
        );
      },
    },

    { title: "Hồ sơ", field: "document" },
    { title: "Nội dung", field: "content" },
    { title: "Ngày", field: "date" },
    { title: "Ghi chú", field: "note" },
    {
      title: "Trạng thái",
      field: "status",
      headerStyle: { borderTopRightRadius: "4px" },
    },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
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
                helperText={formik.errors.date}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="hồ sơ"
                fullWidth
                name="document"
                value={formik.values.document}
                onChange={formik.handleChange}
                error={formik.errors.document && formik.touched.document}
                helperText={formik.errors.document}
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
                helperText={formik.errors.content}
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
                helperText={formik.errors.note}
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
              // data={listPropose}
              data={employeeData?.listRegister}
              columns={columns}
              options={{
                paging: false,
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
        <RegisterDocumentDialog
          registerDataDialog={registerDataDialog}
          handleClose={() => setShouldOpenDialog(false)}
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

export default RegisterDocument;
