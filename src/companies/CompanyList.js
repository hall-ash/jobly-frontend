/**
 * List of company cards.
 */

import React from 'react';
import { CardColumns } from "reactstrap";
import CompanyCard from './CompanyCard';
import sampleJobLogo from './logo.svg';

const CompanyList = ({ companies }) => {

  const companyCards = companies.map(({ handle, name, description }) => {
    return <CompanyCard key={`${handle}-${name}`}
                        handle={handle}
                        name={name}
                        description={description}
                        logoUrl={sampleJobLogo} /> // use sample logo for all companies
                        // logoUrl={logoUrl} />
  });

  return (
    <div>
      <CardColumns>
        {companyCards}
      </CardColumns>
    </div>
   
  );
};

export default CompanyList;