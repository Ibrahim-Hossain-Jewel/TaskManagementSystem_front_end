import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {withRouter} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {  Col, FormControl, FormGroup, Button, Checkbox, Modal } from 'react-bootstrap'
 class Tasklist extends React.Component{
	constructor(props){
		super(props);

		this.state={}
    }

    render(){
        return(<div>
            <h2>List of task</h2>
        </div>);
    }
 }
 
const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

 export default withRouter(connect(mapStateToProps,
    mapDispatchToProps)(Tasklist))