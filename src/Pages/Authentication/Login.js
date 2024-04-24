import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import PhoneInput from "react-phone-input-2";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { useSelector, useDispatch } from "react-redux";
import { myAuth_loginUser } from "../../store/myAuth/login/actions";
import { createSelector } from "reselect";
import * as Yup from "yup";
import { Formik } from "formik";

const Login = (props) => {
  document.title = "Войти | Бебинокль";

  const dispatch = useDispatch();

  const loginpage = createSelector(
    (state) => state.myLogin,
    (state) => ({
      error: state.error,
      loading: state.loading,
    })
  );

  const { error, loading } = useSelector(loginpage);

  useEffect(() => {
    document.body.className = "bg-pattern";
    return () => {
      document.body.className = "";
    };
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <React.Fragment>
      <div className=""></div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xl={4}>
              <Card
                className=" p-3 "
                style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
              >
                <CardBody className="p-4">
                  <div>
                    <div className="text-center">
                      <Link to="/">
                        <img
                          src={logodark}
                          alt=""
                          height="120"
                          className="auth-logo logo-dark mx-auto"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="24"
                          className="auth-logo logo-light mx-auto"
                        />
                      </Link>
                    </div>
                    <h4 className="font-size-18 text-muted mt-2 text-center ">
                      Приложение к детскому саду
                    </h4>
                    <div className=" mt-4  "></div>

                    <Formik
                      initialValues={{ phone: "", password: "" }}
                      validationSchema={Yup.object({
                        phone: Yup.string()
                          .required("Обязательное поле")
                          .matches(
                            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                            "Некорректный номер телефона"
                          )
                          .min(11, "Номер должен содержать не менее 11 цифр"),
                        password: Yup.string().required(
                          "Пожалуйста, введите свой пароль"
                        ),
                      })}
                      onSubmit={(values) => {
                        const modifiedPhone = values.phone.slice(1);
                        const modifiedValues = {
                          ...values,
                          phone: modifiedPhone,
                        };

                        dispatch(
                          myAuth_loginUser(
                            modifiedValues,
                            props.router.navigate
                          )
                        );
                      }}
                    >
                      {(formikProps) => (
                        <Form
                          className="form-horizontal "
                          onSubmit={formikProps.handleSubmit}
                        >
                          {error && (
                            <Alert color="danger">
                              {error ===
                              "Request failed with status code 401" ? (
                                <div>
                                  Пользователь не найден, проверьте логин или
                                  пароль
                                </div>
                              ) : (
                                <div>
                                  {error.data &&
                                  typeof error.data !== "undefined"
                                    ? error.data.toString()
                                    : "Пользователь не найден, проверьте логин или пароль"}
                                </div>
                              )}
                            </Alert>
                          )}

                          <Row>
                            <Col md={12}>
                              <div className="mb-4">
                                <Label className="form-label">
                                  Номер телефона
                                </Label>
                                <PhoneInput
                                  id="phone"
                                  name="phone"
                                  value={formikProps.values.phone}
                                  type="tel"
                                  placeholder="Введите номер телефона"
                                  autoFocus
                                  country={"ru"}
                                  onChange={(value) => {
                                    formikProps.setFieldValue("phone", value);
                                  }}
                                  onBlur={formikProps.handleBlur}
                                  className={
                                    formikProps.touched.phone &&
                                    formikProps.errors.phone
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {formikProps.touched.phone &&
                                formikProps.errors.phone ? (
                                  <div className="invalid-feedback">
                                    {formikProps.errors.phone}
                                  </div>
                                ) : null}
                              </div>
                              <div className="mb-4">
                                <Label className="form-label">Пароль</Label>
                                <div className="input-group">
                                  <Input
                                    className="myColor2"
                                    name="password"
                                    value={formikProps.values.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Введите пароль"
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                    invalid={
                                      formikProps.touched.password &&
                                      formikProps.errors.password
                                    }
                                  />
                                </div>
                                {formikProps.touched.password &&
                                formikProps.errors.password ? (
                                  <FormFeedback type="invalid">
                                    {formikProps.errors.password}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <Row>
                                <Col>
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="showPassword"
                                      onChange={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    />
                                    <label
                                      className="form-label form-check-label"
                                      htmlFor="customControlInline"
                                      style={{ fontWeight: 400 }}
                                    >
                                      Показать пароль
                                    </label>
                                  </div>
                                </Col>
                              </Row>

                              <div className="d-grid mt-4">
                                <button
                                  className="btn btn-primary waves-effect waves-light d-flex justify-content-center"
                                  type="submit"
                                  disabled={loading}
                                >
                                  {loading ? (
                                    <div className="spinner-container">
                                      <div className="spinner"></div>
                                    </div>
                                  ) : (
                                    <span>Отправить</span>
                                  )}
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
