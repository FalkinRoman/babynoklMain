import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import logolight from "../../assets/images/logo-light.png"; // Импорт изображения для светлого логотипа
import logodark from "../../assets/images/logo-dark.png"; // Импорт изображения для тёмного логотипа
import OTPInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  FormFeedback,
  Label,
} from "reactstrap";

// Валидационная схема для телефонного номера
const phoneValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Обязательное поле")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Некорректный номер телефона"
    )
    .min(11, "Номер должен содержать не менее 8 символов"),
});

// Валидационная схема для OTP
const OTPValidationSchema = Yup.object().shape({
  OTP: Yup.string()
    .required("Обязательное поле")
    .matches(/^\d{4}$/, "Код из смс должен состоять из 4 цифр"),
});

const LoginMobile = (props) => {
  // Состояние для хранения значения кода из СМС
  const [OTP, setOTP] = useState("");
  // Состояние для телефона
  const [phone, setPhone] = useState("");
  // Состояние для отслеживания загрузки
  const [isLoading, setIsLoading] = useState(false);
  // Состояние для таймера
  const [timer, setTimer] = useState(30);
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let interval;
    if (timer > 0 && timer <= 30) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // Функция для отправки телефона на сервер
  const handleSubmitPhone = (values, { setSubmitting }) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowOTP(true);
      setTimer(30);
    }, 3000);
  };

  // Функция для отправки запроса на подтверждение OTP
  const handleSubmitOTP = (values, { setSubmitting }) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowOTP(false);
    }, 3000);
  };

  // Функция для отправки запроса на получение нового кода
  const handleResendOTP = () => {
    setTimer(30);
  };

  return (
    <React.Fragment>
      <div className=""></div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xl={4}>
              <Card>
                <CardBody className="p-4">
                  {showOTP ? (
                    <Formik
                      initialValues={{ OTP: "" }}
                      validationSchema={OTPValidationSchema}
                      onSubmit={handleSubmitOTP}
                    >
                      {({ errors, touched, isSubmitting, setFieldValue }) => (
                        <Form>
                          <div className="text-center">
                            <img
                              src={logodark}
                              alt=""
                              height="24"
                              className="auth-logo logo-dark mx-auto"
                            />
                            <img
                              src={logolight}
                              alt=""
                              height="24"
                              className="auth-logo logo-light mx-auto"
                            />
                          </div>
                          <h4 className="font-size-18 text-muted mt-2 text-center">
                            Добро пожаловать обратно!
                          </h4>
                          <p className="mb-5 text-center">
                            Войдите, чтобы продолжить на Бебинокль.
                          </p>

                          <Field
                            name="OTP"
                            render={({ field }) => (
                              <div className="mb-4 d-flex flex-column align-items-center">
                                <Label className="form-label">Код из смс</Label>
                                <div className="d-flex justify-content-around">
                                  <OTPInput
                                    value={field.value}
                                    onChange={(value) =>
                                      setFieldValue("OTP", value)
                                    }
                                    autoFocus={showOTP}
                                    OTPLength={4}
                                    otpType="number"
                                    disabled={false}
                                    className="opt-container"
                                  />
                                </div>
                              </div>
                            )}
                          />
                          <ErrorMessage
                            name="OTP"
                            component="div"
                            className="text-danger"
                          />
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light d-flex justify-content-center"
                              type="submit"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="spinner-container">
                                  <div className="spinner"></div>
                                </div>
                              ) : (
                                <span>Отправить</span>
                              )}
                            </button>
                            <div className="text-center mt-4">
                              {timer === 0 && (
                                <span
                                  className="text-danger"
                                  onClick={handleResendOTP}
                                  style={{ cursor: "pointer" }}
                                >
                                  Получить новый код
                                </span>
                              )}
                              {timer > 0 && (
                                <span className="ms-2 myColor">
                                  <span className="">
                                    Получить новый код можно через{" "}
                                  </span>
                                  {`00:${timer < 10 ? `0${timer}` : timer}`}
                                </span>
                              )}
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <Formik
                      initialValues={{ phone: "" }}
                      validationSchema={phoneValidationSchema}
                      onSubmit={handleSubmitPhone}
                    >
                      {({ errors, touched, isSubmitting, setFieldValue }) => (
                        <Form>
                          <div className="text-center">
                            <img
                              src={logodark}
                              alt=""
                              height="24"
                              className="auth-logo logo-dark mx-auto"
                            />
                            <img
                              src={logolight}
                              alt=""
                              height="24"
                              className="auth-logo logo-light mx-auto"
                            />
                          </div>
                          <h4 className="font-size-18 text-muted mt-2 text-center">
                            Добро пожаловать обратно!
                          </h4>
                          <p className="mb-5 text-center">
                            Войдите, чтобы продолжить на Бебинокль.
                          </p>

                          <Field
                            name="phone"
                            render={({ field }) => (
                              <div className="mb-4 ">
                                <div className="d-flex flex-column align-items-center">
                                  <Label className="form-label ">Телефон</Label>
                                </div>
                                <div className="">
                                  <PhoneInput
                                    autoFocus
                                    country={"ru"}
                                    value={field.value}
                                    onChange={(value) =>
                                      setFieldValue("phone", value)
                                    }
                                    placeholder="+7(999)999-99-99"
                                  />
                                </div>
                              </div>
                            )}
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-danger"
                          />
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light d-flex justify-content-center"
                              type="submit"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="spinner-container">
                                  <div className="spinner"></div>
                                </div>
                              ) : (
                                <span>Отправить</span>
                              )}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default LoginMobile;
