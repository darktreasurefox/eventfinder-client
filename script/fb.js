function statusChangeCallback(response) {
  if (response.status === 'connected') {
    // testAPI();
    axios.post('http://localhost:3000/api/users/login', {
      token: response.authResponse.accessToken
    })
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      window.location = "http://localhost:8080/homepage.html";
      
    })
    .catch(function (error) {
      console.log('server down',error);
        $('#alert').css("display","block")

    })
  }
}


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '2190548590958522',
    // cookie     : true,  // enable cookies to allow the server to access 
    //                     // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
  // console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    // console.log('Successful login');
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}