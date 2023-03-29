import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ElementsUI from '../pages/ElementsUI'

import AboutExchangePage from '../pages/AboutExchangePage'
import ChatPage from '../pages/ChatPage'
import CustomerPage from '../pages/CustomerPage'
import CustomerProfilePage from '../pages/CustomerProfilePage'
import ExecutorPage from '../pages/ExecutorPage'
import ExecutorProfilePage from '../pages/ExecutorProfilePage'
import ExecutorCabinetPage from '../pages/userPages/UserCabinetPage'

import ExchangePageOrders from '../pages/exchangeTaskMain/ExchangePageOrders'
import ExchangePageTasks from '../pages/exchangeTaskMain/ExchangePageTasks'
import ExchangePageArchive from '../pages/exchangeTaskMain/ExchangePageArchive'
import ExchangePageOrdersCust from '../pages/exchangeTaskCustomer/ExchangePageOrders'
import ExchangePageTasksCust from '../pages/exchangeTaskCustomer/ExchangePageTasks'
import ExchangePageArchiveCust from '../pages/exchangeTaskCustomer/ExchangePageArchive'
import ExchangePageTasksExec from '../pages/exchangeTaskExecutor/ExchangePageTasks'
import ExchangePageOrdersExec from '../pages/exchangeTaskExecutor/ExchangePageOrders'
import ShowTaskPageExec from '../pages/ShowTaskPageExec'
import ShowTaskPageCust from '../pages/ShowTaskPageCust'
import ShowOrderPageExec from '../pages/ShowOrderPageExec'
import ShowOrderPageCust from '../pages/ShowOrderPageCust'

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
          path='rabota-birzhy' 
          element={<AboutExchangePage/>} 
        />
        <Route 
          path='chat' 
          element={<ChatPage/>} 
        />
        <Route 
          path='zakazchiki' 
          element={<CustomerPage/>} 
        />
        <Route 
          path='cabinet-zakazchika' 
          element={<CustomerProfilePage/>} 
        />

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - исполнитель */}
        {/* ---------------------------------------- */}

        <React.Fragment>
          <Route 
            path='aktivnye-zakazy-ispolnitel' 
            element={<ExchangePageOrdersExec/>} 
          />
          <Route 
            path='zadaniya-arkhiv-ispolnitel' 
            element={<ExchangePageArchive/>} 
          />
          <Route
            path='spisok-zadaniy-ispolnitel'
            element={<ExchangePageTasksExec/>}
          />
        </React.Fragment>

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - исполнитель */}
        {/* ---------------------------------------- */}

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - заказчик */}
        {/* ---------------------------------------- */}

        <React.Fragment>
          <Route 
            path='zakazchik-aktivnye-zadaniya' 
            element={<ExchangePageOrdersCust/>} 
          />
          <Route 
            path='zakazchik-arkhiv' 
            element={<ExchangePageArchiveCust/>} 
          />
          <Route
            path='zakazchik-moi-zadaniya'
            element={<ExchangePageTasksCust/>}
          />
        </React.Fragment>

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - заказчик */}
        {/* ---------------------------------------- */}

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - общее */}
        {/* ---------------------------------------- */}

        <React.Fragment>
          <Route 
            path='aktivnye-zakazy' 
            element={<ExchangePageOrders/>} 
          />
          <Route 
            path='zadaniya-arkhiv' 
            element={<ExchangePageArchive/>} 
          />
          <Route
            path='spisok-zadaniy'
            element={<ExchangePageTasks/>}
          />
        </React.Fragment>

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - общее */}
        {/* ---------------------------------------- */}

        <Route 
          path='ispolniteli' 
          element={<ExecutorPage/>} 
        />
        <Route 
          path='profil-ispolnitelya' 
          element={<ExecutorProfilePage/>} 
        />
        <Route 
          path='cabinet-ispolnitelya' 
          element={<ExecutorCabinetPage/>} 
        />
        <Route 
          path='glavnaya' 
          element={<MainPage/>} 
        />
        <Route 
          path='moi-zakazy' 
          element={<MyOrdersPage/>} 
        />
        <Route 
          path='koshelek' 
          element={<MyWalletPage/>} 
        />
        <Route 
          path='ceny-i-usloviya' 
          element={<PricePage/>} 
        />
        <Route 
          path='politika' 
          element={<PrivacyPolicyPage/>} 
        />
        <Route 
          path='podderzhka' 
          element={<SupportPage/>} 
        />
        <Route 
          path='komanda' 
          element={<TeamPage/>} 
        />
        <Route 
          path='soglashenie' 
          element={<TermsOfUsePage/>} 
        />
        <Route 
          path='stranica-sotrudnika' 
          element={<WorkerPage/>} 
        />
        <Route 
          path='novoe-zadanie' 
          element={<CreateTaskPage/>} 
        />
        <Route path='zadanie'>
          <Route
            path='ex'
            element={<ShowTaskPageExec/>}
          />
          <Route
            path='cu'
            element={<ShowTaskPageCust/>}
          />
        </Route>
        <Route path='zakaz'>
          <Route
            path='ex'
            element={<ShowOrderPageExec/>}
          />
          <Route
            path='cu'
            element={<ShowOrderPageCust/>}
          />
        </Route>
        <Route
          path='ui-kit'
          element={<ElementsUI/>}
        />
        <Route
          path='/'
          element={<MainPage/>}
        />
        <Route 
          path='*' 
          element={<MainPage/>} 
        />

      </Routes>
    </React.Fragment>
  )

}

export default DeskRoutes