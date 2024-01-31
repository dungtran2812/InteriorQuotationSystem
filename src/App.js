
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


function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={
        <>
        <Header />
      <Navigation />
        <Banner/>
        <Sampledesign/>
        <Quotationbanner/>
        <Designstyle/>
        <Workflowpage/>
        <Customfeedback/>
        </>
        }/>

        <Route path='/login' element={<LoginPage/>}/> 

      </Routes>
      <Footer/>
    </>
  );
} 

export default App;
