import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            userText: ""
        };
    }

    componentDidMount() {
        axios.get("https://api.github.com/users/ZachM89")
            .then(res => {//res.json()
                console.log(res);
            })
            .then(users => this.setState({ users: users.message }))
            .catch(err => console.log("Data not found", err));
    }

    handleChanges = e => {
        this.setState({ userText: e.target.value });
        console.log(e.target.value);
    }

    componentDidUpdate(prevState) {
        if (prevState.users !== this.state.users) {
            console.log("Users have changed");

            //if (this.state.userText === ")
        }
    }

    fetchUsers = e => {
        e.preventDefault();

        axios.get(`https://api.github.com/users/${this.state.userText}`)
            .then(res => {
                console.log(res);
            })
            .then(users => this.setState({ users: users.message }))
            .catch(err => console.log("No data", err));
    };

    render() {
        return (
            <div className="App">
                <h1>GitHub Users</h1>
                    <input
                        type="text"
                        value={this.state.userText}
                        onChange={this.handleChanges}
                    />
                <button onClick={this.fetchUsers}>Fetch Users</button>
                <div>
                    {this.state.users.map(user => (
                        <img width="200" src={user} key={user} alt={user} />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
