https://s3-us-west-1.amazonaws.com/briansdopetracks/Drake+-+Back+to+Back+Freestyle+%5BLYRICS%5D.mp3
https://s3-us-west-1.amazonaws.com/briansdopetracks/Drake+-+Energy.mp3
https://s3-us-west-1.amazonaws.com/briansdopetracks/Drake+6+God+-+Full+Song.mp3
https://s3-us-west-1.amazonaws.com/briansdopetracks/drake-legend+lyrics.mp3

Track.new(title: "Back To Back", description: "dope track bout feudin w meek", audio_url: "https://s3-us-west-1.amazonaws.com/briansdopetracks/Drake+-+Back+to+Back+Freestyle+%5BLYRICS%5D.mp3", creator_id: 9, archived: false)
Track.new(title: "6 God", description: "dope track bout bein a 6 god", audio_url: "https://s3-us-west-1.amazonaws.com/briansdopetracks/Drake+6+God+-+Full+Song.mp3", creator_id: 9, archived: false)
Track.new(title: "Legend", description: "dope track bout bein the best in the game right now", audio_url: "https://s3-us-west-1.amazonaws.com/briansdopetracks/drake-legend+lyrics.mp3", creator_id: 9, archived: false)

{track: {title: "Back To Back (again)", description: "testing", audio_url: "https://s3-us-west-1.amazonaws.com/briansdopetracks/Drake+-+Back+to+Back+Freestyle+%5BLYRICS%5D.mp3", creator_id: 9, archived: false}}

1456444857015


AWS stuff:
Access Key ID:
AKIAI7E32V4PNUZERBYA
Secret Access Key:
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

<label>Track Title <br></br>
<input type="text"
        name="title"
        value={this.state.username}
        onChange={this.handleInputChanges}/>
</label>
<label>Description <br></br>
<textarea
        name="description"
        value={this.state.username}
        onChange={this.handleInputChanges}>
</textarea>
</label>
<label>Track Image <br></br>
<input type="file"
        accept="image/*"
        title=" "
        name="imageFile"
        className="custom-file-input"/>
</label>


dannydaylewis
Access Key ID:
AKIAJLKHARCMOCUHOCNQ
Secret Access Key:
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

big dawg
Access Key ID:
AKIAIMFJ44HRBQIXKSRA
Secret Access Key:
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


# from the TracksController
  def credentials
    filename = params[:filename]
    config = { 'bucket' => 'briansdopetracks', 'region' => 'us-west-2', 'access_key' => "", 'secret_key' => "" }
    requestParams = s3_credentials(config, filename)
    render json: requestParams
  end

# server util stuff
  createFormData: function(response){
    var fd = new FormData();
    var keys = Object.keys(response.params);
    keys.forEach(function(key){ fd.append(key, response.params[key]); });
    return fd;
  },
  sendToAmazon: function(formdata){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://briansdopetracks.s3.amazonaws.com/");
    xhr.setRequestHeader("Content-Type", "audio/mpeg");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log("you've done it, you bastard.");
      }
    };
    xhr.send(formdata);
  },
  getCredentials: function(file){
    var filename = file.name;
    $.ajax({
      url: "api/credentials",
      type: "GET",
      data: {
        filename: filename
      },
      success: function(response){
        var fd = this.createFormData(response);
        fd.append('file', file);
        this.sendToAmazon(fd);
      }.bind(this),
      error: function(response){
        console.log(response);
      }
    });
  }
