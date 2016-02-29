var ServerTrackApi = require('../util/serverTrackApi');
var AppDispatcher = require('../dispatcher/dispatcher');

var UploadActions = {
  initiateUpload: function(prefix, file){
    ServerTrackApi.fetchPresignedUrls(prefix, file, UploadActions.handleReceivedUrls);
  },

  handleReceivedUrls: function(urls, file) {
    ServerTrackApi.uploadTheFile(urls, file, UploadActions.handlePublicUrl, UploadActions.handleProgress);
  },

  handleProgress: function(percent){
    AppDispatcher.dispatch({
      actionType: "PERCENT_COMPLETED",
      percent: percent
    });
  },
  handlePublicUrl: function(url){
    AppDispatcher.dispatch({
      actionType: "PUBLIC_URL_RECEIVED",
      publicUrl: url
    });
  }
};

module.exports = UploadActions;
