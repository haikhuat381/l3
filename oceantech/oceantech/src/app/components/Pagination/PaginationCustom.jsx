import Pagination from '@mui/material/Pagination';
import { Grid } from "semantic-ui-react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';


function PaginationCustom({ onHandleChange }) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    onHandleChange(page, pageSize)
  }, [page, pageSize])

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{marginRight:8}}>Số bản ghi</p>
        <Autocomplete
          disablePortal
          disableClearable={true}
          id="combo-box-demo"
          options={[5, 10, 20]}
          onChange={(event, newValue) => {
            event.preventDefault();
            setPageSize(newValue)
          }}
          value={pageSize}
          getOptionLabel={(option) => option ? option : null}
          sx={{ width: 60}}
          // style={{paddingTop: 0, paddingBottom:0}}
          
          size="small"
          renderInput={(params) => <TextField {...params} label="" className='haikhuat' size="small" value={pageSize} />}
        />
      </div>
      <Pagination shape="rounded" variant="outlined" showFirstButton showLastButton count={10} page={page} onChange={(e, value) => { setPage(value) }} />
    </div>
  )


}


export default PaginationCustom