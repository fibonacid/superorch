export const API_ENDPOINT = `http://localhost:5000/graphql`;

const request = (body) => ({
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  }
});

const Api = {
  signUp: (email, password) => {
    return fetch(
      API_ENDPOINT,
      request({
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      }
    ))
  }
};

export default Api;
