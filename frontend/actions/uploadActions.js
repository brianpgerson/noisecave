var ServerTrackApi = require('../util/serverTrackApi');
var AppDispatcher = require('../dispatcher/dispatcher');
// var UploadConstants = require('../constants/uploadConstants');

var UploadActions = {
  initiateUpload: function(prefix, file){
    ServerTrackApi.fetchPresignedUrls(prefix, file, this.handleReceivedUrls.bind(this));
  },

  handleReceivedUrls: function(urls, file) {
    ServerTrackApi.uploadTheFile(urls, file, this.handlePublicUrl.bind(this));
  },
  handlePublicUrl: function(url){
    AppDispatcher.dispatch({
      actionType: "PUBLIC_URL_RECEIVED",
      publicUrl: url
    });
  }
};

module.exports = UploadActions;
