import 'whatwg-fetch';
import _ from 'underscore';
import * as config from './config'
var baseUrl = config.baseUrl;

/*
* Example fatching data
* Not in used
* */

export  async function savePost(data, accessToken) {
    return await this._fetch({
        method: 'POST',
        url: '/Posts?access_token=' + accessToken,
        body: data
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function _fetch (opts) {
    opts = _.extend({
        method: 'GET',
        url: null,
        body: null,
        callback: null
    }, opts);

    let reqOpts = {
        method: opts.method,
        headers: {
        }
    };

    if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
        reqOpts.headers['Accept'] = 'application/json';
        reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
        reqOpts.body = JSON.stringify(opts.body)
    }

    let url = baseUrl + opts.url;
    let res = {};
    console.log(url)

    let response = await fetch(url, reqOpts);

    res.status = response.status;
    res.code = response.code;

    return response.json()
        .then((json) => {
            res.json = json;
            console.log(res)
            return res
        })
}