import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {withRouter} from 'react-router'

import {  Col, FormControl, FormGroup, Button, Checkbox, Modal } from 'react-bootstrap'
 class SignIn extends React.Component{
	constructor(props){
		super(props);

		this.state={
			form: {
		        email: '',
		        password: '',
		    },
			showError: false,
			message: 'Unauthorized !'
		}
	}


	onChange = (key,e) => {
		let {form} = this.state;
		form[key] = e.target.value;
		this.setState({ form });
	}

	onSubmit = (evt) => {
	  evt.preventDefault();
	  console.log("Hit are comming from user", this.state.form);
	  let self = this;
	  axios.post(`https://taskmanagement-api.onrender.com/api/login`, this.state.form)
  		.then(res => {
  			sessionStorage.setItem('token',res.data.token);
				this.props.history.push('/');
			})

	  .catch(function (error) {
		self.setState({showError: true});
	    console.log(error.message);
	  });
    }
	signUp = () => {
    	this.props.history.push('/Signup')
    }
	render(){
		console.log(this.state.form);
		let close = () => this.setState({ showError: false });
		return(
			<Col sm={4} smOffset={4} style={{marginTop:'140px'}}>
				<Col>
				<form className="well" onSubmit={this.onSubmit}>
					<h1 style={{textAlign:'center', marginBottom:'20px'}}>Login</h1>
				    <FormGroup>
				      <FormControl type="text" placeholder="Email" onChange={this.onChange.bind(this,'email')} style={{height:'40px'}}/>
				    </FormGroup>
				    <FormGroup>
				      <FormControl type="password" placeholder="Password" onChange={this.onChange.bind(this,'password')} style={{height:'40px'}}/>
				    </FormGroup>
				    <FormGroup>
				    <Col>
				      <Checkbox style={{float:'left',marginTop:'0px'}}>Check me out</Checkbox>
				      <Link className="pull-right" to="/Signup">signup ?</Link>
				      </Col>
				    </FormGroup>
					<Modal
				      bsSize="small"
			          show={this.state.showError}
			          onHide={close}
			          container={this}
			          aria-labelledby="contained-modal-title"
			        >
			          <Modal.Header closeButton>
			          </Modal.Header>
			          <Modal.Body >
			          		<p style={{textAlign:'center'}}><b>{this.state.message}</b></p>
			          </Modal.Body>
			          <Modal.Footer>
			            <Button block bsStyle="primary" onClick={this.signUp}>Signup</Button>
			          </Modal.Footer>
			        </Modal>
				    <FormGroup>
				      <Button bsStyle="primary" style={{width:'100%', height:'40px',marginBottom:'10px'}} onClick={this.onSubmit} type="submit">submit</Button>
				    </FormGroup>
				 </form>
				 </Col>
			</Col>
		)
	}
}
export default withRouter(SignIn);