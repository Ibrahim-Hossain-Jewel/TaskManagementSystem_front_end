import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Nav, NavItem, Navbar, Col, FormControl, FormGroup, Button, Checkbox, Modal, ControlLabel} from 'react-bootstrap';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'
import { Link } from 'react-router-dom';

  class Home extends React.Component{
    constructor(props){
      super(props);
      this.state={
        form: {
              email: '',
              title: '',
              description: '',
              dueDate: '',
              priorityLevel: '',
              category: ''
          },
        show: false,
        message: 'Successfully created !',
      }
    }
    login = () => {
      this.props.history.push('/login')
    }
    onSelectAlert = (eventKey)=>{
      alert(`Alert from menu item.\neventKey: ${eventKey}`);
    }
    onChange = (key,e) => {
      let {form} = this.state;
      form[key] = e.target.value;
      this.setState({ form });
    }
    onSubmit = (evt) => {
      evt.preventDefault();
      console.log("Hit create task", this.state.form);
      //web token
      let token = sessionStorage.getItem('token');
      const decoded = jwt_decode(token);
      console.log(decoded);
      console.log("decoded web token", decoded.clientEmail);
      const decodedEmail = decoded.clientEmail;
      this.state.form.email = decodedEmail;
      let self = this;
      console.log("checking data", this.state.form);
      axios.post(`https://taskmanagement-api.onrender.com/api/note/add`, this.state.form)
        .then(res => {
          self.setState({show: true});
          // this.state.form.email = '';
          // this.state.form.title = '';
          // this.state.form.description = '';
          // this.state.form.dueDate = '';
          // this.state.form.priorityLevel = '';
          // this.state.form.category = '';
        })

      .catch(function (error) {
      self.setState({show: true, message: 'Failed to create task'});
        console.log(error.message);
      });
      }
      
    render(){
      console.log("This is higher order component", this.props);
      let close = () => this.setState({ show: false });
      return(
          <div className='container' style={{marginTop: "10px"}}>
            <Navbar collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Task Manager</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} onClick={() => this.props.changePage()}>
                    Task List
                  </NavItem>
                  {/* <NavItem eventKey={2} href="#">
                    Link
                  </NavItem> */}
                  {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown> */}
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={1} onClick={this.login} style={{paddingRight: "20px"}}>
                    Logout
                  </NavItem>
                  {/* <NavItem eventKey={2} href="#">
                    Link Right
                  </NavItem> */}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <h2>Welcome to Task Manager</h2>
            
          <Col>
          <form className="well" onSubmit={this.onSubmit}>
            <h1 style={{textAlign:'center', marginBottom:'20px'}}>Task Info</h1>
              <FormGroup>
                <FormControl type="text" placeholder="Title" onChange={this.onChange.bind(this,'title')} style={{height:'40px'}}/>
              </FormGroup>
              
              <FormGroup>
                <FormControl type="text" placeholder="Description" onChange={this.onChange.bind(this,'description')} style={{height:'40px'}}/>
              </FormGroup>
              <FormGroup>
                <FormControl type="date" placeholder="Due Date" onChange={this.onChange.bind(this,'dueDate')} style={{height:'40px'}}/>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <FormControl componentClass="select" placeholder="select" onChange={this.onChange.bind(this,'priorityLevel')}>
                  <option value="">Select priority level</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <FormControl componentClass="select" placeholder="select" onChange={this.onChange.bind(this,'category')}>
                  <option value="">Select category</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketting">Marketting</option>
                </FormControl>
              </FormGroup>

                <Modal
                    bsSize="small"
                      show={this.state.show}
                      onHide={close}
                      container={this}
                      aria-labelledby="contained-modal-title"
                    >
                      <Modal.Header closeButton>
                      </Modal.Header>
                      <Modal.Body >
                          <p style={{textAlign:'center'}}><b>{this.state.message}</b></p>
                      </Modal.Body>
                    </Modal>
                  <FormGroup>
                    <Button bsStyle="primary" style={{width:'100%', height:'40px',marginBottom:'10px'}} onClick={this.onSubmit} type="submit">Create</Button>
                  </FormGroup>
              </form>
          </Col>
          
          </div>
        )
    }
  } 

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/tasklist')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
