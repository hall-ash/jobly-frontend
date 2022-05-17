/**
 * Displays a card containing the companies name, description, and logo.
 */
import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import { useHistory } from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  const history = useHistory();

  // go to company details page
  const goToDetails = evt => {
    history.push(`/companies/${handle}`);
  }

  return (
    <section onClick={goToDetails} className="CompanyCard mb-3">
      <Card >
        <CardBody>
          <CardImg className="company-logo" alt="company logo" src={logoUrl} />
          <CardTitle className="company-name">
            {name}
          </CardTitle>
          <CardText>
            {description}
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
};

export default CompanyCard;