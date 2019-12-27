import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);


    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onChangeNews = this.onChangeNews.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
      news: true,
      date: new Date(),
      email: '',
      photo: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
        .then(response => {
          console.log(response.data)
          this.setState(
              {
              username: response.data.username,
                  gender: response.data.gender,
                  news: response.data.news,
                  date: new Date(response.data.dob),
                  email: response.data.email,
                  photo: response.data.photo
            }
          )
        })
        .catch((error) => {
          console.log(error);
        })
/*
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })*/

  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }


  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  }

  onChangeNews(e) {
    this.setState({
      news: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      gender: this.state.gender,
      photo: this.state.photo,
      dob: this.state.date,
      email: this.state.email,
      news: this.state.news
    };
    console.log(exercise)


    axios.put('http://localhost:5000/users/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    // window.location = '/';
  }

  render() {
    return (
        <div>
          <h3>Modifier User</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <input  type="text"
                      required
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
              />
            </div>

            <div className="form-group">
              <label>Genre: </label>
              <select ref="userInput"
                      required
                      className="form-control"
                      value={this.state.gender}
                      onChange={this.onChangeGender}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="form-group">
              <input className="form-check-input" type="checkbox" value={this.state.news} onChange={this.onChangeNews} id="defaultCheck1"/>
              <label className="form-check-label" htmlFor="defaultCheck1">
                News
              </label>

            </div>

            <div className="form-group">
              <label>Email: </label>
              <input  type="text"
                      required
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
              />
            </div>




            <div className="form-group">
              <label>Photo: </label>
              <input  type="text"
                      required
                      className="form-control"
                      value={this.state.photo}
                      onChange={this.onChangePhoto}
              />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                />
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Modifier User" className="btn btn-primary" />
            </div>
          </form>
        </div>
    )
  }
}
