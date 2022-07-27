const domain = "http://localhost:8080";


export const login = (credential, asManager) => {
  const loginUrl = `${domain}/authenticate/${asManager ? "manager" : "residen"}`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to login");
    }

    return response.json();
  });
};

export const register = (credential, asManager) => {
  const registerUrl = `${domain}/register/${asManager ? "manager" : "resident"}`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};