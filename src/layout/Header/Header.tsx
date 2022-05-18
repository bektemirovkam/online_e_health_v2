import React, { FC } from "react";
import { Row, Col, Grid, Button } from "antd";
import cn from "classnames";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { HeaderLinkProps, HeaderProps } from "./Header.prop";
import styles from "./Header.module.css";

const { useBreakpoint } = Grid;

// const links = [
//   {
//     to: "/appointment",
//     title: "Запись на прием",
//   },
//   {
//     to: "/house-call",
//     title: "Вызов врача на дом",
//   },
//   {
//     to: "/sicklist",
//     title: "Проверка больничного листа",
//   },
// ];

const HeaderLink: FC<HeaderLinkProps> = ({ to, title, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  const { sm, md } = useBreakpoint();

  return (
    <Link to={to} {...props}>
      <Button
        type={match ? "primary" : "ghost"}
        size={sm ? "large" : "middle"}
        block={!md}
        role="link"
      >
        {title}
      </Button>
    </Link>
  );
};

const Header: FC<HeaderProps> = (props) => {
  const { sm } = useBreakpoint();

  return (
    <Row {...props} className={styles.header}>
      <Col span={24}>
        <Row justify="space-between">
          {/* <Col>
            <Row className={styles.buttons} justify="space-between">
              {links.map((link) => {
                return <HeaderLink {...link} key={link.to} />;
              })}
            </Row>
          </Col> */}
          <Col flex={1}>
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
