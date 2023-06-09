import React, { useEffect, useState } from "react";
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
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EmployeeInfo from "./TabNewEmployeeDialog/EmployeeInfo";
import EmployeeDiploma from "./TabNewEmployeeDialog/EmployeeDiploma";
import EmployeeRelation from "./TabNewEmployeeDialog/EmployeeRelation";
import { useFormik } from "formik";
import {
  addNewEmployeeAction,
  updateEmployeeAction,
  getEmployeeDataAction,
  getFormDataAction,
} from "app/redux/actions/actions";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { formatDateSend } from "app/constant";
import LoadingBay from "app/components/LoadingBay";


function NewEmployeeDialog(props) {
  const { handleClose, handleCloseMoreInfoDialog, handleChangeReload, employeeUpdate } = props;

  const dispatch = useDispatch();

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [register, setRegister] = useState(false);

  const [value, setValue] = React.useState("info");
  const employeeDataReducer = useSelector(
    (state) => state?.Employee?.employeeData
  );
  const loading = useSelector((state) => state?.Employee?.loading);
  const [employeeData, setEmployeeData] = useState(
    employeeDataReducer.employeeInfo
  );
  const [listDiploma, setListDiploma] = useState([]);
  const [listRelationship, setListRelationship] = useState([]);
  const [isDisplaySave, setIsDisplaySave] = useState(true)

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
            issuanceDate: formatDateSend(data?.issuanceDate),
          };
        }) || []
    );
    setListRelationship(
      employeeDataReducer?.familyRelations?.map((data) => {
        return {
          familyId: data?.familyId,
          name: data?.name,
          gender: data?.gender,
          relation: data?.relation,
          citizenId: data?.citizenId,
          address: data?.address,
          dateOfBirth: formatDateSend(data?.dateOfBirth),
        };
      }) || []
    );
  }, [employeeDataReducer]);

  useEffect(() => {
    setIsDisplaySave(listDiploma.length === 0 || listRelationship.length === 0)
  },[listDiploma, listRelationship])

  const handleAddToList = (data, method) => {
    method === "listDiploma"
      ? setListDiploma([...data])
      : setListRelationship([...data]);
    setRegister(true)
  };

  const onChangeInput = () => {
    setRegister(true)
  }

  const formik = useFormik({
    initialValues: {
      fullName: employeeUpdate?.fullName || "",
      email: employeeUpdate?.email || "",
      code: employeeUpdate?.code || "",
      phone: employeeUpdate?.phone || "",
      dateOfBirth: !employeeUpdate?.dateOfBirth
        ? ""
        : formatDateSend(employeeUpdate?.dateOfBirth),
      teamId: employeeUpdate?.teamId || "",
      citizenId: employeeUpdate?.citizenId || "",
      address: employeeUpdate?.address || "",
      gender: employeeUpdate?.gender?.toString() || "",
      photoUrl: employeeUpdate?.photoUrl || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[\p{L}\s]+$/u, "Không được nhập số và kí tự đặc biệt")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Tên nhân viên không được để trống"),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .max(32, "Nhập tối đa 32 kí tự")
        .required("Email không được để trống"),
      gender: Yup.string().required("Vui lòng chọn giới tính").nullable(),
      code: Yup.string()
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(12, "Nhập tối đa 12 kí tự")
        .required("Mã nhân viên không được để trống"),
      dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), "Yêu cầu trên 18 tuổi")
        .min(new Date(Date.now() - 1892160000000), "Yêu cầu dưới 60 tuổi")
        .required("Vui lòng nhập ngày sinh"),
      teamId: Yup.string().required("Vui lòng chọn nhóm").nullable(),
      citizenId: Yup.string()
        .matches(/^(\d{9}|\d{12})$/, "Số CCCD/CMT không hợp lệ")
        .max(12, "Nhập tối đa 12 kí tự")
        .required("Số CCCD/CMT không được để trống"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Số điện thoại không hợp lệ")
        .max(10, "Nhập tối đa 10 kí tự")
        .required("Số điện thoại không được để trống"),
      address: Yup.string()
        .max(200, "Nhập tối đa 200 kí tự")
        .required("Địa chỉ không được để trống"),
    }),
    onSubmit: (values) => {
        const numberGender = +values.gender;
        const dataInfo = { ...values, gender: numberGender };

        if (employeeUpdate?.employeeId) {
          const updateData = {
            employeeInfo: dataInfo,
            certificates: listDiploma,
            familyRelations: listRelationship?.reduce((arr, data) => {
              if (data.familyId) {
                data.familyRelationId = data.familyId;
              }
              delete data.familyId;
              return [...arr, { ...data }];
            }, []),
          };

          dispatch(
            updateEmployeeAction(employeeUpdate?.employeeId, updateData)
          );
        } else {
          // dataInfo.id = uuidv4();
          const dataCreate = {
            employeeInfo: dataInfo,
            // certificates: listDiploma,
            // familyRelations: listRelationship,
            certificates: listDiploma.map(data => {
              if(data.id) {
                return {
                  name: data?.name,
                  field: data?.field,
                  educationalOrg: data?.educationalOrg,
                  content: data?.content,
                  issuanceDate: data?.issuanceDate,
                      }
              } else {
                return data
              }
            }),
            familyRelations: listRelationship.map(data => {
              if(data.id) {
                return {
                  name: data?.name,
                  gender: data?.gender,
                  relation: data?.relation,
                  citizenId: data?.citizenId,
                  address: data?.address,
                  dateOfBirth:data?.dateOfBirth,
                      }
              } else {
                return data
              }
            }),
          };
          dispatch(addNewEmployeeAction(dataCreate));
        }
        handleChangeReload({});
        setRegister(false);
        setShouldOpenDialog(false);
    },
  });


  const valueCheck = { ...formik.values };
  delete valueCheck.photoUrl;

  const isListDiplomaEmpty = listDiploma.length === 0;
  const isListRelationshipEmpty = listRelationship.length === 0;
  const isAllFormValuesValid =
    Object.keys(formik.errors).length === 0 &&
    Object.values(valueCheck).every((value) => value !== "");

  const handleChange = (event, newValue) => {
    if (isAllFormValuesValid) {
      setValue(newValue);
    } else {
      formik.handleSubmit();
    }
  };

  const getNextValue = () => {
    return value === "diploma" && isListRelationshipEmpty ? "relation" : "diploma";
  };
  
  const getPrevValue = () => {
    return value === "relation" && isListDiplomaEmpty ? "diploma" : "relation";
  };

  const handleChangeNext = () => {
    if (isAllFormValuesValid) {
      if (isListDiplomaEmpty) {
        setValue(getNextValue());
      } else if (isListRelationshipEmpty) {
        setValue(getPrevValue());
      }
    } else {
      formik.handleSubmit();
    }
  };

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
                  <Tab label="Thông tin nhân viên" value="info" />
                  <Tab label="Thông tin văn bằng" value="diploma" />
                  <Tab label="Thông tin quan hệ gia đình" value="relation" />
                </TabList>
              </Box>
              <TabPanel value="info" className="tab-info-employeeDialog">
                <EmployeeInfo formikRoot={formik} onChangeInput={onChangeInput} />
              </TabPanel>
              <TabPanel value="diploma" className="tab-diploma-employeeDialog">
                <EmployeeDiploma
                  employeeData={employeeData}
                  listDiploma={listDiploma}
                  handleAddDiploma={handleAddToList}
                />
              </TabPanel>
              <TabPanel value="relation" className="tab-relation-employeeDialog">
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
            style={{display: isDisplaySave ? "" :  "none"}}
            onClick={handleChangeNext}
          >
            Tiếp theo
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{display: isDisplaySave ? "none" : ""}}
            onClick={formik.submitForm}
          >
            Lưu
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={!employeeData?.employeeId || register}
            onClick={() => {
              dispatch(getFormDataAction(employeeData?.employeeId));
              dispatch(getEmployeeDataAction(employeeData?.employeeId));
              setTimeout(() => {
                handleCloseMoreInfoDialog()
                setShouldOpenDialog(true);
              }, 300)
            }}
          >
            Đăng kí
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
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

      {loading && <LoadingBay />}
    </>
  );
}

export default NewEmployeeDialog;
