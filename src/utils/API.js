import { LocalStorageManager } from "./LocalStorageManager";
// import API from "../utils/API";

export default class API {
  constructor() {
    this._devApiUrl = "http://localhost:4000";
    this._imagePath = "http://localhost:4000/";
  }

  get apiUrl() {
    return this._devApiUrl;
  }

  get imagePath() {
    return this._imagePath;
  }

  async getData(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorageManager.getItem("token")}`,
      },
    });

    const responseJson = await response.json();
    return responseJson;
  }

  async postData(url, data, isMultipart) {
    let response;

    if (isMultipart) {
      response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LocalStorageManager.getItem("token")}`,
        },
        body: data,
      });
    } else {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LocalStorageManager.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
    }

    const responseJson = await response.json();
    return responseJson;
  }

  async putData(url, data, isMultipart) {
    let response;

    if (isMultipart) {
      response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${LocalStorageManager.getItem("token")}`,
        },
        body: data,
      });
    } else {
      response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LocalStorageManager.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
    }

    const responseJson = await response.json();
    return responseJson;
  }

  async deleteData(url, data) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorageManager.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    return responseJson;
  }
}
