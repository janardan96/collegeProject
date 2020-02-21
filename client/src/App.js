import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthStore } from "./Provider/auth";
import Fotter from "./component/Layout/Fotter";
import PrivateRoute from "./Provider/ProtectedRoute";


import "./App.css";
import Navbar from "./component/Layout/Navbar";
import Landing from "./component/Layout/Landing";
import Register from "./component/Auth/Register";
import ForgotPassword from "./component/Auth/ForgotPassword";
import Login from "./component/Auth/Login";
import ResetPassword from "./component/Auth/ResetPassword";
import ProfileDashboard from "./component/Layout/Dashboard/Dashboard";
import CreateProfile from "./component/Layout/create-profile/CreateProfile";
import Editprofile from "./component/Layout/Edit-Profile/EditProfile";
import AddEducation from "./component/Layout/Education/addEducation";
import AddInternship from "./component/Layout/Experience/AddInternship";
import Profiles from "./component/Layout/Profiles/Profiles";
import Profile from "./component/Layout/Mentor/Profile"
import NotFound from "./component/Layout/NotFound/NotFound";
import MentorDashboard from "./component/Layout/MentorDashboard/Mdashboard"
import CreateMentorProfile from "./component/Layout/create-profile/MentorProfile";
import MentorExperience from "./component/Layout/Experience/Addexperience";
import Chat from "./component/Layout/ChatLayout/chat/chat";
class App extends Component {

  state = {};

  render() {
    return (
      <React.Fragment>
        <AuthStore>
          <Router>
            <div className="App">
              <Navbar />

              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/forgot" component={ForgotPassword} />
                <Route path="/profiles" component={Profiles} />
                <Route path="/profile/:userId" component={Profile} />
                <Route
                  path="/user/password/reset/:token"
                  component={ResetPassword}
                />
                <PrivateRoute path="/dashboard" component={ProfileDashboard} />
                <PrivateRoute
                  path="/create-profile"
                  component={CreateProfile}
                />

                <PrivateRoute path="/edit-profile" component={Editprofile} />
                <PrivateRoute
                  path="/add-experience"
                  component={AddInternship}
                />
                <PrivateRoute path="/add-education" component={AddEducation} />
                <PrivateRoute path="/create-mentor" component={CreateMentorProfile} />
                <PrivateRoute path="/mentor/add-experience" component={AddInternship} />
                <PrivateRoute path="/mentor/dashboard" component={MentorDashboard} />
                <PrivateRoute path="/user/chat/:id" component={Chat} />
              </Switch>
              <Route path="/not-found" component={NotFound} />

              <Fotter />
            </div>
          </Router>
        </AuthStore>
      </React.Fragment>
    );
  }
}

export default App;
