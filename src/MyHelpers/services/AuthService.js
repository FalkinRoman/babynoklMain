import $api from "../http";

export default class AuthService {
  static async login(phone, password) {
    return $api.post("/auth/login", { phone, password });
  }

  static async logout() {
    // return $api.post("/logout");
    return $api.delete("/auth/session");
  }
}
