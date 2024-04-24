import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { createSelector } from "reselect";

// import images
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";

const Register = (props) => {
  document.title =
    "Регистрация | Upzet - Шаблон администратора и панели управления React";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(
        "Пожалуйста, введите свой адрес электронной почты"
      ),
      username: Yup.string().required(
        "Пожалуйста, введите свое имя пользователя"
      ),
      password: Yup.string().required("Пожалуйста, введите свой пароль"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const registerpage = createSelector(
    (state) => state.account,
    (state) => ({
      user: state.user,
      registrationError: state.registrationError,
    })
  );
  // Inside your component
  const { user, registrationError } = useSelector(registerpage);

  // handleValidSubmit
  // const handleValidSubmit = values => {
  //   dispatch(registerUser(values));
  // };

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  return (
    <div className="bg-pattern" style={{ height: "100vh" }}>
      <div className="bg-overlay"></div>
      <div className="account-pages pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xl={4}>
              <Card className="mt-5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <Link to="/" className="">
                      <h2
                        className="mt-3"
                        style={{ color: "rgb(17, 179, 152)" }}
                      >
                        Babynokl
                      </h2>
                    </Link>
                  </div>

                  <p className="text-muted text-center mb-4">
                    Создайте учетную запись на Бебинокль.
                  </p>
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {user && user ? (
                      <Alert color="success">
                        Пользователь успешно зарегистрирован
                      </Alert>
                    ) : null}

                    {registrationError && registrationError ? (
                      <Alert color="danger">
                        <div>{registrationError}</div>
                      </Alert>
                    ) : null}

                    <Row>
                      <Col md={12}>
                        <div className="mb-4">
                          <Label className="form-label">
                            Адрес электронной почты
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Введите адрес электронной почты"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Имя пользователя</Label>
                          <Input
                            name="username"
                            type="text"
                            placeholder="Введите имя пользователя"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.username}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <Label className="form-label">Пароль</Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Введите пароль"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="term-conditionCheck"
                          />
                          <label
                            className="form-check-label fw-normal"
                            htmlFor="term-conditionCheck"
                          >
                            Я принимаю{" "}
                            <Link to="#" className="text-primary">
                              Условия использования
                            </Link>
                          </label>
                        </div>
                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                          >
                            Зарегистрироваться
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p className="text-white-50">
                  Уже есть аккаунт?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    {" "}
                    Войти{" "}
                  </Link>{" "}
                </p>
                <p className="text-white-50">
                  © {new Date().getFullYear()} Бебинокль{" "}
                  <i className="mdi mdi-heart text-danger"></i>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Register;
