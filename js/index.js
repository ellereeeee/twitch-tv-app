jQuery(function($){
  
  var streamersArr = ["ESL_SC2", "SaltyBet", "OgamingSC2", "cretetion", "FreeCodeCamp", "comster404"];
  
  function callAPI(section, streamer, callback) {
    $.getJSON('https://wind-bow.gomix.me/twitch-api/' + section + '/' + streamer + '?callback=?', function(data) {
      callback(data);
    }) // close getJSON
  } // close callAPI
  
  // check if user exists.  If not, tell user, if they do, add display_name and logo
  streamersArr.forEach(function(streamer) {
    callAPI('channels', streamer, function(channelData) {
      // if user does not exist, inform user
      if (channelData.status === 404) {
        $('#result-container').append('<div class="result error row"><div class="col-xs-4 col-sm-2 col-md-2"><div class="pic"><img class="img-responsive" src="https://res.cloudinary.com/devvzv96d/image/upload/v1479131984/white-error-256_vix4cw.png"></div></div><div class="col-xs-6 col-sm-3 col-md-2 user result-text">' + streamer + '</div><div class="col-xs-8 col-sm-6 col-md-4 result-text"><em>Account does not exist</em></div></div>');
        console.log('Unavailable: ' + streamer);
      } // close if statement
      else {
        callAPI('streams', streamer, function(streamData) {
          if (streamData.stream === null) {
          // if user is not streaming, get their info and show that they're offline
          $('#result-container').append('<a target="_blank" href="' + channelData.url + '"><div class="result offline row"><div class="col-xs-4 col-sm-2 col-md-2"><div class="pic"><img class="img-responsive" src="' + channelData.logo + '"></div></div><div class="col-xs-6 col-sm-3 col-md-2 user result-text">' + channelData.display_name + '</div><div class="col-xs-8 col-sm-4 col-md-3 result-text"><em>Offline</em></div></div></a>');
          console.log('Offline: ' + streamer);
         } // close if statement
        
        else {
          // get data for online users
          $('#result-container').append('<a target="_blank" href="' + channelData.url + '"><div class="result online row"><div class="col-xs-4 col-sm-2 col-md-2"><div class="pic"><img class="img-responsive" src="' + channelData.logo + '"></div></div><div class="col-xs-6 col-sm-3 col-md-2 result-text user">' + channelData.display_name + '</div><div class="col-xs-6 col-sm-4 col-md-3 result-text"><em>' + channelData.game + '</em></div><div class="status hidden-xs col-sm-9 col-md-9"><span style="font-size:.8em;"><em>' + channelData.status + '</em></span></div></div></a>');
            console.log('Online: ' + streamer);
          } // close else statement
        }) // close getJSON statement
      } // close else statement
    }) // close getJSON method
  }); // close forEach method

  // make the buttons and search form work
  $('#on').click(function() {
    $('.result').hide();
    $('.online').slideDown('slow');
  }) // close "On" function
    
  $('#off').click(function() {
    $('.result').hide();
    $('.offline').slideDown('slow');
  }) // close "Off" function
    
  $('#all').click(function() {
    $('.result').hide();
    $('.result').slideDown('slow');
  }) // close "All" function
    
  $('#search-input').keyup(function() {
    var input = $(this).val().toLowerCase();
    $('.user').each(function() {
      var display_name = $(this).html().toLowerCase();
      if (display_name.includes(input)) {
        $(this).parent().show();
      }
      else {
        $(this).parent().hide();
      }
    }) // close each function 
  }) // close keyup function 

}) // close jQuery(function($)