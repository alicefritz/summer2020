let restaurants = [];
let sortedAsc = false;

function getRestaurants(){
    //this fetch does not work when running index.html locally in browser since fetch() expects a URL.
    //i left it like this since in a "real" situation the list of restaurants wouldn't come from a local file anyway.
    //running the file on localhost solves this.
    fetch('restaurants.json')
    .then(data => data.json())
    .then(data => {
        restaurants = data.restaurants;
        renderRestaurants();
    });
}

function renderRestaurants(){
    const restaurantsContainer = document.getElementById('restaurants');
    restaurantsContainer.innerHTML = "";
    restaurants.forEach(restaurant => {
        createRestaurantCard(restaurant);
    });
}

function createRestaurantCard({name, image, online, tags}){
    const restaurantCard = document.createElement('div');
    restaurantCard.setAttribute('class', 'restaurantCard');
    const restaurantTitle = document.createElement('h3');
    restaurantTitle.setAttribute('class', 'restaurantTitle');
    const restaurantTitleContent = document.createTextNode(name);
    restaurantTitle.appendChild(restaurantTitleContent);
    
    const restaurantImage = document.createElement('img');
    restaurantImage.setAttribute('class', 'restaurantImage');
    restaurantImage.setAttribute('src', image);
    
    const restaurantOnlineStatus = document.createElement('div');

    if(online === true){
        restaurantOnlineStatus.appendChild(document.createTextNode('Open'));
        restaurantOnlineStatus.setAttribute('class', 'online open');
    }else{
        restaurantOnlineStatus.appendChild(document.createTextNode('Closed'));
        restaurantOnlineStatus.setAttribute('class', 'online closed');
    }

    const restaurantTags = document.createElement('div');
    restaurantTags.setAttribute('class', 'tags');
    tags.forEach((tag, i) => {
        restaurantTags.appendChild(document.createTextNode(tag));
        if(i != tags.length-1){
            restaurantTags.appendChild(document.createTextNode(', '));
        }
    });

    restaurantCard.append(restaurantImage);
    restaurantCard.append(restaurantTitle);
    restaurantCard.append(restaurantTags);
    restaurantCard.append(restaurantOnlineStatus);
    document.getElementById('restaurants').append(restaurantCard);
}

document.getElementById('sortButton').addEventListener('click', () => {  
        sortRestaurants();
        renderRestaurants();
});

function sortRestaurants(){
    const sortButton = document.getElementById('sortButton');
    if(sortedAsc === false){
        restaurants.sort((a, b) => {
            if (a.name < b.name){
                return -1;
            } else if (a.name > b.name){
                return 1;
            } else{
                return 0;
            }
        });
        sortedAsc = true;
        sortButton.innerHTML = "Sort by Z-A";
    }else if(sortedAsc === true){
        restaurants.sort((a, b) => {
            if (a.name > b.name){
                return -1;
            } else if (a.name < b.name){
                return 1;
            } else{
                return 0;
            }
        });
        sortedAsc = false;
        sortButton.innerHTML = "Sort by A-Z";
    }
    
}








