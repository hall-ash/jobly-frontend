/**
 * Displays a search bar and a list of jobs. 
 */
import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../common/SearchBar';
import JoblyApi from '../api';
import Loading from '../common/Loading';
import AuthContext from '../auth/AuthContext';
import JobList from './JobList';

const JobsPage = () => {
  const [submittedQuery, setSubmittedQuery] = useState(''); 
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  
   // fetch jobs from api 
   useEffect(() => {
    const fetchList = async (query) => {
      try {
          
          const jobList = submittedQuery ? 
            await JoblyApi.getJobList({ title: query }) : 
            await JoblyApi.getJobList(); // if no query submitted, fetch all jobs

          // add hasApplied prop to each job
          // if job id is in users.applications, hasApplied=true, else false
          const jobsListWithApps = jobList.map(job =>  {
            // const companyName = await getCompanyList(job.companyHandle);
            const hasApplied = user.applications.includes(job.id);
            return ({ ...job, hasApplied });
          });

          setJobs(jobsListWithApps);
          

        } catch (e) {
          console.error(e);
        }
        setIsLoading(false);
    }
    setIsLoading(true);
    fetchList(submittedQuery);
   
  }, [submittedQuery, user.applications]);

  if (isLoading) return <Loading />;

  return (
    <div className="JobsPage col-md-8 offset-md-2">
      <SearchBar submitSearch={setSubmittedQuery} />
      {jobs.length ? <JobList jobs={jobs} /> : <p>No results found for {submittedQuery}</p>
      }
    </div>
  );
};

export default JobsPage;