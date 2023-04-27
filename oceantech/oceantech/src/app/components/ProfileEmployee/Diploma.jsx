import React from "react";
import { useSelector } from "react-redux";
import MaterialTable from "@material-table/core";
import { Tooltip, Icon, IconButton } from "@mui/material";
import moment from "moment";

const Diploma = React.forwardRef((props, ref) => {
  const { listDiploma } = props
  const employeeData = useSelector((state) => state.Employee.employeeData);
  // console.log("employeeData hahaa", employeeData)
  const columns = [
    { title: "Tên văn bằng", field: "name",
      headerStyle: {borderTopLeftRadius: "4px"},
    },
    {
      title: "Nội dung ",
      field: "content",
    },
    { title: "Nơi cấp", field: "educationalOrg" },
    {
      title: "Ngày cấp",
      field: "issuanceDate",
      render: (rowData) => moment(rowData?.issuanceDate).format("YYYY-MM-DD"),
    },
    { title: "Lĩnh Vực", field: "field", headerStyle: {borderTopRightRadius: "4px"} },
  ];

  return (
    <div ref={ref} style={{height: "500px", paddingLeft: "30px"}}>
      <MaterialTable
        title={""}
        data={!listDiploma ? [] : listDiploma}
        columns={columns}
        options={{
          paging:false,
          rowStyle: (rowData, index) => {
            return {
              backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
            };
          },
          headerStyle: {
            backgroundColor: "#262e49",
            color: "#fff",
          },
          maxBodyHeight: "1000px",
          minBodyHeight: "370px",

          padding: "default",
          toolbar: false,

        }}
        localization={{
            body: {
              emptyDataSourceMessage: "Không có thông tin",
            }
        }}
      />
    </div>
  );
});

export default Diploma;
