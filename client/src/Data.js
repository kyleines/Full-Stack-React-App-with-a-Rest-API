// import axios from "axios";

export default class Data {
    api(path, method = "Get", body = null, reqAuth = false, creds = null) {
        const apiBaseUrl = "http://localhost:5000/api";
        const url = apiBaseUrl + path;
        const options = {
            method,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (reqAuth) {
            const encodedCreds = btoa(`${creds.emailAddress}:${creds.password}`);
            options.headers["Authorization"] = `Basic ${encodedCreds}`;
        }

        return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const res = await this.api("/users", "Get", null, true, {emailAddress, password});
        
        if (res.status === 200) {
            return res.json().then(data => data);
        } else if (res.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    async createUser(user) {
        const res = await this.api("/users", "Post", user);

        if (res.status === 201) {
            return [];
        } else if (res.status === 400) {
            return res.json().then(data => data.errors);
        } else {
            throw new Error();
        }
    }
}