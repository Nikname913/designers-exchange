import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ElementsUI from '../pages/ElementsUI'

import AboutExchangePage from '../pages/AboutExchangePage'
import ChatPage from '../pages/ChatPage'
import CustomerPage from '../pages/CustomerPage'
import CustomerProfilePage from '../pages/CustomerProfilePage'
import ExchangePage from '../pages/ExchangePage'
import ExecutorPage from '../pages/ExecutorPage'
import ExecutorProfilePage from '../pages/ExecutorProfilePage'
import MainPage from '../pages/MainPage'
import MyOrdersPage from '../pages/MyOrdersPage'
import MyWalletPage from '../pages/MyWalletPage'
import PricePage from '../pages/PricePage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import SupportPage from '../pages/SupportPage'
import TeamPage from '../pages/TeamPage'
import TermsOfUsePage from '../pages/TermsOfUsePage'
import WorkerPage from '../pages/WorkerPage'
import CreateTaskPage from '../pages/CreateTaskPage'

const DeskRoutes: React.FC = () => {

  return (
    <React.Fragment>
      <Routes>

        <Route 
          path="rabota-birzhy" 
          element={<AboutExchangePage/>} 
        />
        <Route 
          path="chat" 
          element={<ChatPage/>} 
        />
        <Route 
          path="zakazchiki" 
          element={<CustomerPage/>} 
        />
        <Route 
          path="cabinet-zakazchika" 
          element={<CustomerProfilePage/>} 
        />
        <Route 
          path="birzha" 
          element={<ExchangePage/>} 
        />
        <Route 
          path="ispolniteli" 
          element={<ExecutorPage/>} 
        />
        <Route 
          path="cabinet-ispolnitelya" 
          element={<ExecutorProfilePage/>} 
        />
        <Route 
          path="glavnaya" 
          element={<MainPage/>} 
        />
        <Route 
          path="moi-zakazy" 
          element={<MyOrdersPage/>} 
        />
        <Route 
          path="koshelek" 
          element={<MyWalletPage/>} 
        />
        <Route 
          path="ceny-i-usloviya" 
          element={<PricePage/>} 
        />
        <Route 
          path="politika" 
          element={<PrivacyPolicyPage/>} 
        />
        <Route 
          path="podderzhka" 
          element={<SupportPage/>} 
        />
        <Route 
          path="komanda" 
          element={<TeamPage/>} 
        />
        <Route 
          path="soglashenie" 
          element={<TermsOfUsePage/>} 
        />
        <Route 
          path="stranica-sotrudnika" 
          element={<WorkerPage/>} 
        />
        <Route 
          path="novoe-zadanie" 
          element={<CreateTaskPage/>} 
        />
        <Route
          path='ui-kit'
          element={<ElementsUI/>}
        />
        <Route
          path='/'
          element={<MainPage/>}
        />
        <Route 
          path="*" 
          element={<MainPage/>} 
        />

      </Routes>
    </React.Fragment>
  )

}

export default DeskRoutes