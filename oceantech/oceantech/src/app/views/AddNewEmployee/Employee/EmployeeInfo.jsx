import React from "react";
import { Grid, TextField, MenuItem,  } from "@mui/material/";
import styled from "@emotion/styled";
import {  useSelector } from "react-redux";
import CustomAvatar from "app/components/Avatar/Avatar";


function EmployeeInfo(props) {
  const { formikRoot } = props;
  const otherFeature = useSelector((state) => state?.Employee?.otherFeature);
  const Gender = useSelector((state) => state?.Employee?.Gender);
  return (
    <>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item container xs={8} sx={{padding:"36px 0 30px"}}>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              sx={{ marginBottom: "20px" }}
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Tên nhân viên"
                  variant="outlined"
                  name="fullName"
                  value={formikRoot.values.fullName}
                  onChange={formikRoot.handleChange}
                  error={
                    formikRoot.errors.fullName && formikRoot.touched.fullName
                  }
                  helperText={formikRoot.touched.fullName && formikRoot.errors.fullName ? <div>{formikRoot.errors.fullName}</div> : null}
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Mã nhân viên"
                  variant="outlined"
                  value={formikRoot.values.code}
                  name="code"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.code && formikRoot.touched.code}
                  helperText={formikRoot.touched.code && formikRoot.errors.code ? <div>{formikRoot.errors.code}</div> : null}

                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              sx={{ marginBottom: "20px" }}
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  label="Ngày sinh"
                  variant="outlined"
                  name="dateOfBirth"
                  value={formikRoot.values.dateOfBirth || ""}
                  onChange={formikRoot.handleChange}
                  error={
                    formikRoot.errors.dateOfBirth &&
                    formikRoot.touched.dateOfBirth
                  }
                  helperText={formikRoot.touched.dateOfBirth && formikRoot.errors.dateOfBirth ? <div>{formikRoot.errors.dateOfBirth}</div> : null}

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Giới tính"
                  variant="outlined"
                  name="gender"
                  value={formikRoot.values.gender.toString() || ""}
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.gender && formikRoot.touched.gender}
                  helperText={formikRoot.touched.gender && formikRoot.errors.gender ? <div>{formikRoot.errors.gender}</div> : null}
                >
                  {Gender?.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.gender}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              sx={{ marginBottom: "20px" }}
            >
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={formikRoot.handleChange}
                  value={formikRoot.values.email}
                  error={formikRoot.errors.email && formikRoot.touched.email}
                  helperText={formikRoot.touched.email && formikRoot.errors.email ? <div>{formikRoot.errors.email}</div> : null}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  value={formikRoot.values.phone}
                  name="phone"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.phone && formikRoot.touched.phone}
                  helperText={formikRoot.touched.phone && formikRoot.errors.phone ? <div>{formikRoot.errors.phone}</div> : null}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              sx={{ marginBottom: "20px" }}
            >
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Nhóm"
                  variant="outlined"
                  value={formikRoot.values.teamId || ""}
                  name="teamId"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.teamId && formikRoot.touched.teamId}
                  helperText={formikRoot.touched.teamId && formikRoot.errors.teamId ? <div>{formikRoot.errors.teamId}</div> : null}
                >
                  {otherFeature.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Mã CCCD"
                  variant="outlined"
                  name="citizenId"
                  onChange={formikRoot.handleChange}
                  value={formikRoot.values.citizenId}
                  error={
                    formikRoot.errors.citizenId && formikRoot.touched.citizenId
                  }
                  helperText={formikRoot.touched.citizenId && formikRoot.errors.citizenId ? <div>{formikRoot.errors.citizenId}</div> : null}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={4}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Địa chỉ cụ thể"
                  variant="outlined"
                  value={formikRoot.values.address}
                  name="address"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.address && formikRoot.touched.address}
                  helperText={formikRoot.touched.address && formikRoot.errors.address ? <div>{formikRoot.errors.address}</div> : null}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={4} spacing={0} justifyContent={"center"}>
            <Grid item xs={12}>
              <CustomAvatar
                formikRoot={formikRoot}
                image={formikRoot.values.photoUrl}
                displayButton={""}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EmployeeInfo;
