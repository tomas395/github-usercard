/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// THE parental figure ↓
const parentComponent = document.querySelector(".cards");

// The Users Array
const followersArray = [
  "osogrizz",
  "Timgill987",
  "davebettswebdev",
  "Jrive204",
  "aalvinlin",
  "coltynw",
  "PHONGdotTech"
];
// Tell Axios to fetch userData
axios
  .get("https://api.github.com/users/tomas395")

  .then(res => {
    console.log("Fetched!", res);
    const createdCard = ghCards(res.data);
    parentComponent.appendChild(createdCard);
  })

  .catch(err => {
    console.log("Error: The data was not returned!", err);
  });

followersArray.forEach(item => {
  axios.get(`https:api.github.com/users/${item}`).then(res => {
    const cardDataRes = ghCards(res.data);
    const everyCard = document.querySelector(".cards");
    parentComponent.appendChild(cardDataRes);
  });
});

// The Main Variables

function ghCards(ghUserInfo) {
  const card = document.createElement("div");
  const cardImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const profileUrl = document.createElement("a");
  const bio = document.createElement("p");
  const following = document.createElement("p");
  const followers = document.createElement("p");

  // Add Classes

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  // Add Elements

  cardImg.src = ghUserInfo.avatar_url;
  name.textContent = ghUserInfo.name;
  userName.textContent = ghUserInfo.userName;
  location.textContent = `Location: ${ghUserInfo.location}`;
  profileUrl.href = ghUserInfo.html_url;
  profileUrl.textContent = ghUserInfo.html_url;
  profile.textContent = `Profile: `;
  profileUrl.target = "_blank";
  bio.textContent = ghUserInfo.bio;
  following.textContent = `Following: ${ghUserInfo.following}`;
  followers.textContent = `Followers: ${ghUserInfo.followers}`;

  // Append Children

  card.appendChild(cardImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(profileUrl);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(following);
  cardInfo.appendChild(followers);

  // ↓↓↓ DONT FORGET TO RETURN THAT DIV ↓↓↓

  return card;
}
