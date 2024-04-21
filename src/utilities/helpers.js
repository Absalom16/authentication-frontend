const url = "http://localhost:3333";

export function register(data, callback) {
  fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const statusCode = res.status;

      return res.json().then((result) => {
        callback({ status: statusCode, message: result.message });
      });
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
    .then(async (res) => {
      const statusCode = res.status;

      return res.json().then((result) => {
        callback({
          status: statusCode,
          message: result.message,
          user: statusCode == 200 ? result.user : "",
        });
      });
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function demo(data, callback) {
  fetch(`${url}/demo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const statusCode = res.status;

      return res.json().then((result) => {
        callback({ status: statusCode, message: result.message });
      });
    })
    .catch((err) => {
      console.error("Error", err);
    });
}
