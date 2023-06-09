import {
  styled,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import RegisterDocument from "./RegisterDocument";
import SalaryIncrease from "./SalaryIncrease";
import ProposeAdvisory from "./ProposeAdvisory";
import Promote from "./Promote";

function UpdateOptions({ EmployeeId }) {
  const accordion1Ref = useRef(null);
  const accordion2Ref = useRef(null);
  const accordion3Ref = useRef(null);
  const accordion4Ref = useRef(null);
  const MyAccordionSummary = styled(AccordionSummary)({
    background: "rgba(34,42,69, 0.9)",
    height: 64,
    borderRadius: "4px",
    color: "#fff",
    "& .icon": {
      color: "#fff",
    },
  });

  const [expanded, setExpanded] = useState({
    panel1: false,
    panel2: false,
    panel3: false,
    panel4: false,
  });

  const handleChange = (panel, accordionRef) => (event, isExpanded) => {
    const newExpanded = { ...expanded };
    newExpanded[panel] = isExpanded ? panel : false;
    setExpanded(newExpanded);
    accordionRef.current.scrollIntoView();
  };

  const handleClose = (panel) => {
    const newExpanded = { ...expanded };
    newExpanded[panel] = false;
    setExpanded(newExpanded);
  };

  return (
    <div>
      <Grid container xs={12} spacing={2} pl={5}>
        <Grid item xs={12} md={12} >
          <Accordion
            ref={accordion1Ref}
            expanded={expanded.panel1 === "panel1"}
            onChange={handleChange("panel1", accordion1Ref)}

          >
            <MyAccordionSummary
              className="update-option"
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"


            >
              <Typography fontSize={22}  >Đăng kí hồ sơ</Typography>
            </MyAccordionSummary>
            <AccordionDetails className="accordion-detail">
              <RegisterDocument
                handleClose={() => {
                  handleClose("panel1");
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            ref={accordion2Ref}
            expanded={expanded.panel2 === "panel2"}
            onChange={handleChange("panel2", accordion2Ref)}
          >
            <MyAccordionSummary
              className="update-option"
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ height: 10 }}
            >
              <Typography fontSize={22} >Tăng lương</Typography>
            </MyAccordionSummary>
            <AccordionDetails className="accordion-detail">
              <SalaryIncrease
                handleClose={() => {
                  handleClose("panel2");
                }}
                idRegister={EmployeeId}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            ref={accordion3Ref}
            expanded={expanded.panel3 === "panel3"}
            onChange={handleChange("panel3", accordion3Ref)}
          >
            <MyAccordionSummary
              className="update-option"
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ height: 10 }}
            >
              <Typography fontSize={22} >Thăng chức</Typography>
            </MyAccordionSummary >
            <AccordionDetails className="accordion-detail">
              <Promote
                handleClose={() => {
                  handleClose("panel3");
                }}
                idRegister={EmployeeId}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            ref={accordion4Ref}
            expanded={expanded.panel4 === "panel4"}
            onChange={handleChange("panel4", accordion4Ref)}
          >
            <MyAccordionSummary
              className="update-option"
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ height: 10 }}
            >
              <Typography fontSize={22} >Đề xuất tham mưu</Typography>
            </MyAccordionSummary>
            <AccordionDetails className="accordion-detail">
              <ProposeAdvisory
                handleClose={() => {
                  handleClose("panel4");
                }}
                idRegister={EmployeeId}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}

export default UpdateOptions;
