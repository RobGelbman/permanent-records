const mongoose = require('mongoose');
const Album = require('../models/album');

const dbName = 'permanent-records';
mongoose.connect(`mongodb://localhost/${dbName}`);

const albums = [
  {
    artist : "Violent Femmes",
    title: "Violent Femmes",
    label  : "Slash",
    catalogNo: "1-23845",
    releaseDate: "1983-01-01",
    trackListing: ["Blister In The Sun", "Kiss Off", "Please Do Not Go", "Add It Up",	"Confessions", "Prove My Love", "Promise", "To The Kill", "Gone Daddy Gone", "Good Feeling"],
    genre: "Rock"
  },
  {
    artist : "Tom Petty & The Heartbreakers",
    title: "Hard Promises",
    label  : "Backstreet",
    catalogNo: "BSR-5160",
    releaseDate: "1981-05-01",
    trackListing: ["The Waiting", "A Woman In Love(It's Not Me)", "Nightwatchman", "Something Big", "King's Road", "Letting You Go", "A Thing About You", "Insider", "The Criminal Kind", "You Can Still Change Your Mind"],
    genre: "Rock"
  },
  {
    artist: "The Grateful Dead",
    title: "Workingman's Dead",
    label: "Warner Bros.",
    catalogNo: "WS 1869",
    releaseDate: "1970-06-14",
    trackListing: ["Uncle John's Band", "High Time", "Dire Wolf", "New Speedway Boogie", "Cumberland Blues", "Black Peter", "Easy Wind", "Casey Jones"],
    genre: "Rock"
  },
  {
    artist: "Bruce Springsteen",
    title: "The Wild, The Innocent, and The E St. Shuffle",
    label: "Columbia",
    catalogNo: "KC 32432",
    releaseDate: "1973-09-01",
    trackListing: ["The E Street Shuffle", "4th of July, Asbury Park (Sandy)", "Kitty's Back", "Wild Billy's Circus Story", "Incident on 57th Street", "Rosalita (Come Out Tonight)", "New York City Serenade"],
    genre: "Rock"
  },
  {
    artist:"Nick Lowe",
    title: "Pure Pop For Now People",
    label: "Columbia",
    catalogNo: "JC 35329",
    releaseDate: "1978-01-01",
    trackListing: ["So It Goes", "(I Love The Sound Of) Breaking Glass", "Tonight", "Marie Provost", "Heart Of THe City", "Rollers Show", "The Call It Rock", "No Reason", "Little Hitler", "Nutted By REality", "36 inches High", "Music For Money"],
    genre: "Rock"
  },
  {
    artist: "Taylor Swift",
    title: "1989",
    label: "Big Machine",
    catalogNo: "BMRBD0500E",
    releaseDate: "2014-12-08",
    trackListing: ["Welcome To New York", "Blank Space", "Style", "Out Of The Woods", "All You Had To Do Was Stay", "Shake It Off", "I Wish You Would", "Bad Blood", "Wildest Dreams", "How You Get THe Girl", "This Love", "I Know Places", "Clean"],
    genre: "Pop"
  },
  {
    artist: "Kanye West",
    title: "The College Dropout",
    label: "Roc-A-Fella",
    catalogNo: "B0002030-01",
    releaseDate: "2004-02-10",
    trackListing: ["We Don't CAre", "Graduation Day", "All Falls Down", "Spaceship", "Jesus Walks", "Never Let Me Down", "Get Em High", "The New Workout Plan", "Through THe Wire", "Slow Jamz", "Breathe In Breathe Out", "School Spirit", "Two Words", "Family Business", "Last Call"],
    genre: "Rap"
  },
  {
    artist: "Stevie Wonder",
    title: "Innervisions",
    label: "Tamla",
    catalogNo: "T 326L",
    releaseDate: "1973-01-01",
    trackListing: ["Too High", "Visions", "Living For The City", "Golden Lady", "Higher Ground", "Jesus Children Of America", "All In Love Is Fair", "Don't You Worry 'Bout A Thing", "He's Mistra Know-It-All"],
    genre: "R&B"
  },
  {
    artist: "James Brown",
    title: "Live At The Apollo",
    label: "King",
    catalogNo: "K-826",
    releaseDate: "1963-01-01",
    trackListing: ["Introduction", "I'll Go Crazy", "Try Me", "Think", "I Don't Mind", "Lost Someone (Part 1)", "Lost Someone (PArt 2)", "Untitled Medley", "Night Train"],
    genre: "R&B"
  },
  {
    artist: "Beyonce",
    title: "Lemonade",
    label: "Parkwood Entertainment",
    catalogNo: "88985446751",
    releaseDate: "2017-09-15",
    trackListing: ["Pray You Catch Me", "Hold Up", "Don't Hurt Yourself", "Sorry", "6 Inch", "Daddy Lessons", "Love Drought", "Sandcastles", "Forward", "Freedom", "All Night", "Formation"],
    genre: "Pop"
  },
  {
    artist: "Sturgill Simpson",
    title: "A Sailor's Guide To Earth",
    label: "Atlantic",
    catalogNo: "551380-1",
    releaseDate: "2016-04-15",
    trackListing: ["Welcome To Earth (Pollywog)", "Breaker's Roar", "Keep It Between The Lnes", "Sea Stories", "In Bloom", "Brace For Impact (Live A Little)", "All Around You", "Oh Sarah", "Call To Arms"],
    genre: "Country"
  },
  {
    artist: "Chris Stapleton",
    title: "From A Room: Volume 1",
    label: "Mercury Nashville",
    catalogNo: "B0026379-01",
    releaseDate: "2017-05-05",
    trackListing: ["Broken Halos", "Last THing I Needed, First Thing This Morning", "Second One To Know", "Up To No Good Livin'", "Either Way", "I Was Wrong", "Without Your Love", "Them Stems", "Death Row"],
    genre: "Country"
  }
]

Album.create(albums, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${albums.length} albums`)
  mongoose.connection.close()
});