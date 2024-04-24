import React from "react";
import { Col, Row, Card, CardBody, CardTitle } from "reactstrap";
import HandleEvents from "../ui/HandleEvents";

const PersonTable = ({ selectuser, analyticsData, name, buttonClick }) => {
  // Проверяем, существует ли analyticsData и его необходимые поля
  const courses =
    analyticsData && analyticsData.data && analyticsData.data.courses
      ? analyticsData.data.courses.find((course) => course.name == name) || {}
      : {};

  // Проверяем, существует ли selectuser и его поле topics_result
  const dataResult =
    selectuser && selectuser.topics_result
      ? [
          ...selectuser.topics_result.filter(
            (result) => result.course_id == courses.id
          ),
        ]
      : [];

  // Функция для обработки клика на кнопку "Подробнее"
  const handleButtonClick = (courseId, topicId) => {
    // Вызываем функцию togglePopup и передаем ей topicId
    buttonClick(courseId, topicId);
  };

  return (
    <table className="table mb-0">
      <thead>
        <tr>
          <th className="text-center ">{name}</th>
          <th className="text-center">Просмотр</th>
          <th className="text-center">Выполнен</th>
          <th className="text-center">Действия</th>
        </tr>
      </thead>
      <tbody>
        {dataResult.map((item, index) => (
          <tr key={index} className="">
            <td className="text-center align-middle py-3">
              {/* Добавляем проверку на существование courses и его поля topics */}
              {courses && courses.topics
                ? courses.topics.find((topic) => topic.id === item.topic_id)
                    ?.name || null
                : null}
            </td>
            <td className="text-center py-3">
              <HandleEvents data={item.readed} />
            </td>
            <td className="text-center py-3">
              <HandleEvents data={item.completed} />
            </td>
            <td className="text-center ">
              <button
                onClick={() => handleButtonClick(courses.id, item.topic_id)}
                type="button"
                className="btn btn-outline-secondary waves-effect waves-light mt-2"
              >
                Подробнее
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonTable;
