import { TextField, Grid, Button } from "@mui/material";
import MaterialTable from "@material-table/core";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DeleteIcon, EditIcon } from "app/components/Icon";
import { messageOfNoData } from "app/constant";

function RegisterDocument() {

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
      date: Yup.date()
        .max(new Date(), "Không được nhập ngày lớn hơn hiện tại")
        .required("Vui lòng nhập ngày cấp")
    }),
    onSubmit: () => {

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
            />
            <DeleteIcon
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

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid item container xs={12} spacing={2}>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
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
            <Grid item md={3} xs={12}>
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
            <Grid container item md={3} xs={12} spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  className="button-custom"
                  color="primary"
                  type="submit">
                  Lưu
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className="button-custom"
                  color="error"
                  onClick={() => formik.resetForm()}
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
                data={[]}
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


    </>
  );
}

export default RegisterDocument;
