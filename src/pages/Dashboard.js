import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainHeader from '../components/Dashboard/MainHeader';
import Download from '../components/Dashboard/Download';
import CirclerInfo from '../components/Dashboard/CirclerInfo';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'ComCall';
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Header />
      <div>
        <MainHeader />
        <Download />
        <CirclerInfo />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
