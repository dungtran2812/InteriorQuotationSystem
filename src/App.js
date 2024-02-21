import { Route, Routes } from 'react-router-dom';
import './App.css';
import Banner from './Component/Homepage/Banner';
import Navigation from './Component/Navigation';
import Sampledesign from './Component/Homepage/Sampledesign';
import Header from './Component/header';
import Designstyle from './Component/Homepage/Designstyle';
import Quotationbanner from './Component/Homepage/Quotationbanner';
import Workflowpage from './Component/Homepage/Workflowpage';
import Footer from './Component/Footer';
import Login from './Component/Login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';


import Customfeedback from './Component/Homepage/Customfeedback';


import Quotepage from './Component/Quotepage';
import PrjTypeDetail from './Component/PrjTypeDetail';
import ProjectDetail from './Component/ProjectDetail';


const clientId = "423567540491-42aoheb5ltla2j4nb5h0a36hev870a8e.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start)
  });

  var accessToken = gapi.auth.getToken().access_token;
  
  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Navigation />
            <Sampledesign />
            <Banner />
            <Quotationbanner />
            <Designstyle />
            <Workflowpage />
            <Customfeedback />
            <Footer />
          </>
        } />
        <div className = "App">
          <Login />
        </div>
        <Route path='/quotepage' element={
          <>
            <Header />
            <Navigation />
            <Quotepage />

          </>
        } />
        <Route path='/apartment-project' element={
          <>
            <Header />
            <Navigation />
            <PrjTypeDetail />
            <Footer />
          </>
        } />
        <Route path={'/apartment-project/detail/:id'} element={
          <>
            <Header />
            <Navigation />
            <ProjectDetail />
          </>
        } />
        <Route path={'/detail/:id'} element={
          <>
            <Header />
            <Navigation />
            <ProjectDetail />
          </>
        } />
      </Routes>      

    </>
  );
}

export default App;