import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee } from "app/redux/actions/actions";
import MaterialTable from "@material-table/core";
import {
  Button,
  Box,
  Icon,
  IconButton,
  styled,
  Tooltip,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  DialogActions,
} from "@mui/material";

import * as Yup from "yup";
import ConfirmDialog from "app/components/confirmDialog/ConfirmDialog";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { useFormik } from "formik";
function EmployeeRelation(props) {
  const dispatch = useDispatch();
  const { employeeData, employee, handleAddRelation,listRelationship,  relationshipData } = props;
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [relationship, setRelationship] = useState({});
  const [listRelationshipData, setListRelationshipData] = useState(listRelationship);
  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);

  const Gender = useSelector((state) => state?.Employee?.Gender);
  
  
  const handleClose = () => {
    // setShouldOpenDialog(false);
    setRelationship({});
  };
  const handleChangeEmployee = (rowdata, method) => {
    if (method == 1) {
      rowdata.gender = rowdata.gender.toString()
      rowdata.dateOfBirth = moment(rowdata.dateOfBirth).format("YYYY-MM-DD")
      console.log("rowdata",rowdata);
      // setRelationship(rowdata);
      formik.setValues(rowdata);
      // handleClose()
    }
    if (method == 0) {
      setRelationship(rowdata);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };
  const handleDeleteRelationship = () => {
    setListRelationshipData(listRelationshipData => {
      // const newListRelationshipData = listRelationshipData.filter(value => value.id !== relationship.id)
      const newListRelationshipData = listRelationshipData.filter(value => !relationship?.familyId ? value.id !== relationship.id : value.familyId !==  relationship.familyId)

      handleAddRelation(newListRelationshipData, "listRelationship");
      return newListRelationshipData
    })
    // employeeData.listRelationship = employeeData.listRelationship.filter(
    //   (Relationship) => Relationship.id !== relationship.id
    // );
    setshouldOpenConfirmationDeleteDialog(false);
    setRelationship({});
  };
  console.log("listRelationshipData", listRelationshipData)
  console.log("relationship", relationship)
  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      gender: "",
      relation: "",
      // phone: "",
      // email: "",
      citizenId: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(30, "Nhập họ tên đúng định dạng")
        .required("Không được bỏ trống"),
      gender: Yup.string().required("Không được bỏ trống"),
      // citizenId: Yup.string().required("Không được bỏ trống"),

      dateOfBirth: Yup.date().required("Vui lòng nhập ngày"),
      citizenId: Yup.string()
        .min(5, "Hãy nhập đầy đủ số CMND")
        .max(20, "Nhập đúng định dạng số CMD")
        .required("Không được bỏ trống"),
      relation: Yup.string().required("Không được bỏ trống"),
      address: Yup.string().required("Không được bỏ trống"),
    }),
    // onSubmit: (valuse) => {
    //   console.log(valuse);
    // },

    onSubmit: (values, { resetForm }) => {
      const numberGender = +values.gender
      // values.dateOfBirth = moment(values.dateOfBirth).format("YYYY/MM/DD")
      console.log("values", values)
      console.log("relationship", relationship)
      console.log("familyId", relationship.familyId)
      const isCheck = !relationship?.familyId ? values.id : relationship.familyId
      if (!isCheck) {
        // if (!values.employeeId) {
        values.id = uuidv4()
        // handleAddRelation(values, "listRelationship")
        console.log("tao")
        handleAddRelation([...listRelationshipData, {...values, gender: numberGender}], "listRelationship");
        setListRelationshipData([...listRelationshipData, {...values, gender: numberGender}])
        // formik.resetForm()

      } else {
        console.log("sua")

        setListRelationshipData(listRelationshipData => {
          const newListRelationshipData = listRelationshipData.filter(value => !relationship?.familyId ? value.id !== values.id : value.familyId !==  relationship.familyId)
          newListRelationshipData.push({...values, gender: numberGender})
          handleAddRelation( newListRelationshipData, "listRelationship");
          return newListRelationshipData
        })

        // console.log(values);
        // values.id = relationship.id;
        // console.log('EMPLOYEE DATA TRƯỚC: ',employeeData.listRelationship);
        
        // employeeData.listRelationship = employeeData.listRelationship.filter(
        //   (relationship) => relationship.id !== values.id
        //   );
        //   console.log('VALUES: ',values);
        // console.log('EMPLOYEE DATA SAU: ',employeeData.listRelationship);
        // employeeData.listRelationship.push(values);
        // console.log('EMPLOYEE SAU KHI PUSH: ',employeeData.listRelationship);
        // formik.resetForm()
      }
      resetForm()
      handleClose()
      // formik.values=employee
    },
  });

  const columns = [
    {
      title: "Hành động",
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton onClick={() => {
                setRelationship(rowData)
                return handleChangeEmployee(rowData, 1)
              }}>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                onClick={() =>  handleChangeEmployee(rowData, 0)}
              >
                <Icon color={"error"}>delete</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { title: "Họ và tên", field: "name" },
    {
      title: "Ngày sinh ",
      field: "dateOfBirth",
    },
    { title: "Giới tính", field: "gender" },
    {
      title: "Quan hệ",
      field: "relation",
      // render: (rowData) => rowData.relationship.relationship,
    },
    { title: "Địa chỉ", field: "address" },
    { title: "Số CMND", field: "citizenId" },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setRelationship({});
          }}
          onYesClick={() => {
            handleDeleteRelationship();
          }}
          title="Xóa quan hệ"
        />
      )}

      <form onSubmit={formik.handleSubmit} style={{ marginTop: 10 }}>
        <Grid container spacing={3}>
          <Grid item sm={3} xs={3} className="input-dialog">
            <TextField
              label="Họ và Tên"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              size="small"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              error={formik.errors.name && formik.touched.name}
              helperText={formik.errors.name}
            />
          </Grid>
          <Grid item sm={3} xs={3} className="input-dialog">
            <TextField
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              label="Ngày sinh"
              variant="outlined"
              name="dateOfBirth"
              value={formik.values.dateOfBirth || ""}
              onChange={formik.handleChange}
              error={formik.errors.dateOfBirth && formik.touched.dateOfBirth}
              helperText={formik.errors.dateOfBirth}
            />
          </Grid>
          <Grid item sm={3} xs={3} className="input-dialog">
            {/* <TextField
              label="Giới tính"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              name="gender"
              value={formik.values.gender || ""}
              onChange={formik.handleChange}
              error={formik.errors.gender && formik.touched.gender}
              helperText={formik.errors.gender}
            /> */}
            <TextField
                  select
                  fullWidth
                  size="small"
                  label="Giới tính"
                  variant="outlined"
                  name="gender"
                  value={formik.values.gender || ""}
                  onChange={formik.handleChange}
                  error={formik.errors.gender && formik.touched.gender}
                  helperText={formik.errors.gender}
                >
                  {Gender?.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.gender}
                    </MenuItem>
                  ))}
                </TextField>
          </Grid>
          <Grid item sm={3} xs={3} className="input-dialog">
            <TextField
              label="Quan hệ gia đình"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              name="relation"
              value={formik.values.relation || ""}
              onChange={formik.handleChange}
              error={formik.errors.relation && formik.touched.relation}
              helperText={formik.errors.relation}
            />
          </Grid>

          <Grid item sm={4} xs={4} className="input-dialog">
            <TextField
              label="Số CMND"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              name="citizenId"
              value={formik.values.citizenId || ""}
              onChange={formik.handleChange}
              error={formik.errors.citizenId && formik.touched.citizenId}
              helperText={formik.errors.citizenId}
            />
          </Grid>

          <Grid item sm={5} xs={5} className="input-dialog">
            <TextField
              label="Địa chỉ cụ thể"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              name="address"
              value={formik.values.address || ""}
              onChange={formik.handleChange}
              error={formik.errors.address && formik.touched.address}
              helperText={formik.errors.address}
            />
          </Grid>
          <Grid item sm={3} xs={3} className="input-dialog">
            {" "}
            <Button
              variant="contained"
              sx={{ mb: 2, mr: 2, background: "#FF9E43" }}
              onClick={formik.resetForm}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{ mb: 2, background: "#7467EF" }}
              onClick={() => formik.submitForm()}
            >
              Lưu
            </Button>
          </Grid>
        </Grid>
      </form>
      <MaterialTable
        title={""}
        data={listRelationshipData}
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
    </>
  );
}

export default EmployeeRelation;
