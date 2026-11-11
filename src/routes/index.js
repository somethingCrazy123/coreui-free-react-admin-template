/**
 * Admin route table. AppContent renders every entry that has an element.
 * To add a page: create the view in src/views and add one line here,
 * then add a matching item in src/_nav.jsx so it appears in the sidebar.
 */
import React from 'react'

const Dashboard = React.lazy(() => import('../views/dashboard/AdminDashboard'))

export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
