import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import EmployeeRegisterDialog from "./EmployeeRegisterDialog";
import { Close } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EmployeeInfo from "./Employee/EmployeeInfo";
import EmployeeDiploma from "./Employee/EmployeeDiploma";
import EmployeeRelation from "./Employee/EmployeeRelation";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addNewEmployee,
  updateEmployee,
  getEmployeeData,
} from "app/redux/actions/actions";

import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
function AddNewEmployeeDialog(props) {
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [saved, setSaved] = useState("none");
  const { handleClose } = props;
  const employee = useSelector((state) => state.Employee.employeeData);
  const [employeeData, setEmployee] = useState(employee);
  useEffect(() => {
    setEmployee(employee);
  }, [employee]);
  // console.log(employeeData)
  const handleAddToList = (data, method) => {
    setEmployee({ ...employeeData, [method]: [...employeeData[method], data] });
  };

  const [employeeId, setEmployeeId] = useState(employeeData.id);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(employeeId);
  console.log(employeeData);
  //
  const formik = useFormik({
    initialValues: {
      fullName: employeeData?.fullName || "",
      email: employeeData?.email || "",
      code: employeeData?.code || "",
      phone: employeeData?.phone || "",
      dateOfBirth: "",
      teamId: employeeData?.teamId || "",
      citizenId: employeeData?.citizenId || "",
      address: employeeData?.address || "",
      gender: employeeData?.gender || "",

      image: employeeData?.image || "/assets/images/illustrations/dreamer.svg",
      listDiploma: employeeData?.listDiploma || [],
      listRelationship: employeeData?.listRelationship || [],

      status: employeeData?.status || "Lưu mới",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[\p{L}\s]+$/u, "Không đọc nhập số và kí tự đặc biệt")
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(40, "Nhập họ tên đúng định dạng")
        .required("Không được bỏ trống"),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .test("contains-mail", "Email phải chứa @gmail.com", (value) => {
          if (value && !/@gmail\.com\s*$/.test(value)) {
            return false;
          }
          return true;
        })
        .required("Email không được bỏ trống"),
      gender: Yup.string().required("Không được bỏ trống").nullable(),
      code: Yup.string().required("Không được bỏ trống"),
      dateOfBirth: Yup.date().required("Vui lòng nhập ngày"),
      teamId: Yup.string().required("Hãy nhập lĩnh vực").nullable(),
      phone: Yup.number()
        .typeError("Vui lòng nhập số ĐT")
        .min(5, "Hãy nhập đầy đủ số ĐT")
        .max(9999999999, "Số ĐT không được vượt quá 10 chữ số")
        .required("Không được bỏ trống"),
      citizenId: Yup.number()
        .typeError("Vui lòng nhập số CMND")
        .min(5, "Hãy nhập đầy đủ số CMND")
        .max(999999999999, "Số CMND không được vượt quá 12 chữ số")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      console.log(" heo le em  ,", values);
      if (!employeeId) {
        values.id = uuidv4();
        values.status = "Lưu mới";
        setEmployeeId(values.id);
        values.listPromote = [];
        values.listPropose = [];
        values.listRegister = [];
        values.listIncreaseSalary = [];
        console.log("haha");
        console.log(values);
        dispatch(addNewEmployee(values));
        toast.success("Lưu mới thành công");
      } else {
        values.id = employeeId;
        values.listDiploma = employeeData.listDiploma;
        values.listRelationship = employeeData.listRelationship;
        const updateData = { ...employeeData, ...values };
        console.log("updateData");
        console.log(updateData);
        dispatch(updateEmployee(updateData));
        toast.success("Cập nhật thành công");
      }
      setSaved("block");
      setShouldOpenDialog(false);
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Dialog open={true} maxWidth={"lg"} fullWidth={true}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!employeeData.id ? "Thêm mới nhân viên" : "Sửa nhân viên"}
          <Box onClick={() => handleClose()}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>

        <DialogContent style={{ overflow: "hidden" }}>
          <form onSubmit={formik.handleSubmit}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  background: "#ddd",
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab label="Thông tin nhân viên" value="1" />
                  <Tab label="Thông tin  văn bằng" value="2" />
                  <Tab label="Thông tin quan hệ gia đình" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: "20px 0" }}>
                <EmployeeInfo formikRoot={formik} />
              </TabPanel>
              <TabPanel value="2" sx={{ p: "20px 0" }}>
                <EmployeeDiploma
                  employeeData={employeeData}
                  handleAddDiploma={handleAddToList}
                />
              </TabPanel>
              <TabPanel value="3" sx={{ p: "20px 0" }}>
                <EmployeeRelation
                  employeeData={employeeData}
                  handleAddRelation={handleAddToList}
                />
              </TabPanel>
            </TabContext>
          </form>
        </DialogContent>

        <DialogActions
          style={{
            marginLeft: 20,
            marginRight: 20,
            borderTop: "1px solid #ccc",
          }}
        >
          <Button
            variant="contained"
            sx={{ mb: 2, background: "#FF9E43" }}
            onClick={() => handleClose()}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2, background: "#339999", display: saved }}
            onClick={() => {
              setShouldOpenDialog("true");
            }}
          >
            Đăng kí
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ mb: 2, mr: 5, background: "#7467EF" }}
            onClick={() => formik.submitForm()}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      {shouldOpenDialog && (
        <EmployeeRegisterDialog
          handleAddToList={handleAddToList}
          handleClose={() => {
            setShouldOpenDialog(false);
          }}
          handleCloseAll={handleClose}
        />
      )}
      {/* <EmployeeRegisterDialog
        formikRoot={formik}
        handleClose={() => {
          setShouldOpenDialog(false);
        }}
        handleAddToFomik={handleAddToFomik}
      /> */}
    </>
  );
}

export default AddNewEmployeeDialog;
