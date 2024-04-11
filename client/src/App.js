import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'src/pages/Home/Home';
import CampaignDetails from 'src/pages/CampaignDetails/CampaignDetails';
import LoginPage from 'src/pages/LoginPage/LoginPage';
import ProfilePage from 'src/pages/ProfilePage/ProfilePage';
import PageLayout from 'src/pages/PageLayout/PageLayout';
import DonationSuccess from './pages/DonationSuccess/DonationSuccess';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <PageLayout /> }>
            <Route index element={ <LoginPage /> } />
            <Route path='profile' element={ <ProfilePage /> } />
            <Route path='home' element={ <Home /> } />
            <Route path='campaign/:id' element={ <CampaignDetails /> } />
            <Route path='/donation_success' element={<DonationSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
