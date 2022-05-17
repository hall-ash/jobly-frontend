/**
 * A list of job cards. 
 */

import React, { useContext } from 'react';
import JobCard from '../jobs/JobCard';
import { CardColumns } from "reactstrap";
import JoblyApi from '../api';
import AuthContext from '../auth/AuthContext';

const JobList = ({ jobs }) => {

  const { user, updateUserInfo } = useContext(AuthContext);

  // applies user for job
  const apply = async (evt) => {
    try {
      // when applied, disable button and change text to 'Applied'
      evt.target.disabled = true; 
      evt.target.innerText = 'Applied';
      const jobId = evt.target.getAttribute("data-jobid"); // get job id from card html

      // send application request to api
      // if successful returns job id
      const id = await JoblyApi.applyForJob(user.username, jobId);

      // add job id to user's job application list
      // user.applications = [...user.applications, id];
      const applications = [...user.applications, id];
      updateUserInfo({ applications });

    } catch (e) {
      console.log('Apply err', e);
    }
   
  }

  const jobCards = jobs.map(({ id, title, salary, equity, companyName, hasApplied }) => {
    return <JobCard key={`${id}-${title}-${companyName}`}
                    id={id}
                    title={title}
                    salary={salary}
                    equity={equity}
                    companyName={companyName}
                    hasApplied={hasApplied}
                    handleClick={apply} /> 
  });

  return (
    <div>
      <CardColumns>
        {jobCards}
      </CardColumns>
    </div>
  );
};

export default JobList;