import React from 'react'
import { Route, Routes } from 'react-router-dom'

import DE from '../pages/DefaultEmpty'
import Customers from '../pages/Customers'
import Executors from '../pages/Executors'
import ExchangeMain from '../pages/ExchangeMain'
import ShowTask from '../pages/ShowTask'

import AuthPageCustomerMobile from '../pages/NewCustomer'
import AuthPageExecutorMobile from '../pages/NewExecutor'
import UserCabinetExecutor from '../pages/UserCabinetExecutor'

const DeskRoutes: React.FC = () => {

  return (
    <React.Fragment>
      <Routes>

        <Route 
          path='exchange-work' 
          element={<DE/>} 
        />
        <Route 
          path='chat' 
          element={<DE/>} 
        />
        <Route 
          path='exec-registration'  
          element={<AuthPageExecutorMobile />} 
        />
        <Route 
          path='exec-registration-success'   
          element={<DE/>} 
        />
        <Route 
          path='cust-registration'   
          element={<AuthPageCustomerMobile />} 
        />
        <Route 
          path='customers' 
          element={<Customers/>} 
        />
        <Route 
          path='cust-profile/:userId' 
          element={<DE/>} 
        />
        <Route 
          path='cust-office/:viewtype' 
          element={<DE/>} 
        />

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - исполнитель */}
        {/* ---------------------------------------- */}

        <React.Fragment>
          <Route 
            path='active-orders-exec' 
            element={<DE/>} 
          />
          <Route 
            path='tasks-archive-exec' 
            element={<DE/>} 
          />
          <Route
            path='task-list-exec'
            element={<DE/>}
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
            element={<DE/>} 
          />
          <Route 
            path='tasks-archive-cust' 
            element={<DE/>} 
          />
          <Route
            path='task-list-cust'
            element={<DE/>}
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
            element={<DE/>} 
          />
          <Route 
            path='tasks-archive-all' 
            element={<DE/>} 
          />
          <Route
            path='task-list-all'
            element={<ExchangeMain/>}
          />
        </React.Fragment>

        {/* ---------------------------------------- */}
        {/* страницы - списки заданий - общее */}
        {/* ---------------------------------------- */}

        <Route 
          path='executors' 
          element={<Executors/>} 
        />
        <Route 
          path='exec-profile/:userId' 
          element={<DE/>} 
        />
        <Route 
          path='exec-office/:viewtype' 
          element={<UserCabinetExecutor/>} 
        />
        <Route 
          path='main' 
          element={<DE/>} 
        />
        <Route 
          path='my-orders' 
          element={<DE/>} 
        />
        <Route 
          path='wallet' 
          element={<DE/>} 
        />
        <Route 
          path='prices-and-conditions' 
          element={<DE/>} 
        />
        <Route 
          path='privacy-policy' 
          element={<DE/>} 
        />
        <Route 
          path='support-service' 
          element={<DE/>} 
        />
        <Route 
          path='team' 
          element={<DE/>} 
        />
        <Route 
          path='terms-of-use' 
          element={<DE/>} 
        />
        <Route 
          path='employee-page' 
          element={<DE/>} 
        />
        <Route 
          path='create-new-task' 
          element={<DE/>} 
        />
        <Route 
          path='edit-task/:taskId'  
          element={<DE/>} 
        />
        <Route 
          path='task-review' 
          element={<ShowTask/>} 
        />
        <Route path='task-view'>
          <Route
            path='ex'
            element={<ShowTask/>}
          />
          <Route
            path='cu'
            element={<ShowTask/>}
          />
        </Route>
        <Route path='order-view'>
          <Route
            path='ex'
            element={<DE/>}
          />
          <Route
            path='cu'
            element={<DE/>}
          />
        </Route>
        <Route path='backside-view'>
          <Route
            path='ex'
            element={<DE/>}
          />
          <Route
            path='cu'
            element={<DE/>}
          />
        </Route>
        <Route
          path='ui-kit'
          element={<DE/>}
        />
        <Route
          path='/'
          element={<ExchangeMain/>}
        />
        <Route 
          path='*' 
          element={<DE/>} 
        />

      </Routes>
    </React.Fragment>
  )

}

export default DeskRoutes