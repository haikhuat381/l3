import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import ConfirmationDialog from "app/components/confirmDialog/ConfirmationDialog";
import {
  Button,
  Icon,
  IconButton,
  Tooltip,
  Grid,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";

import { formatDateSend, formatDateView, messageOfNoData } from "app/constant";

function EmployeeDiploma(props) {
  const { handleAddDiploma, listDiploma } = props;

  const [diplomaData, setDiplomaData] = useState({});
  const [listDiplomaData, setListDiplomaData] = useState(listDiploma);
  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);

  const handleClose = () => {
    setDiplomaData({});
  };
  const handleChangeEmployee = (rowdata, method) => {
    if (method == "edit") {
      rowdata.issuanceDate = formatDateSend(rowdata.issuanceDate);
      formik.setValues(rowdata);
    } else {
      setDiplomaData(rowdata);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };

  const handleDeleteDiploma = () => {
    setListDiplomaData((listDiplomaData) => {
      const newListDiplomaData = listDiplomaData.filter((diploma) =>
        !diplomaData?.certificateId
          ? diploma.id !== diplomaData.id
          : diploma.certificateId !== diplomaData.certificateId
      );

      handleAddDiploma(newListDiplomaData, "listDiploma");
      return newListDiplomaData;
    });
    setshouldOpenConfirmationDeleteDialog(false);
    setDiplomaData({});
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      field: "",
      educationalOrg: "",
      content: "",
      issuanceDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[\p{L}\s]+$/u, "Không được nhập số và kí tự đặc biệt")
        .max(64, "Nhập tối đa 64 kí tự")
        .required("Tên văn bằng không được để trống"),
      field: Yup.string()
        .max(64, "Nhập tối đa 64 kí tự")
        .required("Lĩnh vực không được để trống"),
      educationalOrg: Yup.string()
        .max(100, "Nhập tối đa 100 kí tự")
        .required("Nơi cấp không được để trống"),
      content: Yup.string()
        .max(150, "Nhập tối đa 150 kí tự")
        .required("Nội dung văn bằng không được để trống"),
      issuanceDate: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày cấp"),
    }),
    onSubmit: (values, { resetForm }) => {
      const isCheckId = values?.id ?? diplomaData?.certificateId;
      if (isCheckId) {
        setListDiplomaData((listDiplomaData) => {
          const newListDiplomaData = listDiplomaData.filter((diploma) =>
            !diplomaData?.certificateId
              ? diploma.id !== values.id
              : diploma.certificateId !== diplomaData.certificateId
          );
          newListDiplomaData.push(values);
          handleAddDiploma(newListDiplomaData, "listDiploma");
          return newListDiplomaData;
        });
      } else {
        values.id = uuidv4();
        handleAddDiploma([...listDiplomaData, values], "listDiploma");
        setListDiplomaData([...listDiplomaData, values]);
      }

      resetForm();
      handleClose();
    },
  });

  const columns = [
    {
      title: "STT",
      width:50,
      headerStyle: {borderTopLeftRadius: "4px"},
      render: (rowData) => rowData.tableData.index + 1
    },
    {
      title: "Hành động",
      width: 130,
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton
                onClick={() => {
                  setDiplomaData(rowData);
                  return handleChangeEmployee(rowData, "edit");
                }}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                onClick={() => handleChangeEmployee(rowData, "delete")}
              >
                <Icon color={"error"}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Tên văn bằng", width: 150, field: "name" },
    { title: "Nơi cấp", field: "educationalOrg" },
    {
      title: "Ngày cấp",
      field: "issuanceDate",
      render: (rowData) => formatDateView(rowData?.issuanceDate),
    },
    {
      title: "Lĩnh Vực",
      field: "field",
      headerStyle: { borderTopRightRadius: "4px" },
    },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmationDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setDiplomaData({});
          }}
          onYesClick={() => {
            handleDeleteDiploma();
            formik.resetForm();
          }}
          title="Xóa Văn bằng"
          content="Bạn có chhắc chắn muốn xóa Văn bằng này?"
        />
      )}

      <form>
        <Grid container spacing={2} className="employee-diploma-container">
          <Grid item sm={4} xs={12}>
            <TextField
              label="Tên văn bằng"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              size="small"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name && formik.touched.name}
              helperText={
                (formik.touched.name && formik.errors.name) ? (
                  <div>{formik.errors.name}</div>
                ) : null
              }
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              label="Ngày cấp"
              variant="outlined"
              name="issuanceDate"
              value={formik.values.issuanceDate || ""}
              onChange={formik.handleChange}
              error={formik.errors.issuanceDate && formik.touched.issuanceDate}
              helperText={
                (formik.touched.issuanceDate && formik.errors.issuanceDate) ? (
                  <div>{formik.errors.issuanceDate}</div>
                ) : null
              }
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              label="Lĩnh vực"
              type="text"
              fullWidth
              variant="outlined"
              name="field"
              size="small"
              value={formik.values?.field || ""}
              onChange={formik.handleChange}
              error={formik.errors.field && formik.touched.field}
              helperText={
                (formik.touched.field && formik.errors.field) ? (
                  <div>{formik.errors.field}</div>
                ) : null
              }
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              label="Nơi cấp"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              name="educationalOrg"
              value={formik.values.educationalOrg}
              onChange={formik.handleChange}
              error={
                formik.errors.educationalOrg && formik.touched.educationalOrg
              }
              helperText={
                (formik.touched.educationalOrg &&
                  formik.errors.educationalOrg) ? (
                  <div>{formik.errors.educationalOrg}</div>
                ) : null
              }
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              label="Nội dung văn bằng"
              type="text"
              fullWidth
              variant="outlined"
              name="content"
              size="small"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.errors.content && formik.touched.content}
              helperText={
                (formik.touched.content && formik.errors.content) ? (
                  <div>{formik.errors.content}</div>
                ) : null
              }
            />
          </Grid>

          <Grid container item sm={4} xs={12} spacing={1}>
            <Grid item xs={6.5}>
              <Button
                className="button-custom"
                variant="contained"
                color="primary"
                type="button"
                onClick={formik.handleSubmit}
              >
                Lưu văn bằng
              </Button>
            </Grid>
            <Grid item xs={5.5}>
              <Button
                className="button-custom"
                variant="contained"
                color="error"
                onClick={formik.resetForm}
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <div className="table-two-columns">
        <MaterialTable
          title={""}
          data={listDiplomaData}
          columns={columns}
          editable={false}
          options={{
            paging: false,
            rowStyle: (rowData, index) => {
              return {
                backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                fontSize: 14,
              };
            },
            maxBodyHeight: "215px",
            minBodyHeight: "215px",
            headerStyle: {
              backgroundColor: "#262e49",
              color: "#fff",
              padding: 14,
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
    </>
  );
}

export default EmployeeDiploma;
