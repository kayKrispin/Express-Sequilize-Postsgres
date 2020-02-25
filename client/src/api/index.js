const getUsers = async handler => {

  try {
    const response = await fetch("http://localhost:8080/api/user", { method: 'GET' });
    const users = await response.json();
    handler(users);
  } catch (e) {
    console.log(e)
  }
};

const getUser = async id => {

  try {
    const response = await fetch(`http://localhost:8080/api/user/${id}`, { method: 'GET' });
    const user = await response.json();

    return user;
  } catch (e) {
    console.log(e)
  }
};

const addUser = async data => {

  try {
    return await fetch("http://localhost:8080/api/user",
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  } catch (e) {
    console.log(e)
  }
};


const getBooks = async () => {

  try {
    const response = await fetch("http://localhost:8080/api/book", { method: 'GET' });
    const books = await response.json();

    return books;
  } catch (e) {
    console.log(e)
  }
};

const addUserBooks = async data => {

  try {
    return await fetch(`http://localhost:8080/api/user/${data.id}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  } catch (e) {
    console.log(e)
  }
};

const getRoles = async () => {

  try {
    const response = await fetch("http://localhost:8080/api/role", { method: 'GET' });
    const roles = await response.json();

    return roles;
  } catch (e) {
    console.log(e)
  }
};

export default {
  getUsers,
  addUser,
  getBooks,
  getUser,
  getRoles,
  addUserBooks
}
