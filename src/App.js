
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Banner from './Component/Banner';
import Navigation from './Component/Navigation';
import Sampledesign from './Component/Sampledesign';
import Header from './Component/header';
import Designstyle from './Component/Designstyle';
import Quotationbanner from './Component/Quotationbanner';
import Workflowpage from './Component/Workflowpage';
import Footer from './Component/Footer';
import Login from './Component/Login';
import Customfeedback from './Component/Customfeedback';
import Quotepage from './Component/Quotepage';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

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
        {/* <Route path='/login' element={<Login />} 
        
        /> */}

        <Route path='/quotepage' element={

          <>
            <Header />
            <Navigation />
            <Quotepage />
            
          </>
        } />
      </Routes>      

    </>
  );
}

export default App;