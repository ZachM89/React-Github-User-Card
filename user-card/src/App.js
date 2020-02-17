import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            followers: [],
            followerMsg: ''
        };
    }

    

    // componentDidMount() {
    //     this.fetchUsers();
    // }

    handleChanges = e => {
        this.setState({ userText: e.target.value });
        // console.log(e.target.value);
    }

    fetchUsers = e => {
        e.preventDefault();
        //console.log(this.state.userText);
        axios.get(`https://api.github.com/users/${this.state.userText}`)
            .then( res => {
                //console.log(this.state.userText);
                console.log(res.data);
                this.setState({users: [res.data]})
                
        })
        axios.get(`https://api.github.com/users/${this.state.userText}/followers`)
            .then( res=> {
                console.log(res);
                this.setState({followers: res.data})
                if(this.state.followers.length > 0) {
                    console.log(this.state.followers.length)
                    if(this.state.followers.length === 1){
                        this.setState({follwerMsg: `Mr popular over here with his ${this.state.followers.length} follower`})
                    } else {
                        this.setState({follwerMsg: `Mr popular over here with his ${this.state.followers.length} followers`})
                    }
                } else {
                    this.setState({follwerMsg: 'LOL this guy has no friends'})
                }
            })
        //console.log(this.state.users);
    }

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
                    <button onClick={this.fetchUsers}>Fetch Users</button>
                </div>
                <div className="card-container">
                    {console.log(this.state.followers)}
                    {this.state.users.map(user => {
                        //console.log(user)
                        return (
                            <div className="user-card">
                                <img src={user.avatar_url} alt={user.avatar_url}/> 
                                <p>{user.login}</p>
                                <p>{user.name}</p>
                                <p>{user.location}</p>
                            </div>
                        )
                    })}
                    
                </div>
                
                <h3>{this.state.follwerMsg}</h3>
                <div className="followers-container">
                    {console.log(this.state.followers.data)}
                    
                    {this.state.followers.map(follower => {
                        return (
                            <div>
                                
                                <p>{follower.login}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default App;
