# noisecave

(noisecave)[www.noiseave.com] is a single-page, fully featured web app where users can upload, organize, discover, and enjoy music from artists around the world.

## Marquee Functionalities

* Browse new tracks, check out other users' playlists, and listen to your new discoveries without needing to sign in
* Sign in or sign up to access gated content like playlist creation and media uploading
* Authorization occurs seamlessly on both client side and server side to ensure a secure, single-page app experience
* Upload tracks to Amazon Web Services S3 using presigned URLs good for one upload directly from the browser.
* Create and add to playlists on the fly as you browse
* Stream single tracks, queued tracks, and full playlists with a stream bar that persists throughout the browsing experience.
* Search by song or artist name, and share search results with friends with query params included in the URI

## Languages, Libraries, Frameworks, And More

* Rails
* React.js
* Flux
* Boron
* Skeleton minimalist CSS reset
* Cloudinary
* Amazon Web Services S3 Ruby SDK
* Figaro
* New Relic RPM
* Bcrypt
* JBuilder

## Cool Code

Generates one-time pre-signed URLs with a expiry to allow fast and safe user upload to noisecave's AWS storage

```   
    class UploadPresigner

    include Singleton

    def self.presign(prefix, filename, limit: limit)
      extname = File.extname(filename).downcase
      filename = "#{SecureRandom.uuid}#{extname}"
      upload_key = Pathname.new(prefix).join(filename).to_s

      creds = Aws::Credentials.new(ENV['AWS_access_key'], ENV['AWS_secret_key'])
      s3 = Aws::S3::Resource.new(region: 'us-west-1', credentials: creds)
      obj = s3.bucket('briansdopetracks').object(upload_key)
      params = { acl: 'public-read' }
      params[:content_length] = limit if limit

      {
        presigned_url: obj.presigned_url(:put, params),
        public_url: obj.public_url
      }
    end

    end
```

Generates a hand-rolled authorization signature for S3. Uploads never actually hit my server,
but through the presigners API endpoint, get authorization to upload directly from the browser

```  
    def hmac(key, string)
    digest = OpenSSL::Digest.new('sha256')
    cool_hmac = OpenSSL::HMAC.digest(digest, key, string)
  end

  def s3_upload_signature(config, policy_base64, credential)
    digest = OpenSSL::Digest.new('sha256')

  date_key = hmac("AWS4#{config['secret_key']}", date_string)
  date_region_key = hmac(date_key, config['region'])
  date_region_service_key = hmac(date_region_key, "s3")
  signing_key = hmac(date_region_service_key, 'aws4_request')
  OpenSSL::HMAC.hexdigest(digest, signing_key, policy_base64)
  end
```

Created a single Modal component that, with the help of its own flux store and some baked in prop passing, can create any of the modals I need on the fly:

```  
  whatToDisplay: function(){
    switch(ModalStore.returnType()) {
      case "signup":
        var theModal =
          <div className="modal-wrapper"> <LoginForm
            formOptions={this.formProps("signup")}
            loggedIn={this.props.loggedIn} />
          </div>;
        break;
      case "login":
        theModal =
          <div className="modal-wrapper"> <LoginForm
            formOptions={this.formProps("login")}
            loggedIn={this.props.loggedIn} />
          </div>;
        break;
      case "upload":
        theModal =
          <div className="modal-wrapper"> <TrackUpload/>
          </div>;
        break;
      case "profileEdit":
        theModal =
          <div className="modal-wrapper">
            <EditForm loggedIn={this.props.loggedIn} />
          </div>;
        break;
      case "playlist":
          theModal =
            <div className="modal-wrapper">
              <PlaylistModal track={ModalStore.returnTrack()} />
            </div>;
          break;
      }
  return theModal;
```

Buttons for uploading media change color from left to right to mirror the packets being sent to AWS S3:

```   
  handlePercentage: function(){
    var percent = (this.state.percentComplete * 100);
    var coolButtonStyle = {
          background: "#5DA9E3",
          background: '-moz-linear-gradient(left,  #5DA9E3 0%, #5DA9E3 ' + percent + '%, #F5F5F5 ' + percent + '%, #F5F5F5 ' + percent + '%)',
          background: 'linear-gradient(to right,  #5DA9E3 0%,#5DA9E3 ' + percent + '%,#F5F5F5 ' + percent + '%,#F5F5F5 ' + percent + '%)',
          filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#F5F5F5', endColorstr='#F5F5F5',GradientType=1)"
        }
    return coolButtonStyle;
  },
```


## Screen Shots

### Splash
![splash]

### Discover
![discover]

### Play Bar
![playbar]

### Playlists
![playlist]

### Track Detail
![track-detail]


[splash]: ./docs/screenshots/noisecave-splash.png
[discover]: ./docs/screenshots/noisecave-discover.png
[playbar]: ./docs/screenshots/noisecave-playbar-queue.png
[playlist]: ./docs/screenshots/noisecave-userplaylists.png
[track-detail]: ./docs/screenshots/noisecave-track-detail.png

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

##
