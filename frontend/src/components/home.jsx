import { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import 'react-bootstrap'
import ServiceAPI from './forms/Service';
import { Col, Row, Navbar, Container } from 'react-bootstrap';
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { badge } from "../components/ui-components/UIComponents"
import Logo from './ui-components/Logo';

import PropTypes from 'prop-types'


export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employeeId: '',
      token: '',
      assets: [],
      user: '',
      employee: '',
      workOrders: []
    }

  }

  static getDerivedStateFromProps(props, state) {
    return {
      employeeId: props.employeeId,
      user: props.user
    };
  }

  componentDidMount() {
    ServiceAPI.getEmployeeData(this.state.employeeId, this.state.token)
      .then((res) => {
        console.info(`res: ${res.data}`)
        this.setState(
          { employee: res.data }
        )
      }
      )
  }



  render() {
    console.info(this.state.employee)
    return (
      <Container fluid>
        <Row >
          <Col sm={12} className={"border-gray-500 border"}>
            <Navbar>
              <Navbar.Brand href="#home"><Logo/> </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">{this.state.employee.user}</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>

        <Row className={" h-96  border-gray-500  border-r-2"}>
          <Col sm={2} className={" border"}>
            <Navbar >
              <Nav defaultActiveKey="/home" className="flex-column pb-20 ">
                <Nav.Link href="/home">My Work Orders <Badge badgeContent={5} color="primary">
                  <MailIcon />
                </Badge> </Nav.Link>
                <Nav.Link eventKey="link-1">My Assets  {badge(5)}</Nav.Link>
                <Nav.Link eventKey="link-2">My Profile </Nav.Link>
              </Nav>
            </Navbar>

          </Col>

        </Row>
      </Container>
    );
  }
}
Homepage.propTypes = {
  employeeId:PropTypes.number.isRequired,
  token:PropTypes.string.isRequired,
}
