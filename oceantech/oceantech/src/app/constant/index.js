import moment from "moment";
import { styled } from "@mui/material";

export const API = "https://em-dev.oceantech.com.vn/em/employees";
export const API_TOKEN = "https://em-dev.oceantech.com.vn/em/oauth/token";
export const newStatus = 1;
export const pendingStatus = 3;
export const needMoreInfoStatus = 4;
export const approvedStatus = 5;
export const rejectedStatus = 6;
export const pendingEndStatus = 8;
export const moreInfoEndingStatus = 9;
export const approvedEndStatus = 10;
export const rejectedEndStatus = 11;
export const savedStatus = 13;
export const deletedStatus = 14;

export const saveNewFormStatus = 15
export const processingStatus = 16;
export const moreInfoFormStatus = 17;
export const approvedFormStatus = 18;
export const rejectedFormStatus = 19;

export const statusOfAddNewEmployee = "1,3,4,6"
export const statusOfApproval = "3,8"
export const statusOfApproved = "5,10"
export const statusOfManageEmployee = "5,8,9,11"
export const statusOfRelease = "10,13"

export const statusOfInfoIcon = [rejectedEndStatus, needMoreInfoStatus, rejectedStatus, moreInfoEndingStatus, savedStatus]
export const statusOfDetailIcon = [pendingStatus, pendingEndStatus, approvedStatus, approvedEndStatus, savedStatus]
export const statusOfEditIcon = [newStatus, saveNewFormStatus]
export const statusOfDeleteIcon = [newStatus, saveNewFormStatus]


export const pageDefault = 1;
export const pageSizeDefault = "10";
export const pageSizeOptionsDefault = ["5", "10", "20"];

export const statusSuccess = 200
export const statusResourceConflict = 409

export const messageSuccess = {
  sentTerminateRequest: 'Gửi yêu cầu chấm dứt thành công!',
  saveEmployee: 'Lưu thông tin nhân viên thành công!',
  updateEmployee: 'Cập nhật thông tin nhân viên thành công!',
  deleteEmployee: 'Xóa nhân viên thành công!',
  saveForm: 'Lưu thông tin hồ sơ thành công!',
  rejectProfile: 'Từ chối thành công!',
  approvalProfile: 'Phê duyệt thành công!',
  sentRequiredSupplement: 'Đã gửi yêu cầu bổ sung thành công!',
  sendLeader: 'Trình lãnh đạo thành công!',
  addIncreaseSalary: 'Thêm đề xuất tăng lương thành công!',
  updateIncreaseSalary: 'Cập nhật thông tin tăng lương thành công!',
  deleteIncreaseSalary: 'Xóa thông tin tăng lương thành công!',
  addPromote: 'Thêm đề xuất thăng chức thành công!',
  updatePromote: 'Cập nhật thông tin thăng chức thành công!',
  deletePromote: 'Xóa thông tin thăng chức thành công!',
  addProposalConsultation: 'Thêm đề xuất tham mưu thành công!',
  updateProposalConsultation: 'Cập nhật thông tin đề xuất tham mưu thành công!',
  deleteProposalConsultation: 'Xóa thông tin đề xuất tham mưu thành công!',
  saveProfile: "Lưu hồ sơ thành công!"
}
export const messageResourceConflict = "Thao tác thành công, xin reload lại trang!"
export const messageError = "Đã xảy ra lỗi, xin hãy thử lại!"
export const imageSizeExceedsLimit = "Kích thước ảnh vượt quá quy định"
export const approveConditionUncheckedErrorMessage = 'Bạn chưa tích chọn Đủ điều kiện phê duyệt'

export const endDateBeforeStartDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu"
export const endDateAfterCurrentDate = "Ngày kết thúc không được lớn hơn hiện tại"
export const startDateAfterEndDate = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc"
export const startDateAfterCurrentDate = "Ngày bắt đầu không được lớn hơn hiện tại"
export const citizenIdIssuanceDateAfterCurrentDate = "Ngày cấp không được lớn hơn hiện tại"

export const messageOfNoData = "Không có thông tin"

export const objStatus = {
  "1": "Lưu mới",
  // "2": "Chờ xử lý",
  "3": "Chờ xử lý",
  "4": "Yêu cầu bổ sung",
  "5": "Đã duyệt",
  "6": "Đã từ chối",
  "8": "Chờ duyệt kết thúc",
  "9": "Yêu cầu bổ sung đối với kết thúc",
  "10": "Đã duyệt kết thúc",
  "11": "Đã từ chối kết thúc",
  "13": "Đã lưu hồ sơ",
  "14": "Đã xóa",
  "15": "Lưu mới",
  "16": "Chờ duyệt",
  "17": "Yêu cầu bổ sung",
  "18": "Đã duyệt",
  "19": "Đã từ chối",
};

export const otherFeature = [
  {
    id: 1,
    name: "Back-End",
  },
  {
    id: 2,
    name: "Front-End",
  },
  {
    id: 3,
    name: "Design",
  },
];

export const Gender = [
  {
    value: "0",
    gender: "Nam",
  },
  {
    value: "1",
    gender: "Nữ",
  },
];

export const leader = [
  {
    name: "Nguyen Van A",
    position: "Giám Đốc",
  },
  {
    name: "Nguyen Van B",
    position: "Quản lí",
  },
  {
    name: "Nguyen Van C",
    position: "Nhân viên",
  },
];


export const formatDateView = (date) => {
  return moment(date).format("DD-MM-YYYY")
}

export const formatDateSend = (date) => {
  return moment(date).format("YYYY-MM-DD")
}

export const Container = styled("div")(({ theme }) => ({
  height: "100%",
  padding: "30px 30px 0",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "0px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
export const imageDefault = "data:image/png;base64,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"