import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "@material-table/core";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
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
import moment from "moment";


function EmployeeDiploma(props) {
  const { handleAddDiploma, listDiploma } = props;

  // const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
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
    if (method == 1) {
      rowdata.issuanceDate = moment(rowdata.issuanceDate).format("YYYY-MM-DD")
      formik.setValues(rowdata);
    }
    if (method == 0) {
      setDiplomaData(rowdata);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };
  
  const handleDeleteDiploma = () => {
    setListDiplomaData(listDiplomaData => {
      const newListDiplomaData = listDiplomaData.filter(diploma => 
        !diplomaData?.certificateId ? diploma.id !== diplomaData.id : diploma.certificateId !==  diplomaData.certificateId) 
      
      handleAddDiploma(newListDiplomaData, "listDiploma");
      return newListDiplomaData
    })
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
        .min(5, "Hãy nhập đầy đủ tên văn bằng")
        .max(32, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      field: Yup.string()
        .min(5, "Hãy nhập đầy đủ tên van bằng")
        .max(32, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      educationalOrg: Yup.string().required("Không được bỏ trống"),
      content: Yup.string().required("Không được bỏ trống"),
      issuanceDate: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      const isCheck = !diplomaData?.certificateId ? values.id : diplomaData.certificateId
      if (!isCheck) {
        values.id = uuidv4();
        handleAddDiploma([...listDiplomaData, values], "listDiploma");
        setListDiplomaData([...listDiplomaData, values])
      } else {
        setListDiplomaData(listDiplomaData => {
          const newListDiplomaData = listDiplomaData.filter(diploma => 
            !diplomaData?.certificateId ? diploma.id !== values.id : diploma.certificateId !==  diplomaData.certificateId) 
          newListDiplomaData.push(values)
          handleAddDiploma(newListDiplomaData, "listDiploma");
          return newListDiplomaData
        })
      }
      resetForm();
      handleClose();
    },
  });

  const columns = [
    {
      title: "Hành động",
      width: 130,
      headerStyle: { 
        borderTopLeftRadius: "4px"
      },
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton onClick={() => {
                setDiplomaData(rowData)
                return handleChangeEmployee(rowData, 1)
              }}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleChangeEmployee(rowData, 0)}>
                <Icon color={"error"}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Tên văn bằng", width: 150, field: "name" },
    {
      title: "Nội dung ",
      field: "content",
    },
    { title: "Nơi cấp", field: "educationalOrg"},
    { title: "Ngày cấp",
      field: "issuanceDate",
      render: (rowData) => moment(rowData?.issuanceDate).format("DD-MM-YYYY"),
    },
    { title: "Lĩnh Vực", field:"field",
      headerStyle: {borderTopRightRadius: "4px"},
    },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setDiplomaData({});
          }}
          onYesClick={() => {
            handleDeleteDiploma();
          }}
          title= "Xóa bản ghi"
          content= "Bạn có chhắc chắn muốn xóa Văn bằng này?"
        />
      )}

      <form>
        <Grid container spacing={2} sx={{ paddingBottom: "12px" }}>
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
              helperText={formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
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
              helperText={formik.touched.issuanceDate && formik.errors.issuanceDate ? <div>{formik.errors.issuanceDate}</div> : null}
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
              helperText={formik.touched.field && formik.errors.field ? <div>{formik.errors.field}</div> : null}
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
              helperText={formik.touched.educationalOrg && formik.errors.educationalOrg ? <div>{formik.errors.educationalOrg}</div> : null}
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
              error={
                formik.errors.content && formik.touched.content
              }
              helperText={formik.touched.content && formik.errors.content ? <div>{formik.errors.content}</div> : null}
            />
          </Grid>

          <Grid container item sm={4} xs={12} spacing={1}>
            <Grid item xs={6.5}>
              <Button
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
      <div className="table-diploma">
        <MaterialTable
          title={""}
          data={listDiplomaData}
          columns={columns}
          options={{
            paging: false,
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            rowStyle: (rowData, index) => {
              return {
                backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                fontSize: 14
              };
            },
            maxBodyHeight: "215px",
            minBodyHeight: "215px",
            headerStyle: {
              backgroundColor: "#262e49",
              color: "#fff",
              padding: 14,
              position: 'sticky',
              top: 0,
              zIndex: 1,
            },
            padding: "default",
            toolbar: false,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Không có thông tin",
            }
          }}
        />
      </div>
    </>
  );
}

export default EmployeeDiploma;
