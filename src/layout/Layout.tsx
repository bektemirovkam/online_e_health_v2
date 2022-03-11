import React, { FC } from "react";
import { Row, Col } from "antd";

import styles from "./Layout.module.css";
import { LayoutProps } from "./Layout.prop";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Col span={24} {...props}>
      <Row justify="center">
        <Col xs={20} xl={12} className={styles.content}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </Col>
      </Row>
    </Col>
  );
};

export default Layout;
