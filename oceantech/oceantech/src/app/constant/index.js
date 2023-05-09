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

export const pageSizeDefault= "10"
export const pageSizeOptionsDefault= ["5", "10", "20"]
export const statusSuccess = 200
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
}

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
]

export const Gender = [
    {
        value: "0",
        gender: "Nam",
    },
    {
        value: "1",
        gender: "Nữ",
    },
]

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
  ]
