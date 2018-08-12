// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: "#app", // App root element
  id: "com.oneafricaglobal.oag", // App bundle ID
  name: "One Africa Mobile", // App name
  theme: "auto", // Automatic theme detection
  on: {
    init: function() {
      // perform ajaxa request here
      if (checkStatus()) {
        subscriptionPopup.open();
      } else {
        console.log("welcome");
      }
    }
  },
  // App routes
  routes: routes
});
// welcome notif
var welcome = app.notification.create({
  subtitle: "heyyy",
  text: "Welcome Back!",
  closeTimeout: 5000
});
// Check if network is available
var notificationFull = app.notification.create({
  subtitle: "No Network Connection",
  text: "Ensure you have an active internet connection",
  closeTimeout: 7000
});

// Init/Create main view
var mainView = app.views.create(".view-main", {
  url: "/",
  on: {
    pageInit: function() {
      if (navigator.onLine) {
      } else {
        notificationFull.open();
      }
    }
  }
});
// create social connect popup
var socialPopup = app.popup.create({
  content:
    '<div class="popup wande">' +
    '<div class="block">' +
    '<a class="popup-close">' +
    '<i class="icon f7-icons ios-only popup-close pointer oag-main">chevron_left</i>' +
    '<i class="icon material-icons md-only popup-close pointer oag-main">chevron_left</i>' +
    '<span class=" popup-close pointer oag-main">Back</span>' +
    "</a>" +
    '<div class="subscription-box" >' +
    '<img src="img/OAg app logo.png" width="70px" height="70px" class="subscription-logo"> ' +
    '<p class="text-color-white">Please login with your social account for better experience with social features!</p>' +
    '<div class="list">' +
    '<ul class="socials">' +
    "<li>" +
    '<a href="https://www.facebook.com/oneafricamusicfestofficial" class="item-link item-content link external">' +
    '<div class="item-media"><img src="img/f.png" class="icon"></img></div>' +
    '<div class="item-inner">' +
    '<div class="item-title">Facebook</div>' +
    '<div class="item-after"><button class="col button button-fill button-round">Connect</button></div>' +
    "</div>" +
    "</a>" +
    "</li>" +
    "<li>" +
    '<a href="https://twitter.com/OneAfrica_Music" class="item-link item-content link external">' +
    '<div class="item-media"><img src="img/t.png" class="icon"></img></div>' +
    '<div class="item-inner">' +
    '<div class="item-title">Twitter</div>' +
    '<div class="item-after"><button class="col button button-fill button-round twitter-blue">Connect</button></div>' +
    "</div>" +
    "</a>" +
    "</li>" +
    "<li>" +
    '<a href="https://www.instagram.com/oneafrica_musicfest" class="item-link item-content link external">' +
    '<div class="item-media"><img src="img/i.png" class="icon"></img></div>' +
    '<div class="item-inner">' +
    '<div class="item-title">Instagram</div>' +
    '<div class="item-after"><button class="col button button-fill button-round color-pink">Connect</button></div>' +
    "</div>" +
    "</a>" +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
});
$$(document).on("click", ".social-connect", function(e) {
  socialPopup.open();
});

// create searchbar and Fetch artist data
$$(document).on("page:init", '.page[data-name="lineup"]', function(e) {
  // control searchbar
  var searchbar = app.searchbar.create({
    el: ".searchbar",
    searchContainer: ".list",
    searchIn: ".item-title",
    on: {
      search(sb, query, previousQuery) {}
    }
  });
  app.preloader.show();
  //fetch artist data
  app.request.get(
    "https://one-africa-global.herokuapp.com/api/show_artist",
    function(artist) {
      var artistData = JSON.parse(artist);
      app.preloader.hide();
      // loop through the table to list out all the artist in database table
      for (var i = 0; i < artistData.length; i++) {
        var template = $$("#template").html();

        // compile it with Template7
        var compiledTemplate = Template7.compile(template);

        // Now we may render our compiled template by passing required context
        var context = {
          artistName: artistData[i].artistName,
          artistBio: artistData[i].artistBio,
          slug: artistData[i].slug,
          artistPhoto: artistData[i].artistPhoto,
          dataPopup: ".popup-" + artistData[i].slug,
          dataClass: "popup-" + artistData[i].slug
        };
        var html = compiledTemplate(context);

        // output data to artist page
        $$("#show-here").append(html);
      }
    }
  );
  setTimeout(() => {
    app.preloader.hide();
  }, 7000);
});

// music player
$$(document).on("page:init", '.page[data-name="music"]', function(context) {
  // fetch songs from database
  app.preloader.show();
  app.request.get("https://one-africa-global.herokuapp.com/api/music", function(
    data
  ) {
    var songs = JSON.parse(data);
    app.preloader.hide();
    // loop through the table to list out all the songs in database table
    for (var i = 0; i < songs.length; i++) {
      var songtemplate = $$("#songtemplate").html();

      let positionz = i;
      // compile it with Template7
      var compiledsongTemplate = Template7.compile(songtemplate);
      // Now we may render our compiled template by passing required context

      var context = {
        name: songs[i].name,
        artist: songs[i].artist,
        album: songs[i].album,
        index: positionz,
        e: positionz,
        url: songs[i].url,
        cover_art_url: songs[i].cover_art_url
      };
      var html = compiledsongTemplate(context);

      Amplitude.init({
        songs: [
          {
            name: "Amaka",
            artist: "2face ft Peruzzi",
            album: "Unknown",
            url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/06/2Baba_-_Amaka_ft_Peruzzi.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/06/IMG_20180626_152852_854.jpg"
          },
          {
            name: "For you",
            artist: "Kizz Daniel ft. Wizkid",
            album: "Ask The Dust",
            url:
              "http://tooxclusive.com/wp-content/uploads/2018/06/Kizz-Daniel-ft-Wizkid-For-You.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/06/Kizz-Daniel-For-You-tx.jpg"
          },
          {
            name: "Burn ft. Sarkodie",
            artist: "Kcee",
            album: "Anvil",
            url:
              "http://tooxclusive.com/wp-content/uploads/2018/02/Kcee-ft.-Sarkodie-Burn.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/02/burn.jpg"
          },
          {
            name: "Road to Russia 2018 'Dem go hear am' ft. Phyno",
            artist: "Olamide",
            album: "We Are to Answer",
            url:
              "http://tooxclusive.com/wp-content/uploads/2018/06/Olamide-x-Phyno-Dem-Go-Hear-Am.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/06/IMG-20180609-WA0000.jpg"
          },
          {
            name: "Kisela ft. Mr. P",
            artist: "Vanessa Mdee",
            album: "Soon It Will Be Cold Enough",
            url:
              "http://tooxclusive.com/wp-content/uploads/2017/07/Vanessa_Mdee_ft__MrP_Kisela.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2017/07/DEYZ7uEVYAEUbrQ.jpg"
          },
          {
            name: "Jogodo",
            artist: "Tekno",
            album: "Unknown",
            url:
              "http://tooxclusive.com/wp-content/uploads/2018/04/Tekno-Jogodo-Official-Audio.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/04/polongo.png"
          },
          {
            name: "Gimme Love ft. Duncan Mighty",
            artist: "DJ Xclusive",
            album: "Ask The Dust",
            url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/DJ-Xclusive-GIMME-LOVE-ft-DUNCAN-MIGHTY.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/dj-xclusive-picture.jpg"
          },
          {
            name: "Bio Bio ft Duncan Mighty",
            artist: "Reekado Banks",
            album: "Unknown",
            url:
              "http://download794.mediafire.com/vlsobxlwfcfg/dvs7qa9puq3q327/Reekado+Banks+-+Bio+Bio+Ft.+Duncan+Mighty.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/bio-bio-1080.jpg"
          },
          {
            name: "Time to Party ft. Diamond Platnumz",
            artist: "Flavour",
            album: "Unknown",
            url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/Flavour-Time-to-Party-Feat.-Diamond-Platnumz-Official-Video.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/Capture-2.png"
          },
          {
            name: "Pressure ft. Tiwa Savage",
            artist: "skales",
            album: "Mr Love",
            url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/Skales-ft-Tiwa-Savage-Pressure2.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/S2k.jpg"
          },
          {
            name: "Porsche ",
            artist: " Davido",
            album: "Unknown ",
            url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/IMG-20180618-WA0001.jpg ",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/Davido-Porsche-prod.-Haelz.mp3 "
          },
          {
            name: "Stainless ft. Simi ",
            artist: "Zoro ",
            album: "Unknown ",
            url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/Zoro-ft.-Simi-Stainless.mp3",
            cover_art_url:
              " http://cdn.tooxclusive.com/wp-content/uploads/2018/07/Zoro-Stainless-Ft-Simi-500x431.jpg"
          },
          {
            name: "Soco ft. Wizkid, Ceeza Milli, Spotless & Terri ",
            artist: "Star Boy ",
            album: "Unknown ",
            url:
              "http://tooxclusive.com/wp-content/uploads/2018/02/Wizkid-%E2%80%93-Soco-ft.-Ceeza-Milli-Spotless-Terry.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/02/DWegVl8W4AANr7V-768x777.jpg "
          },
          {
            name: "Fire Waist ft. Harmonize ",
            artist: "Skales ",
            album: " Mr. Love",
            url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/Skales-%E2%80%93-Fire-Waist-ft.-Harmonize.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/07/waist.png"
          },
          {
            name: "Mind ft. Davido, Peruzzi, Dremo & Mayorkun",
            artist: "DMW ",
            album: "Unknown",
            url:
              "http://tooxclusive.com/wp-content/uploads/2018/01/DMW-ft.-Davido-Peruzzi-Dremo-Mayorkun-%E2%80%93-Mind.mp3",
            cover_art_url:
              "http://cdn.tooxclusive.com/wp-content/uploads/2018/01/dmw-mind-ft-davido-peruzzi-dremo-mayorkun-1.jpg"
          }
        ]
      });
      // output data to artist page
      $$("#music-player").append(html);
    }
  });
  setTimeout(() => {
    app.preloader.hide();
  }, 8000);
  $(".show-playlist").on("click", function() {
    $("#white-player-playlist-container").slideDown(500, function() {
      $(this).show();
    });
  });
  $(".close-playlist").on("click", function() {
    $("#white-player-playlist-container").slideUp(500, function() {
      $(this).hide();
    });
  });
});

// gallery
$$(document).on("page:init", '.page[data-name="gallery"]', function(e) {
  // oamf
  var oamfGallery = app.photoBrowser.create({
    photos: [
      "http://oneafricaglobal.com/app-backup/oamf/1.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/2.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/3.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/4.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/5.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/6.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/7.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/8.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/9.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/10.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/11.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/12.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/13.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/14.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/15.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/16.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/17.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/18.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/19.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/20.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/21.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/22.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/23.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/24.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/25.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/26.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/27.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/28.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/29.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/30.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/31.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/32.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/33.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/34.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/35.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/36.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/37.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/38.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/39.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/40.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/41.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/42.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/43.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/44.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/45.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/46.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/47.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/48.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/49.jpg",
      "http://oneafricaglobal.com/app-backup/oamf/50.jpg"
    ],
    theme: "dark"
  });
  $$(".oamf-gallery").on("click", function() {
    oamfGallery.open();
  });
  // 1m1s
  var m1sGallery = app.photoBrowser.create({
    photos: [
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%202.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%203.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%204.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%205.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%206.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%207.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%208.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%209.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2010.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2012.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2013.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2014.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2015.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2016.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2017.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2018.jpg",
      "https://www.oneafricaglobal.com/home/1m1s%20gallery/watermarked-one%20af%2019.jpg"
    ],
    theme: "dark",
    type: "popup"
  });
  $$(".m1s-gallery").on("click", function() {
    m1sGallery.open();
  });
});

// partner submit
$$(document).on("click", "#partner-submit", function() {
  app.preloader.show();
  var partnerform = {
    compname: $("#compname").val(),
    compaddress: $("#compadd").val(),
    contactperson: $("#contactperson").val(),
    positionofcontact: $("#position").val(),
    phone: $("#phonenumb").val(),
    email: $("#partneremail").val(),
    website: $("#partnerwebsite").val(),
    proposal: $("#proposal").val()
  };
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/partnership",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Postman-Token": "7f218385-5c7b-44b6-b9d3-b41888a75f41"
    },
    processData: false,
    data:
      '{\n\t"compname": "' +
      partnerform.compname +
      '",\n\t"compaddress": "' +
      partnerform.compaddress +
      '",\n\t"contactperson": "' +
      partnerform.contactperson +
      '",\n\t"positionofcontact":"' +
      partnerform.positionofcontact +
      '",\n\t"phone": "' +
      partnerform.phone +
      '",\n\t"email": "' +
      partnerform.email +
      '",\n\t"website": "' +
      partnerform.website +
      '",\n\t"proposal": "' +
      partnerform.proposal +
      '"\n}'
  };

  $.ajax(settings).done(function(response) {
    app.preloader.hide();
    app.dialog
      .create({
        title: "OneAfrica Global",
        text: "Sent successfully",
        buttons: [
          {
            text: "Close"
          }
        ],
        verticalButtons: true
      })
      .open();
    console.log(response);
    console.table(partnerform);
  });
});

// subscribe function
function checkStatus() {
  let statz = localStorage.getItem("subscribed");
  if (statz == null) {
    setTimeout(() => {
      subscriptionPopup.open();
      console.log("its empty");
    }, 3000);
  }
}
// set subscription status
function setStatus() {
  window.localStorage.setItem("subscribed", "true");
}
// mailchimp subscribe function
function subscribe(theEmail) {}
// create subscription popup
var subscriptionPopup = app.popup.create({
  content:
    '<div class="popup tekno">' +
    '<div class="block">' +
    '<p class="right"><a href="#" class=" padding link popup-close">Skip</a></p>' +
    '<div class="subscription-box">' +
    '<img src="img/OAg app logo.png" width="70px" height="70px" class="subscription-logo"> ' +
    '<div class="list no-hairlines text-color-white partner padding-bottom">' +
    "<p>Sign up and be the first to know about the latest news in the OneAfrica Universe!</p>" +
    '<ul style="background-color: transparent;">' +
    '<li class="item-content item-input item-input-with-info">' +
    '<div class="item-inner">' +
    '<div class="item-input-wrap">' +
    '<input type="email" placeholder="Email:" required validate name="email" id="subemail" class="no-bg margin-bottom bottom-border-only">' +
    '<span class="input-clear-button"></span>' +
    '<div class="item-input-info"></div>' +
    "</div>" +
    "</div>" +
    "</li>" +
    "</ul>" +
    "</div>" +
    '<a class="button oaglight-button" id="submit-button">Submit</a>' +
    "</div>" +
    "</div>" +
    "</div>"
});
// mILING LIST
$$(document).on("click", ".mailing-list", function() {
  subscriptionPopup.open();
});
$$(document).on("click", "#submit-button", function() {
  var subemail = $("#subemail").val();
  app.preloader.show();
  // ajax req for mailchimp
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://one-africa-global.herokuapp.com/mailchimp",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Postman-Token": "2d6cee3e-a8ae-4d48-a974-3f8859e6b567"
    },
    processData: false,
    data: '{\n\t"subemail": "' + subemail + '"\n}'
  };
  $.ajax(settings).done(function(response) {
    setStatus();
    app.preloader.hide();
    setTimeout(() => {
      subscriptionPopup.close();
    }, 2000);
    app.dialog
      .create({
        title: "Successful!!!",
        text: "You've been subscribed to One Africa Newsletter",
        buttons: [
          {
            text: "Close"
          }
        ]
      })
      .open();
  });
});

// COntact Support Email
$$(document).on("click", ".contact-email", function() {
  window.open("mailto:info@oneafricaglobal.com");
});

//show preloader ,check valid and paid email then route to streaming page
$$(document).on("click", ".check-stream-paid", function() {
  var streamMail = $("#streamcheck").val();
  console.log(streamMail);
  app.preloader.show();
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://one-africa-global.herokuapp.com/api/check_stream_access?email=" + streamMail + "",
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
      "Postman-Token": "77ecc2a1-1863-466d-b448-fcd44c89c867"
    }
  };
  $.ajax(settings).done(function(response) {

    app.preloader.hide();

    switch (response.length) {
      case 1:
        $$("#status").addClass("text-color-green");
        $$("#status").html("You're good to go!");
        setTimeout(function() {
          var uroute = streamMail;
          mainView.router.navigate("/livestream/" + uroute + "/");
        }, 2000);
        break;
      case 0:
        $("#status").addClass("text-color-red");
        $$("#status").html("You've not payed to stream Live!");
        break;
      default:
        $("#status").addClass("text-color-orange");
        $$("#status").html("Please try again");
    }
  });
  setTimeout(function() {
    app.preloader.hide();
  }, 9000);
});
// navigate to payment
$$(document).on("click", ".proceed-payment", function() {
  var selectedValue = $("#choosepayment option:selected").val();

  if (selectedValue == "paystack") {
    $$(".show-stripe-form").html("");
    var useremail = $("input#email_field").val();
    setTimeout(function() {
      $$(".show-email").html(
        "hello " + useremail + " Please enter your card details to proceed"
      );
    }, 3000);
    PaystackPop.setup({
      key: "pk_live_88f1e5342109aef7d39b3badb155e41e6910d072",
      email: $("input#email_field").val(),
      amount: 36000,
      container: "paystackEmbedContainer",
      callback: function(response) {
        addEmailAfterPayment(useremail);
        alert(
          "successfully subscribed. transaction ref is " + response.reference
        );
      }
    });
  } else if (selectedValue == "stripe") {
    $$("#paystackEmbedContainer").html("");
    var useremail = $("input#email_field").val();
    setTimeout(function() {
      $$(".show-email").html("Please wait, the Interface is almost ready!");
    }, 1000);

    setTimeout(function() {
      $$(".show-email").hide();
      $$(".show-stripe").addClass("show-stripe-form");
    }, 3000);
    // Create a Stripe client.
    var stripe = Stripe("pk_live_RLhEPzY137sV7YVUhZn9brll");

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Create an instance of the card Element.
    var card = elements.create("card");

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount("#card-element");

    // Handle form submission.
      var form = document.getElementById('payment-form');
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
          if (result.error) {
            // Inform the user if there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            // Send the token to your server.
            stripeTokenHandler(result.token);
            // add the email to database
            addEmailAfterPayment(useremail);
          }
        });
});

  }
});

function addEmailAfterPayment (useremail){
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://one-africa-global.herokuapp.com/api/add_stream_paid",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Postman-Token": "c619e13b-72a4-45d6-bf99-261025086aa9"
    },
    processData: false,
    data: '{\n\t"email": "' + useremail + '"\n}'
  };
  $.ajax(settings).done(function(response) {
    console.log(response.message);
  });
}

$$(document).on("page:init", '.page[data-name="events"]', function(e) {
  // control searchbar
  var searchbar = app.searchbar.create({
    el: ".searchbar",
    searchContainer: ".list",
    searchIn: ".item-title",
    on: {
      search(sb, query, previousQuery) {
        console.log(query, previousQuery);
      }
    }
  });
  // fetch events
  app.preloader.show();
  app.request.get(
    "https://one-africa-global.herokuapp.com/api/lineup",
    function(eventz) {
      var eventLineup = JSON.parse(eventz);
      app.preloader.hide();
      // loop through the table to list out all the artist in database table
      for (var i = 0; i < eventLineup.length; i++) {
        var template = $$("#template").html();

        // compile it with Template7
        var compiledTemplate = Template7.compile(template);

        // show button for only available tickets
        // cokobar
        if (
          eventLineup[i].cokobar == "" ||
          eventLineup[i].cokobar == undefined
        ) {
          var cokobar = '<p class="col-33">Not Available</p>';
        } else {
          cokobar =
            '<a  class="col-33 button button-round oaglight-button space-top ticket-btn link external" href=' +
            eventLineup[i].cokobar +
            ">Buy</a>";
        }
        //  eventbrite
        if (
          eventLineup[i].eventbrite == "" ||
          eventLineup[i].eventbrite == undefined
        ) {
          var eventbrite = '<p class="col-33">Not Available</p>';
        } else {
          eventbrite =
            '<a  class="col-33 button button-round oaglight-button space-top ticket-btn link external" href=' +
            eventLineup[i].eventbrite +
            ">Buy</a>";
        }
        //  ticketmaster
        if (
          eventLineup[i].ticketmaster == "" ||
          eventLineup[i].ticketmaster == undefined
        ) {
          var ticketmaster = '<p class="col-33">Not Available</p>';
        } else {
          ticketmaster =
            '<a  class="col-33 button button-round oaglight-button space-top ticket-btn link external" href=' +
            eventLineup[i].ticketmaster +
            ">Buy</a>";
        }
        //  platinumlist
        if (
          eventLineup[i].platinumlist == "" ||
          eventLineup[i].platinumlist == undefined
        ) {
          var platinumlist = '<p class="col-33">Not Available</p>';
        } else {
          platinumlist =
            '<a  class="col-33 button button-round oaglight-button space-top ticket-btn link external" href=' +
            eventLineup[i].platinumlist +
            ">Buy</a>";
        }
        // Now we may render our compiled template by passing required context
        var context = {
          name: eventLineup[i].name,
          slug: eventLineup[i].slug,
          photo: eventLineup[i].photo,
          location: eventLineup[i].location,
          address: eventLineup[i].address,
          date: eventLineup[i].date,
          cokobarButton: cokobar,
          eventbriteButton: eventbrite,
          ticketmasterButton: ticketmaster,
          platinumlistButton: platinumlist,
          dataPopup: ".popup-" + eventLineup[i].slug,
          dataClass: "popup-" + eventLineup[i].slug
        };
        console.table(context.photo);
        var html = compiledTemplate(context);
        // output data to artist page
        $$("#show-here").append(html);
      }
    }
  );
  setTimeout(() => {
    app.preloader.hide();
  }, 7000);
});

// fetch news
$$(document).on("page:init", '.page[data-name="newsfeed"]', function(e) {
  // control searchbar
  var searchbar = app.searchbar.create({
    el: ".searchbar",
    searchContainer: ".list",
    searchIn: ".item-title",
    on: {
      search(sb, query, previousQuery) {
        console.log(query, previousQuery);
      }
    }
  });
  app.preloader.show();
  //fetchnews
  app.request.get(
    "https://one-africa-global.herokuapp.com/api/newsfeed",
    function(newsfeed) {
      var newsData = JSON.parse(newsfeed);
      app.preloader.hide();
      // loop through the table to list out all the artist in database table
      for (var i = 0; i < newsData.length; i++) {
        var template = $$("#template").html();

        // compile it with Template7
        var compiledTemplate = Template7.compile(template);

        // Now we may render our compiled template by passing required context
        var context = {
          newsTitle: newsData[i].title,
          newsBody: newsData[i].body,
          newsDate: newsData[i].date,
          newsTime: newsData[i].time
        };
        var html = compiledTemplate(context);

        // output data to artist page
        $$("#feed-here").append(html);
      }
    }
  );
  setTimeout(() => {
    app.preloader.hide();
  }, 7000);
});

// settings page
var settingsPage = app.popup.create({
  content:
    '<div class="popup">' +
    '<p class="text-align-center"><a href="#" class="link popup-close">close</a></p>' +
    '<div class="list inset">' +
    "<ul>" +
    "<li>" +
    '<a href="#" class="item-link item-content  bottom-border-oag">' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    '<div class="item-header oag">Languages</div>' +
    '<span class="text-color-black">English</span>' +
    "</div>" +
    "</div>" +
    "</a>" +
    "</li>" +
    "<li>" +
    '<a href="#" class="item-link item-content  bottom-border-oag">' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    '<div class="item-header oag">Reminder</div>' +
    '<span class="text-color-black">We will remind you 15 minutes before the event starts.</span>' +
    "</div>" +
    "</div>" +
    "</a>" +
    "</li>" +
    "<li>" +
    '<div class="row">' +
    '<div class="col-80 item-content" style="flex-direction: column;">' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    '<div class="item-header oag">Privacy</div>' +
    '<span class="text-color-black">Location reporting</span>' +
    "</div>" +
    "</div>" +
    '<p class="item-text small text-color-black" style="max-height: none; font-size: 12px;">This feature will allow you to receive relevant contextual messages based on your location during the fest. It allows us to report on event operations. See our privacy policy for more information</p>' +
    "</div>" +
    '<div class="col-20 justify-content-center" style="margin:auto;">' +
    '<label class="toggle toggle-init">' +
    '<input type="checkbox"/>' +
    '<span class="toggle-icon"></span>' +
    "</label>" +
    "</div>" +
    "</div>" +
    "</li>" +
    "<li>" +
    '<a href="https://www.oneafricaglobal.com/home/cookies.php" class="link external item-link item-content  bottom-border-oag">' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    '<span class="text-color-black">Privacy Policy</span>' +
    "</div>" +
    "</div>" +
    "</a>" +
    "</li>" +
    "<li>" +
    '<a href="https://www.oneafricaglobal.com/home/cookies.php" class="item-link item-content  bottom-border-oag">' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    '<span class="text-color-black">Cookies Policy</span>' +
    "</div>" +
    "</div>" +
    "</a>" +
    "</li>" +
    "<li>" +
    '<a href="https://www.oneafricaglobal.com/home/terms.php" class="item-link item-content  bottom-border-oag">' +
    '<div class="item-inner">' +
    '<div class="item-title">' +
    '<span class="text-color-black">Terms of Use</span>' +
    "</div>" +
    "</div>" +
    "</a>" +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>",
  // Events
  on: {
    open: function(popup) {
      console.log("Popup open");
    },
    opened: function(popup) {
      console.log("Popup opened");
    }
  }
});
// Events also can be assigned on instance later
settingsPage.on("closed", function(popup) {
  console.log("Popup closed");
  app.panel.close();
});

// Open dynamic popup
$$(".settings-page").on("click", function() {
  settingsPage.open();
});
