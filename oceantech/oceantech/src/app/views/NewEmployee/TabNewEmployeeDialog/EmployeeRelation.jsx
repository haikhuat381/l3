import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import {
  Button,
  Icon,
  IconButton,
  Tooltip,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import ConfirmationDialog from "app/components/confirmDialog/ConfirmationDialog";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import {
  Gender,
  formatDateSend,
  formatDateView,
  messageOfNoData,
} from "app/constant";

function EmployeeRelation(props) {
  const { handleAddRelation, listRelationship } = props;
  const [relationship, setRelationship] = useState({});
  const [listRelationshipData, setListRelationshipData] =
    useState(listRelationship);
  const [
    shouldOpenConfirmationDeleteDialog,
    setshouldOpenConfirmationDeleteDialog,
  ] = useState(false);

  const handleClose = () => {
    setRelationship({});
  };
  const handleChangeEmployee = (rowdata, method) => {
    if (method === "edit") {
      rowdata.gender = rowdata.gender.toString();
      rowdata.dateOfBirth = formatDateSend(rowdata?.dateOfBirth);
      formik.setValues(rowdata);
    } else {
      setRelationship(rowdata);
      setshouldOpenConfirmationDeleteDialog(true);
    }
  };
  const handleDeleteRelationship = () => {
    setListRelationshipData((listRelationshipData) => {
      const newListRelationshipData = listRelationshipData.filter((value) =>
        !relationship?.familyId
          ? value.id !== relationship.id
          : value.familyId !== relationship.familyId
      );

      handleAddRelation(newListRelationshipData, "listRelationship");
      return newListRelationshipData;
    });
    setshouldOpenConfirmationDeleteDialog(false);
    setRelationship({});
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      gender: "",
      relation: "",
      citizenId: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .matches(/^[\p{L}\s]+$/u, "Không được nhập số và kí tự đặc biệt")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Họ và tên  không được để trống"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
      dateOfBirth: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày sinh"),
      citizenId: Yup.string()
        .matches(/^(\d{9}|\d{12})$/, "Số CCCD/CMT không hợp lệ")
        .max(12, "Nhập tối đa 12 kí tự")
        .required("Số CCCD/CMT không được để trống"),
      relation: Yup.string()
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Quan hệ gia đình không được để trống"),
      address: Yup.string()
        .max(200, "Nhập tối đa 200 kí tự")
        .required("Địa chỉ không được để trống"),
    }),

    onSubmit: (values, { resetForm }) => {
      const numberGender = +values.gender;
      const isCheckId = values?.id ?? relationship?.familyId;
      if (isCheckId) {
        setListRelationshipData((listRelationshipData) => {
          const newListRelationshipData = listRelationshipData.filter((value) =>
            !relationship?.familyId
              ? value.id !== values.id
              : value.familyId !== relationship.familyId
          );
          newListRelationshipData.push({ ...values, gender: numberGender });
          newListRelationshipData.familyRelationId =
            newListRelationshipData.familyId;
          handleAddRelation(newListRelationshipData, "listRelationship");
          return newListRelationshipData;
        });
      } else {
        values.id = uuidv4();
        handleAddRelation(
          [...listRelationshipData, { ...values, gender: numberGender }],
          "listRelationship"
        );
        setListRelationshipData([
          ...listRelationshipData,
          { ...values, gender: numberGender },
        ]);
      }
      resetForm();
      handleClose();
    },
  });

  const columns = [
    {
      title: "STT",
      width: 50,
      headerStyle: { borderTopLeftRadius: "4px" },
      render: (rowData) => rowData.tableData.index + 1
    },
    {
      title: "Hành động",
      width: 140,
      render: (rowData) => {
        return (
          <>
            <Tooltip title="Sửa">
              <IconButton
                onClick={() => {
                  setRelationship(rowData);
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
    { title: "Họ tên", field: "name" },
    {
      title: "Ngày sinh ",
      field: "dateOfBirth",
      width: 130,
      render: (rowData) => formatDateView(rowData?.dateOfBirth),
    },
    {
      title: "Giới tính",
      field: "gender",
      width: 120,
      render: (rowData) => Gender[rowData.gender]?.gender,
    },
    {
      title: "Quan hệ",
      field: "relation",
      width: 120,
    },
    {
      title: "Số CCCD/CMT",
      field: "citizenId",
      headerStyle: { borderTopRightRadius: "4px" },
    },
  ];

  return (
    <>
      {shouldOpenConfirmationDeleteDialog && (
        <ConfirmationDialog
          onConfirmDialogClose={() => {
            setshouldOpenConfirmationDeleteDialog(false);
            setRelationship({});
          }}
          onYesClick={() => {
            handleDeleteRelationship();
            formik.resetForm();
          }}
          title="Xóa Quan hệ"
          content="Bạn có chhắc chắn muốn xóa Quan hệ này?"
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} className="employee-relation-container">
          <Grid item sm={3} xs={12}>
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
              helperText={
                (formik.touched.name && formik.errors.name) ? (
                  <div>{formik.errors.name}</div>
                ) : null
              }
            />
          </Grid>
          <Grid item sm={3} xs={12}>
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
              helperText={
                (formik.touched.dateOfBirth && formik.errors.dateOfBirth) ? (
                  <div>{formik.errors.dateOfBirth}</div>
                ) : null
              }
            />
          </Grid>
          <Grid item sm={3} xs={12}>
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
              helperText={
                (formik.touched.gender && formik.errors.gender) ? (
                  <div>{formik.errors.gender}</div>
                ) : null
              }
              sx={{
                "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input":
                {
                  padding: "7px 32px 10px 14px",
                },
              }}
            >
              {Gender?.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.gender}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={3} xs={12}>
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
              helperText={
                (formik.touched.relation && formik.errors.relation) ? (
                  <div>{formik.errors.relation}</div>
                ) : null
              }
            />
          </Grid>

          <Grid item sm={3} xs={12}>
            <TextField
              label="Số CCCD/CMT"
              type="text"
              fullWidth
              size="small"
              variant="outlined"
              name="citizenId"
              value={formik.values.citizenId || ""}
              onChange={formik.handleChange}
              error={formik.errors.citizenId && formik.touched.citizenId}
              helperText={
                (formik.touched.citizenId && formik.errors.citizenId) ? (
                  <div>{formik.errors.citizenId}</div>
                ) : null
              }
            />
          </Grid>

          <Grid item sm={5} xs={12}>
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
              helperText={
                (formik.touched.address && formik.errors.address) ? (
                  <div>{formik.errors.address}</div>
                ) : null
              }
            />
          </Grid>
          <Grid container item sm={4} xs={12} spacing={1}>
            <Grid item xs="auto">
              <Button
                className="button-custom"
                variant="contained"
                color="primary"
                type="button"
                onClick={formik.handleSubmit}
              >
                Lưu quan hệ
              </Button>
            </Grid>
            <Grid item xs="auto">
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
          data={listRelationshipData}
          columns={columns}
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
              position: "sticky",
              top: 0,
              zIndex: 1,
              padding: 14,
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

export default EmployeeRelation;
