import $api from "../http";

export default class AnaliticsService {
  //получение данных аналитики
  static async fetchAnalitics() {
    return $api.get("/learning-courses/analytics");
  }
}
