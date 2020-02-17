import React from 'react';
//import logo from './logo.svg';
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

    componentDidUpdate(prevState) {
        console.log("componentDidUpdate running");

        if (prevState.dogs !== this.state.dogs) {
            console.log("Dogs have changed :)");

            if (this.state.dogText === "pomeranian") {
                console.log("pomeranians :(");

                fetch("https://dog.ceo/api/breed/husky/images")
                .then(res => res.json())
                .then(dogs => this.setState({ dogText: "husky", dogs: dogs.message }))
                .catch(err => console.log("No dogs :(", err));
            }
        }
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
