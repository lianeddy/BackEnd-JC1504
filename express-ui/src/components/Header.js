import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { logoutAction } from "../redux/actions";

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { username, logoutAction } = this.props;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                {username ? (
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/" onClick={logoutAction}>
                        Log Out
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/login">Login</Link>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>{username ? username : null}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStatetoProps = ({ user: { username } }) => {
  return {
    username,
  };
};

export default connect(mapStatetoProps, { logoutAction })(Header);
