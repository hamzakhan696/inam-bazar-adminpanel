import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider, Container } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./AdminPanel/Layout/Layout"
import { Dashboard } from "./AdminPanel/Dashboard/Dashboard"
import { Products } from "./AdminPanel/Products/Products"
import { Orders } from "./AdminPanel/Orders/Orders"
import { Customers } from "./AdminPanel/Customers/Customers"
import { Reports } from "./AdminPanel/Reports/Reports"
import { Discounts } from "./AdminPanel/Discounts/Discounts"
import { Deals } from "./AdminPanel/Deals/Deals"
import { Help } from "./AdminPanel/Help/Help"
import { Settings } from "./AdminPanel/Settings/Settings"
import LandingPage from "./LandingPage/LandingPage";
import { Categories } from "./AdminPanel/Categories/Categories";
import { Inventory } from "./AdminPanel/Inventory/Inventory";
import { Shipments } from "./AdminPanel/Shipments/Shipments";
import { Payments } from "./AdminPanel/Payments/Payments";
import { PrivacyPolicy } from "./PrivacyPolicy/PrivacyPolicy";
import Login from "./AdminPanel/Login";


function App() {

  return (
    <>
      <MantineProvider>
        <Notifications />
        <Container size={1945} style={{ padding: 0, margin: 0 }}>
          <Router>
            <Routes>
              {/* Landing page as the default route */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin-login" element={<Login />} />

              {/* Admin panel routes with sidebar */}
              <Route path="/admin" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="categories" element={<Categories />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="reports" element={<Reports />} />
                <Route path="discounts" element={<Discounts />} />
                <Route path="deals" element={<Deals />} />
                <Route path="shipments" element={<Shipments />} />
                <Route path="payments" element={<Payments />} />
                <Route path="help" element={<Help />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Other routes without sidebar */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </Router>
        </Container>
      </MantineProvider>
    </>
  )
}

export default App
