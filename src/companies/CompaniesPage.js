/**
 * Displays a search bar and a list of companies. 
 */
import React, { useState, useEffect } from 'react';
import SearchBar from '../common/SearchBar';
import CompanyList from './CompanyList';
import JoblyApi from '../api';
import Loading from '../common/Loading';

const CompaniesPage = () => {
  const [submittedQuery, setSubmittedQuery] = useState(''); 
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

   // on 1st render and query change update list
   useEffect(() => {
    // fetch list filtered by query
    const fetchList = async (query) => {
      try {
        const companiesList = submittedQuery ? 
          await JoblyApi.getCompanyList({ name: query }) :  
          await JoblyApi.getCompanyList();
       
        setCompanies(companiesList);
       
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    fetchList(submittedQuery);
   
  }, [submittedQuery]);

  if (isLoading) return <Loading />;

  return (
    <div className="CompaniesPage col-md-8 offset-md-2">
      <SearchBar submitSearch={setSubmittedQuery} />
      { companies.length? <CompanyList companies={companies} /> : <p>No results found for {submittedQuery}</p> }
    </div>
  );
}

export default CompaniesPage;