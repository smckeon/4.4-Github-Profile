// Addons
var $ = require ('jquery');
var _ = require ('underscore');
var githubtoken = require ('./gitapikey.js');
var Handlebars = require ('handlebars');
// var moment = require ('moment');

//
var infoApi = 'https://api.github.com/users/smckeon';
var repoApi = 'https://api.github.com/users/smckeon/repos';


// send auth token to github if token is provided... which it is.
if (githubtoken !== undefined) {
   $.ajaxSetup({
       headers: {
           'Authorization': 'token ' + githubtoken.token
       }

   });
}
// Header avatar
$.ajax(infoApi).done(function(data){
var avatarSource = $('#header-avatar-template').html();
var avatarTemplate = Handlebars.compile(avatarSource);
var avatar = {
  avatar: data.avatar_url
}
$('.dropdown-two').append(avatarTemplate(avatar));
});



// Aside
$.ajax(infoApi).done(function(data){
  var asideSource = $('#github-aside-template').html();
  var asideTemplate = Handlebars.compile(asideSource);
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

// Organizations
$.ajax(infoApi).done(function(data){
  var orgSource = $('#orgs-template').html();
  var orgTemplate = Handlebars.compile(orgSource);
  var orgListing = {
    organizations: data.organizations_url
  }
$('.orgs').append(orgTemplate(orgListing));
});

// Repos
$.ajax(repoApi).done(function(data){
// console.log(data);
  var source = $('#github-repos-template').html();
  var template = Handlebars.compile(source);

  data.forEach(function(item){
  // console.log(item);

    $(".github-repos").append(template(item));

  })
});
