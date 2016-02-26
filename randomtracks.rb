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
