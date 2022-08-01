const domain = "http://localhost:8080";


export const login = (credential, asManager) => {
  const loginUrl = `${domain}/authenticate/${asManager ? "manager" : "resident"}`;
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

export const sendPublicInvoice = (data) => {
  const authToken = localStorage.getItem("authToken");
  const listPublicInvoiceUrl = `${domain}/public_invoice`;

  return fetch(listPublicInvoiceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to send public invoice");
    }
  });
};

export const getPublicInvoice = () => {
  const authToken = localStorage.getItem("authToken");
  const getPublicInvoiceUrl = `${domain}/public_invoice`;

  return fetch(getPublicInvoiceUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to fetch public invoice");
    }
 
    return response.json();
  });
};

export const sendPersonalInvoice = (data) => {
  const authToken = localStorage.getItem("authToken");
  const listPersonalInvoiceUrl = `${domain}/unread_nums/personal_invoice`;

  return fetch(listPersonalInvoiceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to send personal invoice");
    }
  });
};

export const getPersonalInvoice = (type) => {
  const authToken = localStorage.getItem("authToken");
  const getPersonalnvoiceUrl = `${domain}/personal_invoice?type=${type}`;

  return fetch(getPersonalnvoiceUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get personal invoice");
    }
    return response.json();
  });
};

export const getUnreadNum = (type) => {
  const authToken = localStorage.getItem("authToken");
  const getPublicInvoiceUrl = `${domain}/unread_nums?type=${type}`;

  return fetch(getPublicInvoiceUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get unread nums");
    }
    return response.json();
  });
};

export const clearPublicInvoice = () => {
  const authToken = localStorage.getItem("authToken");
  const clearPublicInvoiceUrl = `${domain}/unread_nums/clear_public`;

  return fetch(clearPublicInvoiceUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to clear public invoice");
    }
  });
};

export const clearPersonalInvoice = (type) => {
  const authToken = localStorage.getItem("authToken");
  const clearPersonalInvoiceUrl = `${domain}/unread_nums/clear_personal?type=${type}`;

  return fetch(clearPersonalInvoiceUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to clear public invoice");
    }
  });
};

export const checkDue = () => {
  const authToken = localStorage.getItem("authToken");
  const checkDueUrl = `${domain}/due`;

  return fetch(checkDueUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to send public invoice");
    }
  });
};


