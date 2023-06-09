import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField, Button } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  maxHeight: "1080px",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.12)",

}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100% !important",
  height: '100vh',
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 200,
    marginBottom: 200,
  },
}));

// inital login credentials
const initialValues = {
  userName: "",
  password: "",
  remember: true,
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Vui lòng nhập mật khẩu!"),
  userName: Yup.string().required("Vui lòng nhập tài khoản!"),
});

const JwtLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      await login(values.userName, values.password);
      navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container sx={{ width: 800, height: 400 }}>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={2} mt={"-40px"} height="100%" sx={{ minWidth: 320, maxHeigh: 1080 }}>
              <img
                src='https://storage.googleapis.com/hust-files/images/logo_daiduong_16.4k.jpg'
                width="100%"
                alt=""
              />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      name="userName"
                      label="Tài khoản"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.userName}
                      onChange={handleChange}
                      helperText={touched.userName && errors.userName}
                      error={Boolean(errors.userName && touched.userName)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Mật khẩu"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Ghi nhớ</Paragraph>
                      </FlexBox>

                      <NavLink to="/session/forgot-password">
                        Quên mật khẩu?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2, display: 'flex', alignItems: "center" }}
                    >
                      <Button sx={{ color: "#fff", alignItems: 'center', }}> Đăng nhập</Button>


                    </LoadingButton>


                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
