import React, { FC } from "react";
import { Row, Col, Grid, Button } from "antd";
import cn from "classnames";

import { HeaderProps } from "./Header.prop";
import styles from "./Header.module.css";

const { useBreakpoint } = Grid;

const Header: FC<HeaderProps> = (props) => {
  const { sm, md } = useBreakpoint();

  return (
    <Row {...props} className={styles.header}>
      <Col span={24}>
        <Row justify="space-between">
          <Col md={12} xs={24}>
            <Row className={styles.buttons}>
              <Button type="primary" size={sm ? "large" : "middle"} block={!md}>
                Запись на прием
              </Button>
              <Button size={sm ? "large" : "middle"} block={!md}>
                Вызов врача на дом
              </Button>
            </Row>
          </Col>
          <Col md={4} xs={24}>
            <Row
              className={cn(styles.buttons, styles.buttons__langs)}
              justify="end"
            >
              <Button type="primary" size={sm ? "large" : "middle"}>
                KZ
              </Button>
              <Button size={sm ? "large" : "middle"}>RU</Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
