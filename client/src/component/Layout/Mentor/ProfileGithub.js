import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProfileGithub extends Component {

    state = {
        clientId: "9c045b09955937cd328b",
        clientSecret: "3fcbe80031120f0ccd0dee637c87205d258ed904",
        count: 5,
        sort: "created: asc",
        repos: []
    }

    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        ).then(res => res.json()).then(data => {
            if (this.refs.myRef) {
                this.setState({ repos: data })
            }
        })
    }

    render() {
        const { repos } = this.state;

        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars:{repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers:{repo.watchers_count}
                        </span>
                        <span className="badge badge-success mr-1">
                            Forks:{repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ))
        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        )
    }
}

export default ProfileGithub