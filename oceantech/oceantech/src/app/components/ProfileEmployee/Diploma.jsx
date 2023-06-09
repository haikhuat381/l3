import React from "react";
import MaterialTable from "@material-table/core";
import { formatDateView, messageOfNoData } from "app/constant";

const Diploma = React.forwardRef((props, ref) => {
  const { listDiploma } = props
  
  const columns = [
    {
      title: "STT",
      width:50,
      headerStyle: {borderTopLeftRadius: "4px"},
      render: (rowData) => rowData.tableData.index + 1
    },
    { title: "Tên văn bằng", field: "name",
    },
    {
      title: "Nội dung ",
      field: "content",
    },
    { title: "Nơi cấp", field: "educationalOrg" },
    {
      title: "Ngày cấp",
      field: "issuanceDate",
      render: (rowData) => formatDateView(rowData?.issuanceDate),
    },
    { title: "Lĩnh Vực", field: "field", headerStyle: {borderTopRightRadius: "4px"} },
  ];

  return (
    <div ref={ref} className="container-diploma box-table-first-column">
      <MaterialTable
              title={""}
              data={!listDiploma ? [] : listDiploma}
              columns={columns}
              style={{
                boxShadow: "none",
                fontFamily: "Times New Roman",
              }}
              sorting={false}
              options={{
                sorting: false,
                filtering: false,
                paging: false,
                pageSize: 15,
                pageSizeOptions: [5, 10, 15, 20],
                cellStyle: { border: "1px solid black" },
                headerStyle: {
                  pointerEvents: "none",
                  border: "1px solid black",
                  fontWeight: "600",
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
  );
});

export default Diploma;
