
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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={
        <>
        <Navigation />
        <Banner/>
        <Sampledesign/>
        <Quotationbanner/>
        <Designstyle/>
        <Workflowpage/>
        <Footer/>
        </>
        }/>
        <Route path='/Login' element={<LoginPage/>}>
        </Route>
        <Route path='/SignUp' element={<SignUp/>}>
        </Route>
          
          
        
      </Routes>
        
    </>
  );
}

export default App;
