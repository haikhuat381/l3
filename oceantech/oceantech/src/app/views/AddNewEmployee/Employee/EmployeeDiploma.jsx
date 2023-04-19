import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "@material-table/core";
import { updateEmployee, getEmployeeData } from "app/redux/actions/actions";

import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import {
  Button,
  Icon,
  IconButton,
  Tooltip,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";

function EmployeeDiploma(props) {
  const { employeeData, handleAddDiploma, listDiploma } = props;

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [diplomaData, setDiplomaData] = useState({});
  const [listDiplomaData, setListDiplomaData] = useState(listDiploma);
  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);

  const handleClose = () => {
    setDiplomaData({});
  };
  // console.log("listDiplomaData", listDiplomaData)
  const handleChangeEmployee = (rowdata, method) => {
    if (method == 1) {
      // console.log(rowdata)
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
      // const newListDiplomaData = listDiplomaData.filter(diploma => diploma.id !== diplomaData.id) 
      const newListDiplomaData = listDiplomaData.filter(diploma => !diplomaData?.certificateId ? diploma.id !== diplomaData.id : diploma.certificateId !==  diplomaData.certificateId) 
      
      handleAddDiploma(newListDiplomaData, "listDiploma");
      return newListDiplomaData
    })
    // employeeData.listDiploma = employeeData.listDiploma.filter(
    //   (diploma) => diploma.id !== diplomaData.id
    // );
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
        .min(5, "Hãy nhập đầy tên van bằng")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      field: Yup.string()
        .min(5, "Hãy nhập đầy tên van bằng")
        .max(30, "Nhập nội dung đúng định dạng")
        .required("Không được bỏ trống"),
      educationalOrg: Yup.string().required("Không được bỏ trống"),
      content: Yup.string().required("Không được bỏ trống"),
      issuanceDate: Yup.date().required("Vui lòng nhập ngày"),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log("haikhuat");
      // console.log(diplomaData);
      // console.log(values);
      // values.issuanceDate = moment(values.issuanceDate).format("YYYY/MM/DD")
      const isCheck = !diplomaData?.certificateId ? values.id : diplomaData.certificateId
      // console.log("isCheck",isCheck)
      // console.log("isCheck",!isCheck)
      if (!isCheck) {
        // console.log("tao");
        values.id = uuidv4();
        handleAddDiploma([...listDiplomaData, values], "listDiploma");
        setListDiplomaData([...listDiplomaData, values])
      } else {
        // console.log("sua");
        // employeeData.listDiploma = employeeData.listDiploma.filter(
        //   (diploma) => diploma.id !== values.id
        // );
        // console.log(employeeData.listDiploma);
        // employeeData.listDiploma.push(values);
        setListDiplomaData(listDiplomaData => {
          // const newListDiplomaData = listDiplomaData.filter(diploma => diploma.id !== values.id)
          const newListDiplomaData = listDiplomaData.filter(diploma => !diplomaData?.certificateId ? diploma.id !== values.id : diploma.certificateId !==  diplomaData.certificateId) 
          newListDiplomaData.push(values)
          handleAddDiploma(newListDiplomaData, "listDiploma");
          return newListDiplomaData
        })
      }
      resetForm();
      handleClose();
    },
  });
  // const otherFeature = useSelector((state) => state.OtherFeature.otherFeature);

  const columns = [
    {
      title: "Hành động",
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
    { title: "Tên văn bằng", field: "name" },
    {
      title: "Nội dung ",
      field: "content",
    },
    { title: "Nơi cấp", field: "educationalOrg" },
    { title: "Ngày cấp", field: "issuanceDate" },
    { title: "Lĩnh Vực", field:"field" },
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
          title="Xóa văn bằng"
        />
      )}

      <form>
        {/* <Grid style={{ padding: "10px 0px 0px 0px" }}> */}
        <Grid container spacing={2} style={{ paddingBottom: "20px" }}>
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
              helperText={formik.errors.name}
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
              value={formik.values.issuanceDate}
              onChange={formik.handleChange}
              error={formik.errors.issuanceDate && formik.touched.issuanceDate}
              helperText={formik.errors.issuanceDate}
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
              helperText={formik.errors.field}
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
              helperText={formik.errors.educationalOrg}
            />
          </Grid>
          <Grid item sm={5} xs={12}>
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
              helperText={formik.errors.content}
            />
          </Grid>

          <Grid container item xs={3} spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                sx={{ background: "#FF9E43" }}
                onClick={formik.resetForm}
              >
                Hủy
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ background: "#7467EF" }}
                type="button"
                onClick={formik.handleSubmit}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
        {/* <DialogActions>
          <Button variant="contained" sx={{ mb: 2, background: "#FF9E43" }} onClick={formik.resetForm}>
            Hủy
          </Button>
          <Button variant="contained" sx={{ mb: 2, background: "#7467EF" }} type="submit" onClick={(e) => { e.preventDefault(); formik.handleSubmit }}>
            Xác nhận
          </Button>
        </DialogActions> */}
      </form>

      {/* <Box className="box" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setShouldOpenDialog(true)}
        >
          Thêm mới
        </Button>
      </Box> */}
      <MaterialTable
        title={""}
        // data={employeeData?.listDiploma}
        data={listDiplomaData}
        columns={columns}
        options={{
          stickyHeader: true,
          rowStyle: (rowData, index) => {
            return {
              backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
            };
          },
          maxBodyHeight: "200px",
          minBodyHeight: "200px",
          headerStyle: {
            backgroundColor: "#262e49",
            color: "#fff",
          },

          // padding: 'dense',
          padding: "default",
          // search: false,
          // exportButton: true,
          toolbar: false,
        }}
      />

      {/* {shouldOpenDialog && (
        <EmployeeDiplomaDialog
          open={open}
          handleClose={handleClose}
          // employee={employeeData}
          // diplomaData={diplomaData}
          // handleAddDiploma={handleAddDiploma}
          employeeData={employeeData}
          diplomaData={diplomaData}
          handleAddDiploma={handleAddDiploma}
        />
      )} */}
    </>
  );
}

export default EmployeeDiploma;
