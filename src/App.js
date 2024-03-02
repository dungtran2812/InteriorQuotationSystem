import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './Component/Dashboard';
import Footer from './Component/Footer';
import Banner from './Component/Homepage/Banner';
import Customfeedback from './Component/Homepage/Customfeedback';
import Designstyle from './Component/Homepage/Designstyle';
import Quotationbanner from './Component/Homepage/Quotationbanner';
import Sampledesign from './Component/Homepage/Sampledesign';
import Workflowpage from './Component/Homepage/Workflowpage';
import LoginPage from './Component/LoginPage';
import PrjTypeDetail from './Component/PrjTypeDetail';
import ProjectDetail from './Component/ProjectDetail';
import Quotepage from './Component/Quotepage';
import SampleSearch from './Component/SampleSearch';
import ScrollToTop from './Component/ScrollToTop';
import SignUp from './Component/SignUp';
import StaffDashboardPage from './Component/Staff-Dashboard';
import ViewRegisterListPage from './Component/Staff-Dashboard/pages/ViewRegisterList';
import UserPage from './Component/UserProfile/UserPage';
import Header from './Component/header';
import StyleDetail from './Component/DesignStylePage/StyleDetail';
import ViewRegisterList from "./Component/ViewRegisterList/ViewRegisterList";
import ProjectVideo from './Component/Homepage/ProjectVideo';
import StickyModal from './Component/StickyModal';

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
            <ProjectVideo/>
            <Customfeedback />
            <Footer />
            <StickyModal/>
          </>
        } />

        <Route path='/login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/staff-dashboard' element={<StaffDashboardPage />} />
        <Route
          path={"/staff-dashboard/viewRegisterList"}
          element={
            <>
              <ViewRegisterListPage />
            </>
          }
        />

        <Route path='/quotepage' element={
          <>
            <Header />
            <Quotepage />
            <Footer />
            <StickyModal/>
          </>
        } />
        <Route path='/interior-construction/apartmentproject' element={
          <>
            <ScrollToTop/>
            <Header />
            <PrjTypeDetail />
            <Footer />
            <StickyModal/>
          </>
        } />
        
        <Route path={'/detail/:id'} element={
          <>
            <Header />
            <ProjectDetail />
            <Footer />
            <StickyModal/>
          </>
        } />
        <Route path={'/style-detail/:id'} element={
          <>
            <Header />
            <StyleDetail/>
            <Footer />
            <StickyModal/>
          </>
        } />
        <Route path={'sampleprojectpage/detail/:id'} element={
          <>
            <Header />
            <ProjectDetail />
            <Footer />
            <StickyModal/>
          </>
        } />
        <Route path={'sampleprojectpage'} element={
          <>
            <Header />
            <SampleSearch/>
            <Footer />
            <StickyModal/>
          </>
        } />
        <Route path={'profile'} element={
          <>
            <Header />
            <UserPage/>
            <Footer />
            <StickyModal/>
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