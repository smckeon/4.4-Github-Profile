var $ = require ('jquery');
var _ = require ('underscore');
var githubtoken = require ('./gitapikey.js');
var Handlebars = require ('handlebars');

// send auth token to github if token is provided... which it is.
if (githubtoken !== undefined) {
   $.ajaxSetup({
       headers: {
           'Authorization': 'token ' + githubtoken.token
       }

   });
}

// Aside
var asideSource = $('#github-aside-template').html();
var asideTemplate = Handlebars.compile(asideSource);

$.ajax('https://api.github.com/users/smckeon').done(function(data){
  var asideItem = {
    avatar: data.avatar_url,
    name: data.name,
    login: data.login,
    bio: data.bio,
    location: data.location,
    email: data.email
  }
  $('#github-aside').append(asideTemplate(asideItem));
});

// Repos

$.ajax('https://api.github.com/users/smckeon/repos').done(function(data){

  var source = $('#github-repos-template').html();
  var template = Handlebars.compile(source);

  $('.github-repos').append(template(data));
});
