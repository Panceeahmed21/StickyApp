import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import style from "./NavbarComp.module.css";
import { useRecoilState } from "recoil";
import {noteAtom} from "../../Atoms/noteAtom"

export default function NavbarComp() {

  let [noteLength,setNoteLength]=useRecoilState(noteAtom)
console.log(noteLength);


  let userToken = localStorage.getItem("userToken") || null;
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      <Navbar expand="lg" className="bg-primary ">
        <Container>
          <Navbar.Brand>
            <Link to="">
              <div className="d-flex justify-content-between align-items-center">
                <i className="fa-solid fa-note-sticky text-white fa-xl me-3" ></i>
                <h1 className="h3 text-white">Sticky App</h1>
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userToken == null ? (
                <>
                  <Nav.Link>
                    <Link to="/register">
                      <span className="text-white h6"> Register</span>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/login">
                      <span className="text-white h6"> Login</span>
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link>
                    <span
                      className={`text-white h6 position-absolute  d-sm-none d-lg-block ${style.num_pos}`}
                    >
                    
                      {noteLength}
                    </span>
                    <i class="fa-solid fa-box-open text-white position-relative  d-sm-none d-lg-block"></i>
                  </Nav.Link>
                  <Nav.Link onClick={logout}>
                    <span className="text-white h6"> Logout</span>
                  </Nav.Link>
                </>
              )}
              <div className="ms-5 d-lg-flex d-sm-none">
                <Nav.Link>
                  <i class="fa-brands fa-facebook-f text-white"></i>
                </Nav.Link>
                <Nav.Link>
                  <i class="fa-brands fa-twitter text-white "></i>
                </Nav.Link>
                <Nav.Link>
                  <i class="fa-brands fa-instagram text-white"></i>
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
