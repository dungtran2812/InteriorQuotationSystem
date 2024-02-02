
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
import LoginPage from './Component/LoginPage';
import SignUp from './Component/SignUp';
import Customfeedback from './Component/Customfeedback';
import Quotepage from './Component/Quotepage';




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

        <Route path='/login' element={<LoginPage />} 
        
        />
        <Route path='/SignUp' element={<SignUp />}>

        </Route>

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