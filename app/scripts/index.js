var $ = require ('jquery');
var Handlebars = require ('handlebars');
var _ = require ('underscore');
var githubtoken = require ('.gitapikey.js');

// send auth token to github if token is provided... which it is.
if (githubtoken !== undefined) {
   $.ajaxSetup({
       headers: {
           'Authorization': 'token ' + githubtoken.token
       }

   });
}
