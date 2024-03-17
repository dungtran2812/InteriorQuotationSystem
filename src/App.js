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
import ProductQuotePage from './Component/ProductQuotePage';
import SampleSearch from './Component/SampleSearch';
import ScrollToTop from './Component/ScrollToTop';
import SignUp from './Component/SignUp';
import StaffDashboardPage from './Component/Staff-Dashboard';
import ViewRegisterListPage from './Component/Staff-Dashboard/pages/ViewRegisterList';
import UserPage from './Component/UserProfile/UserPage';
import Header from './Component/header';
import StyleDetail from './Component/DesignStylePage/StyleDetail';
import ProjectVideo from './Component/Homepage/ProjectVideo';
import StickyModal from './Component/StickyModal';

import ViewRegisterList from "./Component/ViewRegisterList/ViewRegisterList";
import { ProtectedAdminRoute, ProtectedStaffRoute } from './hooks/withProtected';

import RawMaterialQuotePage from './Component/RawMaterialQuotePage';
import StaffQuotePage from './Component/Staff-Dashboard/pages/StaffQuotePage';
import QuoteStep from './Component/QuoteStep';
import UserProjectPage from './Component/UserProfile/UserProjectPage';
import ProductListPage from './Component/Dashboard/pages/ProductListPage';
import UserListPage from './Component/Dashboard/pages/UserListPage';
import RawMaterialListPage from './Component/Dashboard/pages/RawMaterialList';
import ProfileSetting from './Component/Dashboard/pages/ProfileSetting';



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
            <ProjectVideo />
            <Customfeedback />
            <Footer />
            <StickyModal />
          </>
        } />

        <Route path='/login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/dashboard' element={<ProtectedAdminRoute><DashboardPage /></ProtectedAdminRoute>} />
        <Route path='/manage-product' element={<ProtectedAdminRoute><ProductListPage /></ProtectedAdminRoute>} />
        <Route path='/manage-user' element={<ProtectedAdminRoute><UserListPage /></ProtectedAdminRoute>} />
        <Route path='/manage-rawMaterial' element={<ProtectedAdminRoute><RawMaterialListPage /></ProtectedAdminRoute>} />
        <Route path='/manage-profile' element={<ProtectedAdminRoute><ProfileSetting /></ProtectedAdminRoute>} />
        <Route path='/staff-dashboard' element={<ProtectedStaffRoute>
          <StaffDashboardPage />
        </ProtectedStaffRoute>} />
        <Route
          path={"/staff-dashboard/viewRegisterList"}
          element={
            <ProtectedStaffRoute>
              <ViewRegisterListPage />
            </ProtectedStaffRoute>
          }
        />

        <Route
          path={"/staff-dashboard/quotePage/:id"}
          element={
            <ProtectedStaffRoute>
              <StaffQuotePage />
            </ProtectedStaffRoute>
          }
        />

        <Route path='/quotepage' element={
          <>
            <ScrollToTop />
            <Header />
            <QuoteStep />

            <Footer />
            <StickyModal />
          </>
        } />
        <Route path='/interior-construction/apartmentproject' element={
          <>
            <ScrollToTop />
            <Header />
            <PrjTypeDetail />
            <Footer />
            <StickyModal />
          </>
        } />

        <Route path={'/detail/:id'} element={
          <>
            <Header />
            <ProjectDetail />
            <Footer />
            <StickyModal />
          </>
        } />
        <Route path={'/style-detail/:id'} element={
          <>
            <Header />
            <StyleDetail />
            <Footer />
            <StickyModal />
          </>
        } />
        <Route path={'sampleprojectpage/detail/:id'} element={
          <>
            <Header />
            <ProjectDetail />
            <Footer />
            <StickyModal />
          </>
        } />
        <Route path={'sampleprojectpage/'} element={
          <>
            <Header />
            <SampleSearch />
            <Footer />
            <StickyModal />
          </>
        } />
        <Route path={'sampleprojectpage/:search'} element={
          <>
            <Header />
            <SampleSearch />
            <Footer />
            <StickyModal />
          </>
        } />
        <Route path={'profile'} element={
          <>
            <Header />
            <UserPage />
            <Footer />
            <StickyModal />
          </>
        } />
        <Route path={'user-project'} element={
          <>
            <Header />
            <UserProjectPage/>
            <Footer />
            <StickyModal />
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