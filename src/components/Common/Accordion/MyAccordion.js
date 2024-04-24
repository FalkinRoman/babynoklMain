import React, { useState } from "react";
import { Card, CardBody, Collapse } from "reactstrap";
import classnames from "classnames";
import AccordionTable from "../table/accordionTable";

function MyAccordion({ data, currentPage, itemsPerPage }) {
  const [activeTabs, setActiveTabs] = useState(
    // Создаем массив с начальными значениями состояния, где первый элемент true, а остальные false
    Array(data.length)
      .fill(false)
      .map((value, index) => index === 0)
  );

  const toggleAccordion = (index) => {
    const newActiveTabs = [...activeTabs];
    newActiveTabs[index] = !newActiveTabs[index];
    setActiveTabs(newActiveTabs);
  };

  return (
    <React.Fragment>
      {data
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item, index) => (
          <Card key={index} className="mb-3">
            <CardBody>
              <div className="accordion" id={`accordion-${index}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${index}`}>
                    <button
                      className={classnames("accordion-button", "fw-medium", {
                        collapsed: !activeTabs[index],
                      })}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </button>
                  </h2>

                  <Collapse
                    isOpen={activeTabs[index]}
                    className="accordion-collapse"
                  >
                    <div className="accordion-body">
                      <AccordionTable data={item.users} />
                    </div>
                  </Collapse>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
    </React.Fragment>
  );
}

export default MyAccordion;
