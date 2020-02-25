import React, { useEffect, useState } from 'react';
import './App.css';
import api from "./api";
import { List, Button, Input } from "antd";
import { useForm } from "react-hook-form";
import Home from "./components/Home";
import User from "./components/User";

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/user/:id" exact component={User}/>
        </Switch>
  );
}

export default App;
