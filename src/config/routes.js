export const frontendURIs = {
    gallery: '/gallery',
    home: '/',
    admin: '/opeyemi-couples-admin',
    login: '/opeyemi-couples-access',
    register: '/opeyemi-couples-register',
    logout: '/logout',
    notFound: '*',
};

export const backendURIs = {
    base: "https://opeyemicouple.skaylrapp.biz",
    api: "https://opeyemicouple.skaylrapp.biz/api",
    auth: {
        signup: "/register",
        signin: "/login"
    },
    gallery: {
        getAdminPhotos: "/galleries/admin-response",
        getGuestPhotos: "/galleries",
        uploadImage: "/galleries",
        deletePhotos: "/galleries",
        changeImageStatus: "/galleries/change-status"
    },
};

// Function to check if a URI is in the front end URIs object or not
export function isInFrontEndUris(uri){
    return Object.values(frontendURIs).includes(uri);
}

// Function that returns the correct redirect link based on the current page and the targeted page
export function getRedirectLink(currentPage, targetPage){
    let redirectLink;
    
    switch(targetPage){
        case frontendURIs.home:
            redirectLink = isInFrontEndUris(currentPage) ? frontendURIs.login : frontendURIs.home;
            break;
        case frontendURIs.dashboard:
            redirectLink = !isInFrontEndUris(currentPage) ? frontendURIs.login : frontendURIs.dashboard;
            break;
        default:
            console.log("Invalid Target Page");
            redirectLink = "";
    }

    return `${backendURIs.base}${redirectLink}`;  // Returning the base URL plus the relative path of the desired page
}

/*  
 * The following functions are used for making API requests using fetch() method. They take care of setting up the request headers with authorization token if
    The following functions are used for data validation. They take an argument 'data' which represents the inputted information by the user. If any
    The following functions are used for making API requests using fetch() method with async/await syntax.
*/

async function makeAPIRequest(method, url, data=null, token=null) {
    const options = {
        method: method,
        headers:{
            "Content-Type": "application/json"
        },
    };

    if (token != null) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (data != null) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${backendURIs.api}/${url}`, options);
        
        /*    
            If the request was successful, it will resolve to the Response object representing the response made
              If the request was successful, i.e., if it returned a status in the range 200-299,
              then we can read the response body and return it as a promise.
        */
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.log("There has been an error with your request.", error);
    }
}

function getDataFromServer(endpoint, callback){
    // Makes a GET request to the specified endpoint on the server
    makeAPIRequest('GET', endpoint).then((data)=>{
        callback(false, data);
    }).catch((err)=>callback(true, err));
}

// Adds a new item to the database
function addItemToDB(item, token, callback){
    let url = 'items';
    makeAPIRequest('POST', url, item, token).then(()=>{
        callback(false);
    }).catch((err)=>callback(true, err))
}

// Updates an existing item in the database
function updateItemInDB(id, item, token, callback){
    let url = `items/${id}`;
    makeAPIRequest('PUT', url, item, token).then(() => {
        callback(false);
    })
    .catch((err) => {
        callback(true, "Failed to update item: " + err.message);
    });
}

export default {getDataFromServer, addItemToDB, updateItemInDB};