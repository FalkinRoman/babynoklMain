import React from "react";
import { Col, Row, Card, CardBody, CardTitle } from "reactstrap";
import ProgressbarSmall from "../Progressbar/ProgressbarSmall";
import { useNavigate, useParams } from "react-router-dom";

const AccordionTable = ({ data }) => {
  const router = useNavigate();
  const params = useParams();

  return (
    <div className="tablee-responsiv">
      <Col lg={12}>
        <table className="table mb-0">
          <thead>
            <tr>
              <th className="text-center">Пользователь</th>
              <th className="text-center">Адаптация</th>
              <th className="text-center">Базовый</th>
              <th className="text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((person, index) => (
                <tr key={index}>
                  <td className="text-center">{person.name || "none"}</td>
                  <td className="text-center">
                    <ProgressbarSmall series={person.courses_result[0].value} />
                  </td>
                  <td className="text-center">
                    <ProgressbarSmall series={person.courses_result[1].value} />
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        router(
                          `/analytics/${params.id}/${params.class}/${person.name}`
                        )
                      }
                      type="button"
                      className="btn btn-outline-secondary waves-effect waves-light "
                    >
                      Подробнее
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Col>
    </div>
  );
};

export default AccordionTable;
