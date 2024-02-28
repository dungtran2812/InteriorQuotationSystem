import { Route, Routes } from 'react-router-dom';
import './App.css';
import Banner from './Component/Homepage/Banner';
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
import DashboardPage from './Component/Dashboard';
import SampleSearch from './Component/SampleSearch';
import ScrollToTop from './Component/ScrollToTop';
import UserPage from './Component/UserProfile/UserPage';

import StyleDetail from './Component/DesignStylePage/StyleDetail';
import ViewRegisterList from "./Component/ViewRegisterList/ViewRegisterList";

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
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
        <Route path='/dashboard' element={<DashboardPage />} />

        <Route path='/quotepage' element={
          <>
            <Header />
            <Quotepage />
            <Footer />
          </>
        } />
        <Route path='/interior-construction/apartmentproject' element={
          <>
            <ScrollToTop/>
            <Header />
            <PrjTypeDetail />
            <Footer />
          </>
        } />
        
        <Route path={'/detail/:id'} element={
          <>
            <Header />
            <ProjectDetail />
            <Footer />
          </>
        } />
        <Route path={'/style-detail/:id'} element={
          <>
            <Header />
            <StyleDetail/>
            <Footer />
          </>
        } />
        <Route path={'sampleprojectpage/detail/:id'} element={
          <>
            <Header />
            <ProjectDetail />
            <Footer />
          </>
        } />
        <Route path={'sampleprojectpage'} element={
          <>
            <Header />
            <SampleSearch/>
            <Footer />
          </>
        } />
        <Route path={'profile'} element={
          <>
            <Header />
            <UserPage/>
            <Footer />
          </>
        } />
        <Route
          path={"viewRegisterList"}
          element={
            <>
              <ViewRegisterList />
            </>
          }
        />
      </Routes>

    </>
  );
}

export default App;