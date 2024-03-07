import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header/Header';
import Home from 'src/pages/Home/Home';
import CampaignDetails from 'src/pages/CampaignDetails/CampaignDetails';
import LoginPage from 'src/pages/LoginPage/LoginPage';
import ProfilePage from 'src/pages/ProfilePage/ProfilePage';
import PageLayout from 'src/pages/PageLayout/PageLayout';

function App() {

  console.log(process.env.NODE_ENV);

  // let apiURL = '';
  // if (process.env.NODE_ENV === 'production') {
  //   apiURL = process.env.REACT_APP_PROD_API_URL;
  // } else {
  //   apiURL = process.env.REACT_APP_DEV_API_URL;
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <PageLayout /> }>
            <Route index element={ <LoginPage /> } />
            <Route path='profile' element={ <ProfilePage /> } />
            <Route path='home' element={ <Home /> } />
            <Route path='campaign/:id' element={ <CampaignDetails /> } />
          </Route>
        </Routes>
      </BrowserRouter>
      
      {/* <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/campaign/:id' element={<CampaignDetails apiURL={apiURL} />} />
      </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
