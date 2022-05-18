import React, { useEffect } from "react";
import { Row } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";

import { AppointmentPage, HouseCallPage, SickListPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { getAppInitState } from "./store/selectors/app";
import { Preloader } from "./components";
import { getHospitalsForAppointment } from "./store/actions/hospitals";

// const screens = {
//   lg: 992,
//   md: 768,
//   sm: 576,
//   xl: 1200,
//   xs: true,
//   xxl: 1600,
// };

function App() {
  const appInit = useSelector(getAppInitState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHospitalsForAppointment());
  }, [dispatch]);

  return (
    <Layout>
      {appInit ? (
        // <Row justify="center">
        <Routes>
          <Route path="/appointment" element={<AppointmentPage />} />
          {/* <Route path="/house-call" element={<HouseCallPage />} /> */}
          {/* <Route path="/sicklist" element={<SickListPage />} /> */}
          <Route path="*" element={<Navigate to="/appointment" />} />
        </Routes>
      ) : (
        // </Row>
        <Preloader />
      )}
    </Layout>
  );
}

export default App;
