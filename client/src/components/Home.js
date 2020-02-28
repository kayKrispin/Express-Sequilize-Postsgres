import React, { useEffect, useState } from 'react';
import api from "../api";
import { List, Button, Input, Tabs } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { NavLink } from "react-router-dom";

function Home() {

  const [users, setUsers] = useState([]);

  useEffect(  () => {
    api.getUsers(setUsers)

  }, []);

  const { register, handleSubmit, setValue, watch, reset, control } = useForm({
    defaultValues: {
      books: [{ name: "", author: "", test: "wtf" }],
    },
  }); // initialise the hook
  const { fields, append, remove } = useFieldArray({ control, name: "books" });


  const onSubmit = data => {
    api.addUser(data).then(() => api.getUsers(setUsers));
    reset()
  };

  const onSubmitBooks = data => {
    api.addUserWithBooks(data).then(() => api.getUsers(setUsers));
    reset()
  };

  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Add user" key="1">
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
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add users with books" key="3">
          <div>
            <h2>User info</h2>


            <div className="form-container">
              <form onSubmit={handleSubmit(onSubmitBooks)} action="">
                <Input
                  ref={register({ name: "username" })}
                  value={watch("username")}
                  onChange={e => setValue("username", e.target.value)}
                  placeholder="Name"
                />
                <Input
                  className="middle-input"
                  ref={register({ name: "password" })}
                  value={watch("password")}
                  onChange={e => setValue("password", e.target.value)}
                  placeholder="Password"
                />
                <h2>Books you have read</h2>

                {
                  fields.map((item, index) => {

                    return (
                      <div key={item.id} className="mb-1">

                        <Input
                          ref={register({name: `books[${index}].name`})}
                          onChange={(e) => setValue(`books[${index}].name`, e.target.value)}
                          value={watch(`books[${index}].name`)}
                          placeholder="Book"
                        />

                        <Input
                          className="middle-input"
                          ref={register({name: `books[${index}].author`})}
                          onChange={(e) => setValue(`books[${index}].author`, e.target.value)}
                          value={watch(`books[${index}].author`)}
                          placeholder="Author"
                        />

                        <Button style={{ marginBottom: "10px" }} onClick={() => remove(index)}>Remove</Button>

                      </div>
                    )
                  })
                }
                <Button style={{ marginBottom: "10px" }} onClick={() => append({ name: "books" })}>Add book</Button> <br/>
                <Button htmlType="submit" type="primary">Submit</Button>
              </form>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="All users" key="2">
          <h2>All users</h2>


          <List className="d-flex" size="large" >
            {
              users && users.map(({id, password, profile = {}, books}) => (
                <List.Item key={password}>
                  Password:
                  <NavLink to={`/user/${id}`}>
                    <strong> {password} </strong>
                  </NavLink> <br/>
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
        </Tabs.TabPane>

      </Tabs>
    </div>
  );
}

export default Home;
