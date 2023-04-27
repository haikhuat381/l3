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
  const { handleAddRelation,listRelationship } = props;
  // const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
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
      const newListRelationshipData = listRelationshipData.filter(value => !relationship?.familyId ? value.id !== relationship.id : value.familyId !==  relationship.familyId)

      handleAddRelation(newListRelationshipData, "listRelationship");
      return newListRelationshipData
    })
    setshouldOpenConfirmationDeleteDialog(false);
    setRelationship({});
  };
  // console.log("listRelationshipData", listRelationshipData)
  // console.log("relationship", relationship)
  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      gender: "",
      relation: "",
      citizenId: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[\p{L}\s]+$/u, "Không đọc nhập số và kí tự đặc biệt")
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(32, "Nhập họ tên đúng định dạng")
        .required("Không được bỏ trống"),
      gender: Yup.string().required("Không được bỏ trống"),
      dateOfBirth: Yup.date().required("Vui lòng nhập ngày"),
      citizenId: Yup.string()
        .matches(/^[0-9]{12}$/, "Số CCCD/CMT không hợp lệ")
        .required("Không được bỏ trống"),
      relation: Yup.string().required("Không được bỏ trống"),
      address: Yup.string().required("Không được bỏ trống"),
    }),

    onSubmit: (values, { resetForm }) => {
      const numberGender = +values.gender
      const isCheck = !relationship?.familyId ? values.id : relationship.familyId
      if (!isCheck) {
        values.id = uuidv4()
        handleAddRelation([...listRelationshipData, {...values, gender: numberGender}], "listRelationship");
        setListRelationshipData([...listRelationshipData, {...values, gender: numberGender}])

      } else {
        setListRelationshipData(listRelationshipData => {
          const newListRelationshipData = listRelationshipData.filter(value => !relationship?.familyId ? value.id !== values.id : value.familyId !==  relationship.familyId)
          newListRelationshipData.push({...values, gender: numberGender})
          newListRelationshipData.familyRelationId = newListRelationshipData.familyId
          handleAddRelation( newListRelationshipData, "listRelationship");
          return newListRelationshipData
        })
      }
      resetForm()
      handleClose()
      // formik.values=employee
    },
  });

  const columns = [
    {
      title: "Hành động",
      headerStyle: { 
        borderTopLeftRadius: "4px"
      },
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
    { title: "Số CMND", field: "citizenId",
      headerStyle: {borderTopRightRadius: "4px"},
    },
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
          title= "Xóa bản ghi"
          content= "Bạn có chhắc chắn muốn xóa Quan hệ này?"
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
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
              helperText={formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
              // helperText={formik.errors.name}
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
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <div>{formik.errors.dateOfBirth}</div> : null}
              // helperText={formik.errors.dateOfBirth}
            />
          </Grid>
          <Grid item sm={3} xs={3} className="input-dialog">
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
                  helperText={formik.touched.gender && formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
                  // helperText={formik.errors.gender}
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
              helperText={formik.touched.relation && formik.errors.relation ? <div>{formik.errors.relation}</div> : null}
              // helperText={formik.errors.relation}
            />
          </Grid>

          <Grid item sm={3} xs={3} className="input-dialog">
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
              helperText={formik.touched.citizenId && formik.errors.citizenId ? <div>{formik.errors.citizenId}</div> : null}
              // helperText={formik.errors.citizenId}
            />
          </Grid>

          <Grid item sm={6} xs={6} className="input-dialog">
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
              helperText={formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}
              // helperText={formik.errors.address}
            />
          </Grid>

          {/* <Grid container item xs={3} spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={formik.handleSubmit}
              >
                Lưu quan hệ
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={formik.resetForm}
              >
                Hủy
              </Button>
            </Grid>
          </Grid> */}
          <Grid item sm={3} xs={3} className="input-dialog">
            {" "}
            <Button
              variant="contained"
              color="primary"
              sx={{ mb: 2, mr: 1}}
              onClick={() => formik.submitForm()}
            >
              Lưu quan hệ
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mb: 2}}
              onClick={formik.resetForm}
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
      </form>
      <MaterialTable
        title={""}
        data={listRelationshipData}
        columns={columns}
        options={{
          paging: false,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          stickyHeader: true,
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
            position: 'sticky', top: 0, zIndex: 99
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
    </>
  );
}

export default EmployeeRelation;
