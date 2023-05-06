import Pagination from '@mui/material/Pagination';
import { Grid } from "semantic-ui-react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

function PaginationCustom({ onHandleChange }) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState("10")

  const totalData = useSelector((state) => state?.Employee?.total);
  const [total, setTotal] = useState(Math.ceil(totalData / pageSize))

  useEffect(() => {
    setTotal(Math.ceil(totalData / pageSize))
  }, [totalData])

  // useEffect(() => {
  //   setTotal(Math.ceil(totalData/pageSize))
  //   onHandleChange(page, pageSize)
  // }, [page, pageSize])

  useEffect(() => {
    setTotal(Math.ceil(totalData / pageSize))
    onHandleChange(page, pageSize)
  }, [page])

  useEffect(() => {
    setPage(1)
    onHandleChange(page, pageSize)
    setTotal(Math.ceil(totalData / pageSize))
  }, [pageSize])

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px 8px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: 8 }}>Số bản ghi/trang</p>
        <Autocomplete
          disablePortal
          disableClearable={true}
          // id="combo-box-demo"
          options={["5", "10", "20"]}
          onChange={(event, newValue) => {
            event.preventDefault();
            setPageSize(newValue)
          }}
          value={pageSize}
          getOptionLabel={(option) => option ? option : ""}
          sx={{
            width: 60,
            '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
              paddingBottom: "2px",
              paddingTop: "2px"
            },
          }}

          size="small"
          renderInput={(params) => <TextField {...params} label="" size="small" value={pageSize} />}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: 16 }}>{`Tổng bản ghi: ${totalData}`}</p>
        <Pagination
          shape="rounded"
          variant="outlined"
          showFirstButton
          showLastButton
          count={total}
          page={page}
          onChange={(e, value) => {
            setPage(value)
          }}
        />
      </div>
    </div>
  )


}


export default PaginationCustom