import React, { useEffect, useState } from 'react';
import api from "../api";
import { List, Button, Input } from "antd";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

function Home() {

  const [users, setUsers] = useState([]);

  useEffect(  () => {
    api.getUsers(setUsers)

  }, []);

  const { register, handleSubmit, setValue, watch, reset } = useForm(); // initialise the hook

  const onSubmit = data => {
    api.addUser(data).then(() => api.getUsers(setUsers))
    reset()
  };


  return (
    <div className="App">

      <div>
        <h2>Add user</h2>

        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <Input
              ref={register({ name: "username" })}
              value={watch("username")}
              onChange={e => setValue("username", e.target.value)}
              placeholder="Username"
            />
            <Input
              className="middle-input"
              ref={register({ name: "password" })}
              value={watch("password")}
              onChange={e => setValue("password", e.target.value)}
              placeholder="Password"
            />
            <Button htmlType="submit" type="primary">Submit</Button>
          </form>
        </div>
      </div>

      <List itemLayout="vertical" className="d-flex" size="large" >
        {
          users && users.map(({id, password, profile = {}, books}) => (
            <List.Item key={password}>
              Password:
              <NavLink to={`/user/${id}`}>
                <strong> {password} </strong>
              </NavLink>
                Fullname :
              <strong> {profile && profile.fullname} </strong> <br/>

              <strong>Books readed :  {
                books.map(({ name }) =>
                  <div key={name}>
                    {name}
                  </div>)
              }
              </strong>
            </List.Item>
          ))
        }
      </List>
    </div>
  );
}

export default Home;
