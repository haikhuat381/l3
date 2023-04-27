import React, { useEffect, useRef, useState } from "react";
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
  addNewEmployeeAction,
  updateEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction
} from "app/redux/actions/actions";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";



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
        familyId: data.familyId,
        name: data.name,
        gender: data.gender,
        relation: data.relation,
        citizenId: data.citizenId,
        address: data.address,
        dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
      }]
    }, []) || [])
  }, [employeeDataReducer]);

  const handleAddToList = (data, method) => {
    method === "listDiploma" ? setListDiploma([...data]) : setListRelationship([...data])
  };

  const [value, setValue] = React.useState("1");
  
  const handleChange = (event, newValue) => {
    const valueCheck = {...formik.values}
    delete valueCheck.photoUrl
    if (Object.keys(formik.errors).length === 0 && Object.values(valueCheck).every(value => value !== '')) {
      setValue(newValue);
    } else {
      formik.handleSubmit()
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: employeeUpdate?.fullName || "",
      email: employeeUpdate?.email || "",
      code: employeeUpdate?.code || "",
      phone: employeeUpdate?.phone || "",
      dateOfBirth: !employeeUpdate?.dateOfBirth ? "" : moment(employeeUpdate?.dateOfBirth).format("YYYY-MM-DD"),
      teamId: employeeUpdate?.teamId || "",
      citizenId: employeeUpdate?.citizenId || "",
      address: employeeUpdate?.address || "",
      gender:  employeeUpdate?.gender?.toString() || "",
      photoUrl: employeeUpdate?.photoUrl || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[\p{L}\s]+$/u, "Không đọc nhập số và kí tự đặc biệt")
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(32, "Nhập họ tên đúng định dạng")
        .required("Không được bỏ trống"),
      email: Yup.string().email("Email sai định dạng").required("Không được bỏ trống"),
      gender: Yup.string().required("Không được bỏ trống").nullable(),
      code: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Không được bỏ trống"),
      dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), "Yêu cầu trên 18 tuổi")
        .min(new Date(Date.now() - 1892160000000), "Yêu cầu dưới 60 tuổi")
        .required("Vui lòng nhập ngày"),
      teamId: Yup.string().required("Hãy nhập lĩnh vực").nullable(),
      citizenId: Yup.string()
        .matches(/^[0-9]{12}$/, "Số CCCD/CMT không hợp lệ")
        .required("Không được bỏ trống"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
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
          // toast.success("Lưu mới thành công");
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

        // toast.success("Cập nhật thành công");
        setSaved("block");
      }
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
            boxShadow:'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ display: saved }}
            onClick={() => {
              dispatch(getFormDataAction(employeeData?.employeeId))
              if(employeeData?.employeeId) {
                console.log("employeeData?.employeeId", employeeData?.employeeId)
                dispatch(getEmployeeDataAction(employeeData?.employeeId))
              }
              setShouldOpenDialog("true");
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
