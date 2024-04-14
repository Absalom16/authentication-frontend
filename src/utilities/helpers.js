const url = "http://localhost:3333";

export function register(data, callback) {
  fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      result.status = 200;
      callback(result);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function login(data, callback) {
  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      result.status = 200;
      callback(result);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}
