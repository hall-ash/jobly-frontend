/**
 * Displays a card containing the job's title, salary, equity,
 * and a button to apply for the job.
 * If the user has already applied for the job, the
 * button will be disabled and its text will be 'applied'.
 * Else the button will be active and its text will be 'apply'.
 */
import React from 'react';
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import NumberFormat from 'react-number-format';
import './JobCard.css';

const JobCard = ({ id, title, salary, equity, companyName, hasApplied=false, handleClick }) => {

  const formattedSalary = <NumberFormat value={salary} 
                                        type="text"
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        prefix='$' />;
  return (
    <section className="JobCard mb-3">
      <Card >
        <CardBody >
          <CardTitle className="job-title">
            {title}
          </CardTitle>
          <CardText className="company-name">{companyName}</CardText>
          <p>Salary: {formattedSalary}</p>
          <p>Equity: {(!equity) ? 0 : equity}
            <Button data-jobid={id} 
                    className="app-btn" 
                    disabled={hasApplied}
                    onClick={handleClick}>
              {hasApplied ? 'Applied' : 'Apply'}
            </Button>
          </p>
        </CardBody>
      </Card>
    </section>
  );
};

export default JobCard;