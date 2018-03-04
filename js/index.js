var userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function(){
    
    var online = "";
    var game = "";
    var status = "";
    var game_status = "";
    
    var display_name = "";
    var logo = "";
    var link = "";
    var statusColor = "#36542f"; //verde on line
    var selectedStatus = "all";  
    
    $( "#buttonAll" ).click(function() {
      selectedStatus = "all";
      $("#list-ul li").remove();
      fillData();
    });
    
    $( "#buttonOnline" ).click(function() {
      selectedStatus = "online";
      $("#list-ul li").remove();     
      fillData();
    });
    
    $( "#buttonOffline" ).click(function() {
      selectedStatus = "offline";
      $("#list-ul li").remove();     
      fillData();
    });
  
  fillData();
  
function fillData(){  
  for(var arrElement in userArray){
    var user = userArray[arrElement];
    var usersUrl = "https://wind-bow.glitch.me/twitch-api/users/" + user;
    var channelsUrl = "https://wind-bow.glitch.me/twitch-api/channels/" + user;
    var streamsUrl = "https://wind-bow.glitch.me/twitch-api/streams/" + user;
    
    //get game and status (if online) - using streams
    $.ajax({          
      // type of call
      type: "GET",            
      // url to query
      url: streamsUrl,            
      async: false,            
      dataType: "json",  
      // if everithing's ok
      success: function(data)
                     {
                       online = data["stream"];
                       game = data["stream"]["game"];
                       status = data["stream"]["channel"]["status"];                   
                       game_status = game + ":" + status;

                     },
            error: function(jqXHR, textStatus, errorThrown)
                   {
                      alert("error: " + textStatus + " -- " + "incoming Text: " + errorThrown);
                   } 
                 });    


    // get "display_name", "logo" and "name" (to form "link" with "https://www.twitch.tv/") using users
    $.ajax({          
      // type of call
      type: "GET",            
      // url to query
      url: usersUrl,            
      async: false,            
      dataType: "json",  
      // if everithing's ok
      success: function(data){

        display_name  =  data["display_name"];
        logo = data["logo"];                     
        link = "https://www.twitch.tv/" + data["name"];

        if(!online){
          game_status = "offline";
          statusColor = "#a83032"; //rosso offline
        }else{
          statusColor = "#36542f"; //verde on line          
        }
        
var appendString = "<li><div class='row align-items-center' style='background-color:" + statusColor + "'><div class='col-md-2' style='background-color:" + statusColor + "'><img src='" + logo + "' height='64' width='64'></div><div class='col-md-2' style='background-color:" + statusColor + "'><a href='" + link + "' target='_blank'>" + display_name + "</a></div><div class='col-md-8' style='background-color:" + statusColor + "'>" + game_status + "</div</div></li>"

if(selectedStatus === "all"){
          $("#list-ul").append(appendString); 
   }else if(selectedStatus === "online" && online){
          $("#list-ul").append(appendString);    
   }else if(selectedStatus === "offline" && !online){
          $("#list-ul").append(appendString);    
   }


                    
                            },
      error: function(jqXHR, textStatus, errorThrown){
                      alert("error: " + textStatus + " -- " + "incoming Text: " + errorThrown);
                   } 
      });   
  };
}; 
});