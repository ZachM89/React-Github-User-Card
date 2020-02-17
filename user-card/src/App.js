import React from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: ['one','two','three'],
        };
    }

    

    // componentDidMount() {
    //     this.fetchUsers();
    // }

    handleChanges = e => {
        this.setState({ userText: e.target.value });
        // console.log(e.target.value);
    }

    testing = e => {
        e.preventDefault();
        console.log(this.state.userText);
        axios.get(`https://api.github.com/users/${this.state.userText}`)
        .then( res => {
            //console.log(this.state.userText);
            console.log(res.data);
            this.setState({users: [res.data]})
        })
        console.log(this.state.users);

        //this.setState({users: ['test']});
    }


    // fetchUsers = e => {
    //     // e.preventDefault();

    //     axios.get(`https://api.github.com/users/raajnpatel`)
    //         .then(res => {
    //             console.log(res.data)
    //             this.setState({ users: res.data })
    //             console.log(this.state.users);
    //         })
    //         .catch(err => console.log("No data", err));
    // };

    render() {
        return (
            <div className="App">
                <h1>GitHub Users</h1>
                <div className="search-container">
                    <input
                        type="text"
                        value={this.state.userText}
                        onChange={this.handleChanges}
                    />
                    <button onClick={this.testing}>Fetch Users</button>
                </div>
                <div className="card-container">
                    {this.state.users.map(user => {
                            console.log(user)
                            return (
                                <div className="user-card">
                                    <p>{user.login}</p>
                                    <p>{user.name}</p>
                                    <p>{user.location}</p>
                                </div>
                            )
                        })}
                </div>
                    
                    
            </div>
        );
    }
}

export default App;
