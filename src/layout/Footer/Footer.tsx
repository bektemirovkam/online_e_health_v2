import React, { FC } from "react";
import { Row, Col, Typography } from "antd";

import { FooterProps } from "./Footer.prop";
import styles from "./Footer.module.css";

const { Paragraph, Link } = Typography;

const Footer: FC<FooterProps> = (props) => {
  return (
    <Row {...props} className={styles.footer}>
      <Col span={24}>
        <Row justify="center">
          <Paragraph>
            Медицинская информационная система «НАДЕЖДА», разработчик ИП
            «PROFit»
          </Paragraph>
        </Row>
        <Row justify="center">
          <Link href="https://ant.design" target="_blank">
            Политика конфиденциальности
          </Link>
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
