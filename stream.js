/*global $*/
$(document).ready(function(){

getStreams();
   $("#on").click(function() {
       $("#offline").hide();
       $("#online").show();

   })
   $("#off").click(function() {
       $("#online").hide();
       $("#offline").show();
   })
   $("#all").click(function() {
       $("#online").show();
       $("#offline").show();
   })
}); //doc ready function

function getStreams(){ 
    var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "cretetion", "comster404", "brunofin", "monstercat", "OgamingSC2"];
        
    channels.forEach(function(value, index){
     var apiUrl = " https://api.twitch.tv/kraken/channels/" 
     + value + "?callback=?";
     
     var streamUrl = " https://api.twitch.tv/kraken/streams/" 
    + value + "?callback=?";
    
    $.getJSON(apiUrl, function(data){
        $.getJSON(streamUrl, function(response){
            var status = response.status;
            var update = data.status
            var name = data.display_name;
            var link = data.url;
            var logo = data.logo;
            var game = data.game;
            var streaming = response.stream; 
            var isOnline = true;
            
            if(logo === null){
                logo = "http://placekitten.com/300/300";
            }
            if(game === null){
                game = value;
            }
            if(update === null){
                
               update = "";
            }
            if(status == 422){
                name = value;
                update = 'account closed';
                game = value;
                logo = "http://placekitten.com/300/300";
                link = "https://www.twitch.tv/directory/all";
                isOnline = false;
            }
           
            else if(status != 422 && streaming === null){
                isOnline = false;
             
            }else{
                isOnline = true;
            }
            
            //html
            var html =  '<div class="row"><li><h4>'  + game + '</h4>' 
            + '<p>channel:  ' + name + '</p>'
            + '<span class="pull-left"><p id="upDate">'+ update + '</p></span>'
            +'<img id="logo" class="img-fluid pull-right" src="' + logo + '"/>'
            + '<br></br><p><a class="btn btn-info pull-left" id="watch" href="' +  link + '" role="button">watch</a></p></li></div>';
            
            if(isOnline === true){
            $('#online').append(html);
            }else{
            $('#offline').append(html);
            }
            
            
        });//getjson streamUrl  
        
        
      });//getjson apiUrl
        
    }); //foreach

    
  }//getStreams
  
    

