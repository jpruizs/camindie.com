(function(){

  var app = angular.module('videos', ['youtube-embed']);



  app.controller('ChannelController', ['$http', function($http){
    var channel = this;

    channel.channelId = 'UCFlYQy6YOTiwxQshAJXm9Tw';
    channel.uploads = [];
    channel.videos = [];
    channel.currentVideo = '';
    channel.videoURL = '';

    
    $http.get('https://www.googleapis.com/youtube/v3/channels', { 
      params: { 
        part: 'contentDetails',  
        id: this.channelId, 
        key: 'AIzaSyDxc2WcsvZH1MCVQ_SLriBXN8uCU6wM5Z0' 
      }
    })
    .success(function(data) {
      channel.uploads = data.items[0].contentDetails.relatedPlaylists.uploads;

      $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',  
          maxResults: 5, 
          playlistId: channel.uploads, 
          key: 'AIzaSyDxc2WcsvZH1MCVQ_SLriBXN8uCU6wM5Z0' 
        }
      })
      .success(function(data) {
          channel.videos = data;
          channel.currentVideo = data.items[0].snippet.resourceId.videoId;
                    
      });
    });

   
   



  }]);


})();