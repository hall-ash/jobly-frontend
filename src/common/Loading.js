/**
 * Loading graphic of spinning circles
 * - displays when data is being fetch from the api
 */
import React from 'react';
import { SpinningCircles } from 'react-loading-icons';
import './Loading.css';

const Loading = () => {
  return ( 
    <div className="Loading">
      <SpinningCircles fill="#0F8FEA" speed={2} className="Loading-circles" />
    </div>
  );
};

export default Loading;