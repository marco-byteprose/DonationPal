import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header/Header';
import Home from 'src/pages/Home/Home';
import CampaignDetails from 'src/pages/CampaignDetails/CampaignDetails';

function App() {

  console.log(process.env.NODE_ENV);

  let apiURL = '';
  if (process.env.NODE_ENV === 'production') {
    apiURL = process.env.REACT_APP_PROD_API_URL;
  } else {
    apiURL = process.env.REACT_APP_DEV_API_URL;
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home apiURL={apiURL} />} />
        <Route path='/campaign/:id' element={<CampaignDetails apiURL={apiURL} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
