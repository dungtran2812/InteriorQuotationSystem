
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
import LoginPage from './Component/LoginPage';
import SignUp from './Component/SignUp';


import Customfeedback from './Component/Homepage/Customfeedback';


import Quotepage from './Component/Quotepage';
import PrjTypeDetail from './Component/PrjTypeDetail';
import ProjectDetail from './Component/ProjectDetail';




function App() {

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

        <Route path='/login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUp />} />

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
            <Footer />
          </>
        } />
        <Route path={'/detail/:id'} element={
          <>
            <Header />
            <Navigation />
            <ProjectDetail />
            <Footer />
          </>
        } />
      </Routes>      

    </>
  );
}

export default App;