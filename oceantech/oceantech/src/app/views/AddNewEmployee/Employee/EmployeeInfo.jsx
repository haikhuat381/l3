import React from "react";
import { Grid, Box, TextField, MenuItem, Card } from "@mui/material/";
import styled from "@emotion/styled";
import { Paragraph } from "app/components/Typography";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "app/components/Avatar/Avatar";
function EmployeeInfo(props) {
  const { formikRoot } = props;
  const otherFeature = useSelector((state) => state?.Employee?.otherFeature);
  const Gender = useSelector((state) => state?.Employee?.Gender);
  
  return (
    <>
      <Grid container spacing={8}>
        <Grid item container xs={12} spacing={8}>
          <Grid item container xs={9}>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              style={{ marginBottom: "20px" }}
            >
              <Grid item xs={4}>
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
                  helperText={formikRoot.errors.fullName}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Mã nhân viên"
                  variant="outlined"
                  value={formikRoot.values.code}
                  name="code"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.code && formikRoot.touched.code}
                  helperText={formikRoot.errors.code}
                />
              </Grid>
              <Grid item xs={4}>
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
                  helperText={formikRoot.errors.gender}
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
              style={{ marginBottom: "20px" }}
            >
              <Grid item xs={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={formikRoot.handleChange}
                  value={formikRoot.values.email}
                  error={formikRoot.errors.email && formikRoot.touched.email}
                  helperText={formikRoot.errors.email}
                />
              </Grid>
              <Grid item xs={4}>
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
                  helperText={formikRoot.errors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  value={formikRoot.values.phone}
                  name="phone"
                  onChange={formikRoot.handleChange}
                  error={formikRoot.errors.phone && formikRoot.touched.phone}
                  helperText={formikRoot.errors.phone}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              style={{ marginBottom: "20px" }}
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
                  helperText={formikRoot.errors.teamId}
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
                  helperText={formikRoot.errors.citizenId}
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
                  helperText={formikRoot.errors.address}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={3}>
            <Grid item xs={12} cx={{ mt: -5 }}>
              <CustomAvatar
                formikRoot={formikRoot}
                image={formikRoot.values.image}
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
