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
  const listPersonalInvoiceUrl = `${domain}/personal_invoice`;

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
}

// export const unreadPolling = (type, setUnreadNum, setCount) => {
//   const authToken = localStorage.getItem("authToken");
//   const pollUrl = `${domain}/watch?type=${type}`;
//   return fetch(pollUrl, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   }).then((response) => {
//     if (response.status !== 200) {
//       console.log("time out" + response.status)
//     }
//     else {
//       setUnreadNum(type, setCount)
//       console.log("end set")
//     }
//     unreadPolling(type, setUnreadNum, setCount)
//   });
// }

export const unreadPollingPersonal = (setNum, setCount1, type1, setCount2, type2, setCount3, type3, setCount4, type4) => {
  const authToken = localStorage.getItem("authToken");
  const pollUrl = `${domain}/watch?type=PERSONAL`;
  console.log(pollUrl);
  return fetch(pollUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      console.log("time out" + response.status)
    }
    else {
      console.log("200!!")
      setNum(type1, setCount1)
      setNum(type2, setCount2)
      setNum(type3, setCount3)
      setNum(type4, setCount4)
      console.log("end set")
    }
    unreadPollingPersonal(setNum, 
      setCount1, type1, 
      setCount2, type2, 
      setCount3, type3, 
      setCount4, type4)
  });
}

export const unreadPollingPublic = (type, setUnreadNum, setCount, loadData) => {
  const authToken = localStorage.getItem("authToken");
  const pollUrl = `${domain}/watch?type=${type}`;
  return fetch(pollUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      console.log("time out" + response.status)
    }
    else {
      setUnreadNum(type, setCount)
      console.log("end set")
      loadData();
    }
    unreadPollingPublic(type, setUnreadNum, setCount, loadData);
  });
}

export const sendMaintenanceRequest = (data) => {
  const authToken = localStorage.getItem("authToken");
  const requestUrl = `${domain}/maintenance`;

  return fetch(requestUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to send request");
    }
  });
}

export const getAllMaintenanceRequest = () => {
  const authToken = localStorage.getItem("authToken");
  const requestUrl = `${domain}/maintenance`;

  return fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get all maintenance requests");
    }
    return response.json();
  });
}

export const getAllMaintenanceRequestById = () => {
  const authToken = localStorage.getItem("authToken");
  const requestUrl = `${domain}/maintenance/resident`;

  return fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get your maintenance requests");
    }
    return response.json();
  });
}

export const updateMaintenanceRequest = (id, data) => {
  const authToken = localStorage.getItem("authToken");
  const updateUrl = `${domain}/maintenance?id=${id}`;

  return fetch(updateUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to update request");
    }
  });
}

export const getAllPublicUtils = () => {
  const authToken = localStorage.getItem("authToken");
  const publicUtilsUrl = `${domain}/public_utils`;

  return fetch(publicUtilsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get all public utils");
    }
    return response.json();
  });
}

export const addPublicUtil = (data) => {
  const authToken = localStorage.getItem("authToken");
  const addUrl = `${domain}/public_utils`;

  return fetch(addUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to add public utils");
    }
  });
}

export const reservePublicUtil = (category, date, timeFrame) => {
  const authToken = localStorage.getItem("authToken");
  const reserveUrl = new URL(`${domain}/public_utils/reserve/`);
  reserveUrl.searchParams.append("category", category);
  reserveUrl.searchParams.append("date", date);
  reserveUrl.searchParams.append("time_frame", timeFrame);

  return fetch(reserveUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search stays");
    }
  });
}

export const getAvailableTimeFrame = (category) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/public_utils/available?category=${encodeURI(category)}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
    
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get available time slots")
    }
    return response.json();
  })
}

export const listAllPublicUtilsReservations = () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${domain}/public_utils/list`;

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get reservations")
    }
    return response.json();
  })
}

export const cancelReservation = (data) => {
  const authToken = localStorage.getItem("authToken");
  const deleteUrl = `${domain}/public_utils`;
  return fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to cancel reservation")
    }
  })
}

export const fetchMessages = () => {
  const authToken = localStorage.getItem("authToken");
  const msgUrl =  `${domain}/messages`;
  return fetch(msgUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to fetch messages")
    }
    return response.json()
  })
}

export const sendMessage = (data) => {
  const authToken = localStorage.getItem("authToken");
  const msgUrl =  `${domain}/messages`;
  return fetch(msgUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to send message")
    }
  })
}

export const pollMessage = async (email, loadData) => {
  const authToken = localStorage.getItem("authToken");
  const pollUrl = `${domain}/watch/${email}`;
  const resp = await fetch(pollUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  if (resp.status !== 200) {
    console.log("time out" + resp.status)
  }
  else {
    console.log("200!")
    loadData();
  }
  await pollMessage(email, loadData);
}

export const getUser = () => {
  const authToken = localStorage.getItem("authToken");
  const msgUrl =  `${domain}/user`;
  return fetch(msgUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get user")
    }
    return response.json();
  })
}