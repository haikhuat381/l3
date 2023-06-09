import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material/";
import CustomAvatar from "app/components/Avatar/Avatar";
import { otherFeature, Gender } from "app/constant";

function EmployeeInfo(props) {
  const { formikRoot, onChangeInput } = props;

  const shouldDisplayError = (formikRoot, fieldName) => {
    return formikRoot.touched[fieldName] && formikRoot.errors[fieldName];
  }

  const handleInputChange = (event) => {
    formikRoot.handleChange(event);
    onChangeInput()
  };

  return (
    <>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item container xs={8} className="employee-info-container">
            <Grid
              item
              container
              xs={12}
              spacing={4}

              className="employee-info-item"
            >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Tên nhân viên"
                  variant="outlined"
                  name="fullName"
                  value={formikRoot.values.fullName}
                  onChange={handleInputChange}
                  error={shouldDisplayError(formikRoot, 'fullName')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'fullName')) ? (
                      <div>{formikRoot.errors.fullName}</div>
                    ) : null
                  }
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
                  onChange={handleInputChange}
                  error={shouldDisplayError(formikRoot, 'code')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'code')) ? (
                      <div>{formikRoot.errors.code}</div>
                    ) : null
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              className="employee-info-item"
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
                  onChange={handleInputChange}
                  error={shouldDisplayError(formikRoot, 'dateOfBirth')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'dateOfBirth')) ? (
                      <div>{formikRoot.errors.dateOfBirth}</div>
                    ) : null
                  }
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
                  onChange={handleInputChange}
                  error={shouldDisplayError(formikRoot, 'gender')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'gender')) ? (
                      <div>{formikRoot.errors.gender}</div>
                    ) : null
                  }
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
              className="employee-info-item"
            >
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={handleInputChange}
                  value={formikRoot.values.email}
                  error={shouldDisplayError(formikRoot, 'email')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'email')) ? (
                      <div>{formikRoot.errors.email}</div>
                    ) : null
                  }
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
                  onChange={handleInputChange}
                  error={shouldDisplayError(formikRoot, 'phone')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'phone')) ? (
                      <div>{formikRoot.errors.phone}</div>
                    ) : null
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={4}
              className="employee-info-item"
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
                  onChange={handleInputChange}
                  error={shouldDisplayError(formikRoot, 'teamId')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'teamId')) ? (
                      <div>{formikRoot.errors.teamId}</div>
                    ) : null
                  }
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
                  label="Số CCCD/CMT"
                  variant="outlined"
                  name="citizenId"
                  onChange={handleInputChange}
                  value={formikRoot.values.citizenId}
                  error={shouldDisplayError(formikRoot, 'citizenId')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'citizenId')) ? (
                      <div>{formikRoot.errors.citizenId}</div>
                    ) : null
                  }
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
                  onChange={handleInputChange}
                  error={shouldDisplayError(formikRoot, 'address')}
                  helperText={
                    (shouldDisplayError(formikRoot, 'address')) ? (
                      <div>{formikRoot.errors.address}</div>
                    ) : null
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={4} spacing={0} justifyContent={"center"}>
            <Grid item xs={10}>
              <CustomAvatar
                formikRoot={formikRoot}
                image={formikRoot.values.photoUrl}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EmployeeInfo;
