import React, { useEffect, useRef, useState } from "react";
import Tab from "@mui/material/Tab";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
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
  getFormDataAction,
} from "app/redux/actions/actions";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function AddNewEmployeeDialog(props) {
  const { handleClose, handleChangeReload, employeeUpdate } = props;

  const dispatch = useDispatch();

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [saved, setSaved] = useState(true);

  const employeeDataReducer = useSelector(
    (state) => state?.Employee?.employeeData
  );

  const [employeeData, setEmployeeData] = useState(
    employeeDataReducer.employeeInfo
  );
  const [listDiploma, setListDiploma] = useState([]);
  const [listRelationship, setListRelationship] = useState([]);

  useEffect(() => {
    setEmployeeData(employeeDataReducer?.employeeInfo);
    setListDiploma(
      () =>
        employeeDataReducer?.certificates?.map((data) => {
          return {
              certificateId: data?.certificateId,
              name: data?.name,
              field: data?.field,
              educationalOrg: data?.educationalOrg,
              content: data?.content,
              issuanceDate: moment(data?.issuanceDate).format("YYYY-MM-DD"),
            }
        }) || []
    );
    setListRelationship(
      employeeDataReducer?.familyRelations?.map((data) => {
        return  {
            familyId: data?.familyId,
            name: data?.name,
            gender: data?.gender,
            relation: data?.relation,
            citizenId: data?.citizenId,
            address: data?.address,
            dateOfBirth: moment(data?.dateOfBirth).format("YYYY-MM-DD"),
          }
      }) || []
    );
  }, [employeeDataReducer]);

  const handleAddToList = (data, method) => {
    method === "listDiploma"
      ? setListDiploma([...data])
      : setListRelationship([...data]);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    const valueCheck = { ...formik.values };
    delete valueCheck.photoUrl;
    if (
      Object.keys(formik.errors).length === 0 &&
      Object.values(valueCheck).every((value) => value !== "")
    ) {
      setValue(newValue);
    } else {
      formik.handleSubmit();
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: employeeUpdate?.fullName || "",
      email: employeeUpdate?.email || "",
      code: employeeUpdate?.code || "",
      phone: employeeUpdate?.phone || "",
      dateOfBirth: !employeeUpdate?.dateOfBirth
        ? ""
        : moment(employeeUpdate?.dateOfBirth).format("YYYY-MM-DD"),
      teamId: employeeUpdate?.teamId || "",
      citizenId: employeeUpdate?.citizenId || "",
      address: employeeUpdate?.address || "",
      gender: employeeUpdate?.gender?.toString() || "",
      photoUrl: employeeUpdate?.photoUrl || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[\p{L}\s]+$/u, "Không đọc nhập số và kí tự đặc biệt")
        .min(5, "Hãy nhập đầy đủ họ và tên")
        .max(32, "Nhập họ tên đúng định dạng")
        .required("Không được bỏ trống"),
      email: Yup.string()
        .email("Email sai định dạng")
        .required("Không được bỏ trống"),
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
      const numberGender = +values.gender;
      if (!employeeUpdate?.employeeId) {
        values.id = uuidv4();
        values.status = "Lưu mới";
        const dataInfo = { ...values, gender: numberGender };
        const dataCreate = {
          employeeInfo: dataInfo,
          certificates: listDiploma,
          familyRelations: listRelationship,
        };
        if (dataCreate.certificates.length === 0) {
          toast.success("Vui lòng nhập Thông tin văn bằng");
        } else if (dataCreate.familyRelations.length === 0) {
          toast.success("Vui lòng nhập Quan hệ gia đình");
        } else {
          dispatch(addNewEmployeeAction(dataCreate));
          // toast.success("Lưu mới thành công");
          setSaved(false);
        }
      } else {
        const dataInfo = { ...values, gender: numberGender };
        const updateData = {
          employeeInfo: dataInfo,
          certificates: listDiploma,
          familyRelations: listRelationship.reduce((arr, data) => {
            if (data.familyId) {
              data.familyRelationId = data.familyId;
            }
            delete data.familyId;
            return [...arr, { ...data }];
          }, []),
        };

        dispatch(updateEmployeeAction(employeeUpdate?.employeeId, updateData));
        // toast.success("Cập nhật thành công");
        setSaved(false);
      }
      // handleChangeReload(employeeUpdate?.gender);
      handleChangeReload(Math.random().toString(36).slice(-5))
      // setSaved(false);
      setShouldOpenDialog(false);
    },
  });

  return (
    <>
      <Dialog open={true} maxWidth={"md"} fullWidth={true}>
        <DialogTitle className="dialog-title-employeeDialog">
          {!employeeData?.employeeId ? "Thêm mới nhân viên" : "Sửa nhân viên"}
          <IconButton onClick={handleClose}>
            <Icon color="error">close</Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent className="dialog-content-employeeDialog">
          <form onSubmit={formik.handleSubmit}>
            <TabContext value={value}>
              <Box
                sx={{
                  background: "#ddd",
                  overflow: "hidden",
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab label="Thông tin nhân viên" value="1" />
                  <Tab label="Thông tin  văn bằng" value="2" />
                  <Tab label="Thông tin quan hệ gia đình" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1" className="tab-info-employeeDialog">
                <EmployeeInfo formikRoot={formik} />
              </TabPanel>
              <TabPanel value="2" className="tab-diploma-employeeDialog">
                <EmployeeDiploma
                  employeeData={employeeData}
                  listDiploma={listDiploma}
                  handleAddDiploma={handleAddToList}
                />
              </TabPanel>
              <TabPanel value="3" className="tab-relation-employeeDialog">
                <EmployeeRelation
                  employeeData={employeeData}
                  listRelationship={listRelationship}
                  handleAddRelation={handleAddToList}
                />
              </TabPanel>
            </TabContext>
          </form>
        </DialogContent>

        <DialogActions className="dialog-action-employeeDialog">
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!saved}
            onClick={formik.submitForm}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={saved}
            onClick={() => {
              dispatch(getFormDataAction(employeeData?.employeeId));
              dispatch(getEmployeeDataAction(employeeData?.employeeId));
              setShouldOpenDialog("true");
            }}
          >
            Đăng kí
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
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
