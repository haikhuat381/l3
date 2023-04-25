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
  // updateEmployee,
  getEmployeeData,

  addNewEmployeeAction,
  updateEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction
} from "app/redux/actions/actions";

import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import {  updateEmployee } from "./EmployeeServices";
function AddNewEmployeeDialog(props) {
  const { handleClose, handleChangeReload, employeeUpdate } = props;

  const dispatch = useDispatch();

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [saved, setSaved] = useState("none");

  const employeeDataReducer = useSelector((state) => state?.Employee?.employeeData);

  const [employeeData, setEmployeeData] = useState(employeeDataReducer.employeeInfo);
  const [listDiploma, setListDiploma] = useState([])
  const [listRelationship, setListRelationship] = useState([])


  useEffect(() => {
    setEmployeeData(employeeDataReducer?.employeeInfo);
    setListDiploma(()=> employeeDataReducer?.certificates?.reduce((arr, data) => {
      return [...arr, {
        certificateId: data.certificateId,
        name: data.name,
        field: data.field,
        educationalOrg: data.educationalOrg,
        content: data.content,
        issuanceDate: moment(data.issuanceDate).format("YYYY-MM-DD"),
      }]
    }, []) || [])
    setListRelationship(employeeDataReducer?.familyRelations?.reduce((arr, data) => {
      return [...arr, {
        // familyRelationId: data.familyId,
        name: data.name,
        gender: data.gender,
        relation: data.relation,
        citizenId: data.citizenId,
        address: data.address,
        dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
        familyId: data.familyId
      }]
    }, []) || [])
  }, [employeeDataReducer]);

  const handleAddToList = (data, method) => {
    method === "listDiploma" ? setListDiploma([...data]) : setListRelationship([...data])
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(employeeId);
  // console.log("employeeUpdate", employeeUpdate);
  // console.log("listDiploma", listDiploma);
  // console.log("listRelationship", listRelationship);
  // console.log("employeeData vua bam luu",employeeData);
  //
  const formik = useFormik({
    initialValues: {
      // fullName: employeeData?.fullName || "",
      // email: employeeData?.email || "",
      // code: employeeData?.code || "",
      // phone: employeeData?.phone || "",
      // dateOfBirth: employeeData?.dateOfBirth | "",
      // teamId: employeeData?.teamId || "",
      // citizenId: employeeData?.citizenId || "",
      // address: employeeData?.address || "",
      // gender: employeeData?.gender ? employeeData.gender.toString() : "",
      // photoUrl: employeeData?.photoUrl || "",
      fullName: employeeUpdate?.fullName || "",
      email: employeeUpdate?.email || "",
      code: employeeUpdate?.code || "",
      phone: employeeUpdate?.phone || "",
      // dateOfBirth: employeeUpdate?.dateOfBirth || "",
      dateOfBirth: !employeeUpdate?.dateOfBirth ? "" : moment(employeeUpdate?.dateOfBirth).format("YYYY-MM-DD"),
      teamId: employeeUpdate?.teamId || "",
      citizenId: employeeUpdate?.citizenId || "",
      address: employeeUpdate?.address || "",
      gender:  employeeUpdate?.gender?.toString() || "",
      photoUrl: employeeUpdate?.photoUrl || "",
      // listDiploma: employeeData?.listDiploma || [],
      // listRelationship: employeeData?.listRelationship || [],

      // status: employeeData?.status || "Lưu mới",
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
      address: Yup.string().required("Không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const numberGender = +values.gender
      if (!employeeUpdate?.employeeId) {
        values.id = uuidv4();
        values.status = "Lưu mới";
        const dataInfo = { ...values, gender: numberGender}
        const dataCreate = {
          employeeInfo: dataInfo,
          certificates: listDiploma,
          familyRelations: listRelationship
        }
        if(dataCreate.certificates.length === 0) {
          toast.success("Vui lòng nhập Thông tin văn bằng");
        } else if(dataCreate.familyRelations.length === 0) {
          toast.success("Vui lòng nhập Quan hệ gia đình");
        } else {

          dispatch(addNewEmployeeAction(dataCreate));
          handleChangeReload(values.id)
          toast.success("Lưu mới thành công");
          setSaved("block");

        }
      } else {
        const dataInfo = { ...values, gender: numberGender}
        const updateData = {
          employeeInfo: dataInfo,
          certificates: listDiploma,
          familyRelations: listRelationship.reduce((arr, data) => {
            if(data.familyId) {
              data.familyRelationId = data.familyId
            }
            delete data.familyId
            return [...arr, {...data}]
          },[])
        }
        
        dispatch(updateEmployeeAction(employeeUpdate?.employeeId,updateData))
        handleChangeReload(employeeUpdate?.gender)

        toast.success("Cập nhật thành công");
        setSaved("block");
      }
      // handleGetListEmployee()
      setShouldOpenDialog(false);
      if(!!employeeUpdate?.employeeId) {
        dispatch(getEmployeeDataAction(employeeUpdate?.employeeId))
        // dispatch(getFormDataAction(employeeData?.employeeId))
      }
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
            // borderBottom: "1px solid #ccc",
            boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            padding: "12px 24px"
          }}
        >
          {!employeeData?.employeeId ? "Thêm mới nhân viên" : "Sửa nhân viên"}
          <Box onClick={() => handleClose()}>
            <Close color="error"></Close>
          </Box>
        </DialogTitle>

        <DialogContent style={{ overflow: "hidden", marginTop: 16, padding: "0 24px" }}>
          <form onSubmit={formik.handleSubmit}>
            <TabContext value={value}>
              <Box
                sx={{
                  // borderBottom: 1,
                  // borderColor: "divider",
                  background: "#ddd",
                  overflow: "hidden",
                  // borderRadius: "4px"
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab label="Thông tin nhân viên" value="1" />
                  <Tab label="Thông tin  văn bằng" value="2" />
                  <Tab label="Thông tin quan hệ gia đình" value="3" />
                </TabList>
              </Box>
              {/* <TabPanel value="1" sx={{ p: "20px 0" }}> */}
              <TabPanel value="1" sx={{ p: "0 0 20px 0" }}>
                <EmployeeInfo 
                  formikRoot={formik}
                  dataUp 

                />
              </TabPanel>
              <TabPanel value="2" sx={{ p: "20px 0" }}>
                <EmployeeDiploma
                  employeeData={employeeData}
                  listDiploma = {listDiploma}
                  handleAddDiploma={handleAddToList}
                />
              </TabPanel>
              <TabPanel value="3" sx={{ p: "20px 0" }}>
                <EmployeeRelation
                  employeeData={employeeData}
                  listRelationship= {listRelationship}
                  handleAddRelation={handleAddToList}
                />
              </TabPanel>
            </TabContext>
          </form>
        </DialogContent>

        <DialogActions
          style={{
            // marginLeft: 20,
            // marginRight: 20,
            // borderTop: "1px solid #ccc",
            boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            justifyContent: 'center',
            // alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ display: saved }}
            onClick={() => {
              setShouldOpenDialog("true");
              dispatch(getFormDataAction(employeeData?.employeeId))
            }}
          >
            Đăng kí
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ display: saved === "none" ? "block" : "none" }}
            onClick={() => formik.submitForm()}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            color="error"
            // sx={{ background: "#FF9E43" }}
            onClick={() => handleClose()}
          >
            Hủy
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
          handleChangeReload={handleChangeReload}
        />
      )}
    </>
  );
}

export default AddNewEmployeeDialog;
