import Ember from 'ember';
/**
    @module Mixin
*/

/**
    The post class mixin adds a post method to any class implementing this mixin that posts objects to the server.

    @class Post
    @namespace Mixin
*/

function request(URL, DATA, METHOD) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
                url: "/api/" + URL,
                data: DATA,
                method: METHOD,
                dataType: "json",
                WithCredentials: true
            })
            .success(function(data, c,d) {
                console.log(d.getAllResponseHeaders());
                resolve(data);
            })
            .fail(function(response) {
                reject(response.responseJSON || response.responseText);
            });
    });
}

export
default Ember.Mixin.create({
    /**
         This method is deprecated use method `post(object)` instead.

         @deprecated
         @method post
         @param {object} object An object that of data that is sent to the server.
         @param {function} callback A function callback that is called with either either null as data and an error
         object or the data with a null instead of error object.
     */

    /**
        The method for posting to the server, a callback can be provided, but rather proceding asyncrounous functions
        should be handled via the returned promise.

        This method is deprecated use method `POST(path, object)` instead.

        @deprecated
        @method post
        @param {object} object An object that of data that is sent to the server.
        @return {promise} A promise that is resolved with data from the server or rejected with an error_code otherwise.
    */

    /**
        The method for posting to the server, a callback can be provided, but rather proceding asyncrounous functions
        should be handled via the returned promise.

        This method is deprecated use method `POST(path, object)` instead.

        @method post
        @param path String gives the path to specific API
        @param {object} object An object that of data that is sent to the server.
        @return {promise} A promise that is resolved with data from the server or rejected with an error_code otherwise.
    */
    POST: function(path, object) {
        return request(path, object, "POST");
    },

    /**
        The method for getting from the server, a callback can be provided, but rather proceding asyncrounous functions
        should be handled via the returned promise.

        This method is deprecated use method `POST(path, object)` instead.

        @method get
        @param path String gives the path to specific API
        @param {object} object An object that of data that is sent to the server.
        @return {promise} A promise that is resolved with data from the server or rejected with an error_code otherwise.
    */
    GET: function(path, object) {
        return request(path, object, "GET");
    },

    /**
        The method for putting to the server, a callback can be provided, but rather proceding asyncrounous functions
        should be handled via the returned promise.

        This method is deprecated use method `POST(path, object)` instead.

        @method post
        @param path String gives the path to specific API
        @param {object} object An object that of data that is sent to the server.
        @return {promise} A promise that is resolved with data from the server or rejected with an error_code otherwise.
    */
    PUT: function(path, object) {
        return request(path, object, "PUT");
    },

    /**
        The method for deleting from the server, a callback can be provided, but rather proceding asyncrounous functions
        should be handled via the returned promise.

        This method is deprecated use method `POST(path, object)` instead.

        @method post
        @param path String gives the path to specific API
        @param {object} object An object that of data that is sent to the server.
        @return {promise} A promise that is resolved with data from the server or rejected with an error_code otherwise.
    */
    DELETE: function(path, object) {
        return request(path, object, "DELETE");
    }
});