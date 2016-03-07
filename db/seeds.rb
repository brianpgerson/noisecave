# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# drake's tracks:


Track.create!({:title=>"Drake - Come Thru",
   :description=>"Track 14 off Nothing Was The Same. Here, Drake reminisces about a past girl who lived in the town he’s in, and what they used to do together. Uncredited background vocals provided by PARTYNEXTDOOR",
    :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1456859855/i2ajgpcmtznalkdi8ci0.jpg",
     :audio_url=>"https://briansdopetracks.s3-us-west-1.amazonaws.com/tracks/audio/4e08c200-90bf-4709-94e1-7efacd51cf09.mp3",
      :creator_id=>ADD,
       :plays => 7})
Track.create!({:title=>"Drake - 6 God",
   :description=>"On October 25th 2014, the day following his 28th birthday, Drizzy released the full version of “6 God,” along with “How Bout Now” and “Heat of the Moment,” dropping the songs early due to a hack-attack. The track was later included on If You’re Reading This It’s Too Late.",
    :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1456859889/rfon5hgel73kkzj1tcxt.jpg",
     :audio_url=>"https://briansdopetracks.s3-us-west-1.amazonaws.com/tracks/audio/c5aebfc8-9059-4745-9000-efca7f63015a.mp3",
      :creator_id=>ADD,
       :plays => 2})
Track.create!({:title=>"Drake - Energy",
   :description=>"This song addresses Drake’s haters along with the controversy surrounding Birdman, Lil Wayne, and Cash Money Records. The music video for this song went viral, with Drake impersonating numerous celebrities, including President Obama, LeBron James, Oprah, Miley Cryus, Justin Bieber, and Kanye West. When asked to describe the video, Drake said: It’s shocking, It’s beautiful, It’s a lot of things.",
    :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1456859932/f8fmk1riqymgumpfaolc.jpg",
     :audio_url=>"https://briansdopetracks.s3-us-west-1.amazonaws.com/tracks/audio/f1cbdfb7-c9c6-4b42-ad8b-ef27acf92bb9.mp3",
      :creator_id=>ADD,
       :plays => 3})
Track.create!({:title=>"Drake - Legend",
   :description=>"Legend is the hard-hitting opener to Drake’s surprise mixtape If You’re Reading This It’s Too Late. On the track, Drake’s braggadocio goes 0 to 100, real quick as he flaunts his success.",
    :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1456860026/zvwpgbkghy6ysfffaxly.jpg",
     :audio_url=>"https://briansdopetracks.s3-us-west-1.amazonaws.com/tracks/audio/0048fd02-3051-4dae-a979-68f542c8e601.mp3",
      :creator_id=>ADD,
       :plays => 14})
Track.create!({:title=>"Drake - Forever",
   :description=>"This song was featured on the More Than a Game soundtrack. Four of hip hop’s current heavyweights take turns going in over a hard beat by Boi-1da.",
    :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1456860100/xzaww5mu0l3vwyqowk1q.jpg",
     :audio_url=>"https://briansdopetracks.s3-us-west-1.amazonaws.com/tracks/audio/ff380ef4-9b69-4963-b700-f30a21b151e7.mp3",
      :creator_id=>ADD,
       :plays => 1})
Track.create!({:title=>"Dramatic Chipmunk - The Drama",
   :description=>"Woah - what a cute little chipmunk! I think it looks more like a Gerbil, but whatever. A little on the dramatic side, though...",
      :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1456860127/mfum1eghacby4xbxxsrx.png",
       :audio_url=>"https://briansdopetracks.s3-us-west-1.amazonaws.com/tracks/audio/3b4924fe-cae3-49ec-9b14-efb7e3ebf40b.mp3",
        :creator_id=>ADD,
         :plays => 0})
Track.create!({
  :title=>"Drake - Tuscan Leather",
  :description=>"How much time is this **** spending on the intro!? The six-minute, six-second introductory (and highly-anticipated) song off Drake’s third outing, Nothing Was The Same. The song’s title borrows from Tom Ford’s designer cologne, Tuscan Leather.",
  :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1456859826/gi1ydwmwtzhtdh7uwua5.jpg",
  :audio_url=>"https://briansdopetracks.s3-us-west-1.amazonaws.com/tracks/audio/31003046-4d69-4b8b-894b-34ca26706682.mp3",
  :creator_id=>ADD,
  :plays => 8})

  Track.create!({
    :title=>"Chromeo - Bonafied Lovin'",
    :description=>"Single of the Week... Every night in London, too-serious indie dorks forget the ability to dance at their generic club of choice. What these kids need is Chromeo, stat...",
    :image_url=>"http://res.cloudinary.com/thadowg/image/upload/v1457338426/28817_polbwu.jpg",
    :audio_url=>"https://s3-us-west-1.amazonaws.com/briansdopetracks/tracks/audio/%27Bonafied+Lovin%27+Chromeo+%5BOFFICIAL+VIDEO%5D.mp3",
    :creator_id=>11,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

  Track.create!({
    :title=>"TITLE",
    :description=>"DESCRIPT",
    :image_url=>"IMG",
    :audio_url=>"AUD",
    :creator_id=>ADD,
    :plays => rand(50)})

User.create!({username: "Drizzy", email: "6god@town.com", password: "testing", description: "I'm just a rapper from the 6 hoping to make it big.", image: "http://res.cloudinary.com/thadowg/image/upload/v1457334245/drizzy.png"})
User.create!({username: "TayTaySweeSwee", email: "soitsgonnabeforever@town.com", password: "testing", description: "I mostly wear t-shirts and sit in the bleachers.", image: "http://res.cloudinary.com/thadowg/image/upload/v1457334245/taytay.png"})
User.create!({username: "Brian", email: "dog@town.com", password: "testing", description: "You know, I'm not sure what I'm doin here, besides making some dope-ass playlists.", image: "http://res.cloudinary.com/thadowg/image/upload/v1457334245/bribri.png"})
User.create!({username: "DomesticImpala", email: "causeim@man.com", password: "testing", description: "Just a couple Aussies recording some cool psychadelic rock.", image: "http://res.cloudinary.com/thadowg/image/upload/v1457334245/domesticimpala.png"})
