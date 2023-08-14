import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ElementsUI from '../pages/ElementsUI'

import AboutExchangePage from '../pages/AboutExchangePage'
import ChatPage from '../pages/ChatPage'
import AuthPageExecutor from '../pages/AuthPageExecutor'
import AuthPageCustomer from '../pages/AuthPageCustomer'
import AuthPageSuccess from '../pages/AuthPageExecutorSuccess'
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
import ExchangePageArchiveExec from '../pages/exchangeTaskExecutor/ExchangePageArchive'
import ShowTaskPageExec from '../pages/ShowTaskPageExec'
import ShowTaskPageCust from '../pages/ShowTaskPageCust'
import ShowOrderPageExec from '../pages/ShowOrderPageExec'
import ShowOrderPageCust from '../pages/ShowOrderPageCust'
import ShowBacksideExec from '../pages/ShowCompletePageExec'
import ShowBacksideCust from '../pages/ShowCompletePageCust'
import ShowTasksPageExchange from '../pages/ShowTaskPageExchange'

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
import CreateTaskPageEdit from '../pages/CreateTaskPageEdit'

const DeskRoutes: React.FC = () => {

  return (
    <React.Fragment>
      <Routes>

        <Route 
          path='exchange-work' 
          element={<AboutExchangePage/>} 
        />
        <Route 
          path='chat' 
          element={<ChatPage/>} 
        />
        <Route 
          path='exec-registration'  
          element={<AuthPageExecutor/>} 
        />
        <Route 
          path='exec-registration-success'   
          element={<AuthPageSuccess/>} 
        />
        <Route 
          path='cust-registration'   
          element={<AuthPageCustomer/>} 
        />
        <Route 
          path='customers' 
          element={<CustomerPage/>} 
        />
        <Route 
          path='cust-profile/:userId' 
          element={<CustomerProfilePage/>} 
        />
        <Route 
          path='cust-office/:viewtype' 
          element={<ExecutorCabinetPage/>} 
        />

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - исполнитель */}
        {/* ---------------------------------------- */}

        <React.Fragment>
          <Route 
            path='active-orders-exec' 
            element={<ExchangePageOrdersExec/>} 
          />
          <Route 
            path='tasks-archive-exec' 
            element={<ExchangePageArchiveExec/>} 
          />
          <Route
            path='task-list-exec'
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
            path='active-orders-cust' 
            element={<ExchangePageOrdersCust/>} 
          />
          <Route 
            path='tasks-archive-cust' 
            element={<ExchangePageArchiveCust/>} 
          />
          <Route
            path='task-list-cust'
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
            path='active-orders-all' 
            element={<ExchangePageOrders/>} 
          />
          <Route 
            path='tasks-archive-all' 
            element={<ExchangePageArchive/>} 
          />
          <Route
            path='task-list-all'
            element={<ExchangePageTasks/>}
          />
        </React.Fragment>

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - общее */}
        {/* ---------------------------------------- */}

        <Route 
          path='executors' 
          element={<ExecutorPage/>} 
        />
        <Route 
          path='exec-profile/:userId' 
          element={<ExecutorProfilePage/>} 
        />
        <Route 
          path='exec-office/:viewtype' 
          element={<ExecutorCabinetPage/>} 
        />
        <Route 
          path='main' 
          element={<MainPage/>} 
        />
        <Route 
          path='my-orders' 
          element={<MyOrdersPage/>} 
        />
        <Route 
          path='wallet' 
          element={<MyWalletPage/>} 
        />
        <Route 
          path='prices-and-conditions' 
          element={<PricePage/>} 
        />
        <Route 
          path='privacy-policy' 
          element={<PrivacyPolicyPage/>} 
        />
        <Route 
          path='support-service' 
          element={<SupportPage/>} 
        />
        <Route 
          path='team' 
          element={<TeamPage/>} 
        />
        <Route 
          path='terms-of-use' 
          element={<TermsOfUsePage/>} 
        />
        <Route 
          path='employee-page' 
          element={<WorkerPage/>} 
        />
        <Route 
          path='create-new-task' 
          element={<CreateTaskPage/>} 
        />
        <Route 
          path='edit-task/:taskId'  
          element={<CreateTaskPageEdit/>} 
        />
        <Route 
          path='task-review' 
          element={<ShowTasksPageExchange/>} 
        />
        <Route path='task-view'>
          <Route
            path='ex'
            element={<ShowTaskPageExec/>}
          />
          <Route
            path='cu'
            element={<ShowTaskPageCust/>}
          />
        </Route>
        <Route path='order-view'>
          <Route
            path='ex'
            element={<ShowOrderPageExec/>}
          />
          <Route
            path='cu'
            element={<ShowOrderPageCust/>}
          />
        </Route>
        <Route path='backside-view'>
          <Route
            path='ex'
            element={<ShowBacksideExec/>}
          />
          <Route
            path='cu'
            element={<ShowBacksideCust/>}
          />
        </Route>
        <Route
          path='ui-kit'
          element={<ElementsUI/>}
        />
        <Route
          path='/'
          element={<ExchangePageTasks/>}
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