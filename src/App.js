
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

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={
        <><Banner/>
        <Sampledesign/>
        <Quotationbanner/>
        <Designstyle/>
        <Workflowpage/>
        <Footer/>
        </>
        }/>
        
          
          
        
      </Routes>
    </>
  );
}

export default App;
