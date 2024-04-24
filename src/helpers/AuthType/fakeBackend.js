import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import accessToken from "../jwt-token-access/accessToken";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    phone: "79256358022",
  },
];

const fakeBackend = () => {
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_REGISTER).reply((config) => {
    const user = JSON.parse(config["data"]);
    users.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost(url.POST_FAKE_LOGIN).reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      (usr) => usr.phone === user.phone && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser.length === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([
            "Имя пользователя и пароль недействительны. Пожалуйста, введите правильное имя пользователя и пароль.",
          ]);
        }
      });
    });
  });

  mock.onPost("/fake-forget-pwd").reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check your email and reset your password."]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply((config) => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      (usr) => usr.phone === user.phone && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser.length === 1) {
          const token = accessToken;
          const tokenObj = { accessToken: token };
          const validUserObj = { ...validUser[0], ...tokenObj };
          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/jwt-forget-pwd").reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check your email and reset your password."]);
      });
    });
  });
};

export default fakeBackend;
