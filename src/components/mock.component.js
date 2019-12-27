import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.gender}</td>
    <td>{props.user.email}</td>
    <td>{props.user.dob.substring(0,10)}</td>

    {/*<td>{props.user.news}</td>*/}
      <td> {props.user.news ? 'oui' : 'oui'}</td>
      <td>{props.user.photo}</td>


    <td>
      <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUsers(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteUsers = this.deleteUsers.bind(this);

    this.state = {users: []};
  }



  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=100')
      .then(response => {
        console.log(response.data.results)
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })


  }



  deleteUsers(id) {

    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteUsers={this.deleteUsers} key={currentuser._id}/>;
    })
  }

  render() {

    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Date de Naiscance</th>
              <th>News</th>
              <th>Photo</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}
