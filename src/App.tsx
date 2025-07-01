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


function App() {

  return (
    <>
      <MantineProvider>
        <Notifications/>
        <Container size={1945} style={{padding: 0, margin: 0}}>
           <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* All routes that should have the sidebar */}
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
                  
                  {/* You can add nested routes too */}
                  {/* <Route path="properties/*">
                    <Route path="add" element={<AddProperty />} />
                    <Route path="list" element={<PropertyList />} />
                  </Route> */}
                </Route>
        
                {/* Routes without sidebar (like login) */}
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="landing-page" element={<LandingPage/>} />
                <Route path="privacy-policy" element={<PrivacyPolicy/>} />

              </Routes>
            </Router>
        </Container>
      </MantineProvider>
    </>
  )
}

export default App
