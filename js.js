$(document).ready(function(){

  var lon, lat, openweathermap;
  var elMap = document.getElementById('results');
  var msg = "Sorry, we were unable to get your location";


  $('#cur-location').on('click', function(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, fail);
        elMap.textContent = 'Checking location...';
    } else {
      console.log('nope');
    }

    function success(position) {
      lon = position.coords.longitude
      lat = position.coords.latitude
      var api_key = '{{YOUR_API_KEY}}'
      $.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+api_key, function(res) {
        console.log(res);
        tempF = ((res['main'].temp - 273.15) * (9/5) + 32).toFixed(2)
        tempC = ((tempF - 32) * (5/9)).toFixed(2);
        var iconCode = res['weather'][0].icon
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        console.log(iconUrl);
        var html = '';
        html += '<img src="'+iconUrl+'">'
        html += '<p>'+res['name']+': '+res['weather'][0].main+'</p>'
        html += '<p>'+res['weather'][0].description+'</p>'
        html += '<p id="tempF">Temperature: '+tempF+'\&#8457;</p>'
        html += '<p id="tempC" hidden>Temperature: '+tempC+'\&#8451;</p>'
        html += '<p>Country: '+ res['sys'].country +'</p>'
        elMap.innerHTML = html

      }, 'json')
      return false;
    }

    function fail(msg) {
      elMap.textContent = msg;
      console.log(msg.code);
    }
  })


  $('form').submit(function(){
    console.log(lon, lat);
        var api_key = '{{YOUR_API_KEY}}'
        var city = $('input#city').val();
        $.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&&appid='+api_key, function(res) {
          console.log(res);
          tempF = ((res['main'].temp - 273.15) * (9/5) + 32).toFixed(2)
          tempC = ((tempF - 32) * (5/9)).toFixed(2);
          var iconCode = res['weather'][0].icon
          var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          console.log(iconUrl);
          var html = '';
          html += '<img src="'+iconUrl+'">'
          html += '<p>'+res['name']+': '+res['weather'][0].main+'</p>'
          html += '<p>'+res['weather'][0].description+'</p>'
          html += '<p id="tempF">Temperature: '+tempF+'\&#8457;</p>'
          html += '<p id="tempC" hidden>Temperature: '+tempC+'\&#8451;</p>'
          html += '<p>Country: '+ res['sys'].country +'</p>'


          elMap.innerHTML =html

      }, 'json')
      return false;
    })

  $('#celcius').on('click', function(){
    console.log('works');
    $('#tempF').hide();
    $('#tempC').show().fadeIn('slow');
  })

  $('#faren').on('click', function(){
    console.log('works');
    $('#tempC').hide();
    $('#tempF').show().fadeIn('slow');
  })




})
