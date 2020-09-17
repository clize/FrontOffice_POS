import React, { Component } from 'react';
import ApiService from "../../ApiService";
import { TextField } from '@material-ui/core';

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class AddUserComponent extends Component {

    constructor(props) {
        super(props) ;

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            age: '',
            salary: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            salary: this.state.salary,
        }

        ApiService.addUser(user)
        .then( res => {
            this.setState({
                message: user.username + '��� ����.'
            })
            console.log(this.state.message);
            this.props.history.push('/users');
        })
        .catch( err => {
            console.log('saveUser() ����', err);
        });
    }

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>
                <TextField type="text" placeholder="please input your username" name="username"
                fullWidth margin="normal" value={this.state.username} onChange={this.onChange} />

                <TextField type="password" placeholder="please input your password" name="password"
                fullWidth margin="normal" value={this.state.password} onChange={this.onChange} />
                
                <TextField placeholder="please input your firstname" name="firstname"
                fullWidth margin="normal" value={this.state.firstname} onChange={this.onChange} />

                <TextField placeholder="please input your lastname" name="lastname"
                fullWidth margin="normal" value={this.state.lastname} onChange={this.onChange} />               

                <TextField type="number" placeholder="please input your age" name="age"
                fullWidth margin="normal" value={this.state.age} onChange={this.onChange} /> 

                <TextField type="number" placeholder="please input your salary" name="salary"
                fullWidth margin="normal" value={this.state.salary} onChange={this.onChange} /> 

                <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

                </form>
                
            </div>
        );
    }

}

const formContainer = {
    display: 'flex',
    flexFlow: 'row warp'
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default AddUserComponent;