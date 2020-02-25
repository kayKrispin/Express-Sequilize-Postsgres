import React, { useEffect, useState } from "react";
import { Select, Tabs, Button, List } from "antd";
import api from "../api";

const User = ({ match }) => {

  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [userBooks, setUserBooks] = useState([]);


  const { TabPane } = Tabs;

  useEffect(() => {
    api.getBooks().then((books) => setBooks(books));
    api.getRoles().then((roles) => setRoles(roles));
    api.getUser(match.params.id).then(user => setUser(user))

  }, [match.params.id]);

  const onChange = value => {
    setUserBooks(value)
  };


  const addUserBooks = (id) => {

    const data = {
      id: id,
      data: userBooks
    };

    api.addUserBooks(data)
  };

  const booksSet = books && [...books];
  const userBooksSet = user.books && [...user.books];

  const differenceBooks = booksSet && userBooksSet &&
    booksSet.filter((item) => !userBooksSet.find(userBook => item.id === userBook.id));

  return (
    <div className="user-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="User Info" key="1">
          <List itemLayout="vertical" className="d-flex" size="large" >

                <List.Item>
                  Password:
                    <strong> {user.password} </strong> <br/>
                  Fullname :
                  <strong> {user.profile &&  user.profile.fullname} </strong> <br/>

                  <strong>Books readed : </strong> <br/> {
                  user.books && user.books.map(({ name }) =>
                      <div key={name}>
                        {name}
                      </div>)
                  }
                  <strong>Roles : </strong> {
                  user.roles && user.roles.map(({ role_name }) =>
                    <div key={role_name}>
                      {role_name}
                    </div>)
                }
                </List.Item>
          </List>
        </TabPane>
        <TabPane tab="Add books" key="2">
          <div>
            <form className="book-form" action="">
              Make user more inteligent
              <Select
                className="middle-input"
                mode="multiple"
                style={{ width: '30%' }}
                placeholder="Please select books"
                onChange={onChange}
              >
                {
                  differenceBooks && differenceBooks.map(( {id, name, author }) => (
                    <Select.Option value={id} key={name}>{name} <strong>by</strong> {author} </Select.Option>
                  ))
                }
              </Select>

              <Button type="primary" onClick={() => addUserBooks(match.params.id)} >Add Books</Button>
            </form>
          </div>
        </TabPane>
        <TabPane tab="Add roles" key="3">
          <div>
            <form className="book-form" action="">
              Make user more narkoman
              <Select
                className="middle-input"
                mode="multiple"
                style={{ width: '30%' }}
                placeholder="Please select additional roles"
                onChange={onChange}
              >
                {
                  roles.map(( { id, role_name }) => (
                    <Select.Option value={id} key={id}>{role_name}</Select.Option>
                  ))
                }
              </Select>

              <Button type="primary" >Add Roles</Button>
            </form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
};

export default User;
