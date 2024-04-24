import { useState } from "react";
import { getLoggedinUser } from "../helpers/api_helper";

const useProfile = () => {
  // Получение профиля пользователя
  const userProfileSession = getLoggedinUser();

  // Создание состояния для отслеживания загрузки данных
  const [loading] = useState(userProfileSession ? false : true);

  // Создание состояния для хранения профиля пользователя
  const [userProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  // Возвращение объекта с состояниями профиля пользователя и загрузки
  return { userProfile, loading };
};

export { useProfile };
