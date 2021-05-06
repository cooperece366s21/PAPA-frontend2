export const BACKEND_URL = "http://localhost:4567";

//USER STUFF
function getCurrentUserId(): string {
    return localStorage.getItem("papauser") || "";
}

function setCurrentUser(user: User): void {
    localStorage.setItem("papauser", user.ID);
    // debugger;
}

export type User = {
    ID: string;
    name: string;

};

async function getCurrentUser(): Promise<User | null> {
    let response = await fetch(`${BACKEND_URL}/me`, {
        headers: {
            papauser: getCurrentUserId()
        }
    });

    if (!response.ok) {
        // throw new Error("not logged in");
        return null;
    } else {
        return await response.json();
    }
}

//LOBBY stuff
function getCurrentLobbyId(): string {
    return localStorage.getItem("papalobby") || "";
}

function setCurrentLobby(lobby: Lobby): void {
    localStorage.setItem("papalobby", lobby.ID);
}

async function getCurrentLobby(): Promise<Lobby | null> {

    let lobbyID = getCurrentLobbyId();

    let response = await fetch(`${BACKEND_URL}/lobby/${lobbyID}`, {
        headers: {
            papalobby: getCurrentLobbyId()
            // papalobbylist: GetRestaurantList()
        }
    });

    if (!response.ok) {
        // throw new Error("not logged in");
        return null;
    } else {
        return await response.json();
    }
}

export function initLobby(): Promise<Lobby> {
    let lobbyID = getCurrentLobbyId();
    // let lobbyID = "code1"
    return fetch(`${BACKEND_URL}/${lobbyID}/init`, {
        headers: {
            papalobby: lobbyID
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("not logged in");
            } else {
                return response.json();
            }
        })
        .catch(err => {
            throw new Error("something went wrong intializing the lobby" + err.message);
        });
}

export function getRecommendation(): Promise<Restaurant> {
    let lobbyID = getCurrentLobbyId();
    // let lobbyID = "code1"
    return fetch(`${BACKEND_URL}/${lobbyID}/recommendation`, {
        headers: {
            papalobby: lobbyID
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("not logged in");
            } else {
                return response.json();
            }
        })
        .catch(err => {
            throw new Error("something went wrong getting the recommendation for the lobby" + err.message);
        });
}

export type Lobby = {
    ID: string;
    code: string | null;
    ownerID: string | null;
    // restaurantList: Restaurant[];
};

export type Feed = {
    // restaurants: Restaurant[];
    restaurants: Restaurant[];
}

export type Restaurant = {
    ID: string | null;
    alias: string | null;
    name: string | null;
    isOpenNow: boolean | null;
    displayPhone: string | null;
    price: string | null;
    rating: string | null;
    address: string;
    cuisine: string[];
    phoneNumber: string;
}


export type Cuisine = {
    alias: string;
    title: string;
}

export type Address = {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string[];
    cross_streets: string;

}

export function GetUserList(): Promise<String[]> {
    let lobbyID = getCurrentLobbyId();
    //let restID = getCurrentRestaurantId();
    // let lobbyID = "code1"
    return fetch(`${BACKEND_URL}/${lobbyID}/getLobbyUsers`, {
        headers: {
            papalobby: lobbyID
        }
    })
        .then(response => {
            if(!response.ok) {
                throw new Error("not in a lobby");
            } else {
                return response.json();
            }
        })
        .catch(err => {
            throw new Error("something went wrong loading the user list" + err.message);
        });
}

export function GetRestaurantList(): Promise<Restaurant[]> {
    let lobbyID = getCurrentLobbyId();
    let restID = getCurrentRestaurantId();
    // let lobbyID = "code1"
    return fetch(`${BACKEND_URL}/${lobbyID}/getList`, {
        headers: {
            papalobby: lobbyID,
            papacurrentrest: restID
        }
    })
        .then(response => {
            if(!response.ok) {
                throw new Error("not in a lobby");
            } else {
                return response.json();
            }
        })
        .catch(err => {
            throw new Error("something went wrong loading the restaurant list" + err.message);
        });
}

export function GetUrls(): Promise<string[]> {
    let lobbyID = getCurrentLobbyId();
    //let restID = getCurrentRestaurantId();
    // let lobbyID = "code1"
    return fetch(`${BACKEND_URL}/${lobbyID}/image_url_list`, {
        headers: {
            papalobby: lobbyID
        }

    })
        .then(response => {
            if(!response.ok) {
                throw new Error("not in a lobby");
            } else {
                return response.json();
            }
        })
        .catch(err => {
            throw new Error("something went wrong loading the restaurant info" + err.message);
        });
}

export function getLobbyFeed(): Promise<Feed> {
    let lobbyID = getCurrentLobbyId();
    // let lobbyID = "code1"

    return fetch(`${BACKEND_URL}/${lobbyID}/getLobbyFeed`, {
        headers: {
            papalobby: lobbyID
        }
    })
        .then(response => {
            if(!response.ok) {
                throw new Error("not in a lobby");
            } else {
                return response.json();
            }
        })
        .catch(err => {
            throw new Error("something went wrong loading the lobby feed" + err.message);
        });
}

export type Result<T> =
    | {
    value: T;
    status: "success";
}
    | {
    error: string;
    status: "failure";
};

export async function SignUp(
    username: string,
    password: string
): Promise<Result<User>> {
    const response = await fetch(`${BACKEND_URL}/${username}/${password}/signUp`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        let user: User = await response.json();

        //setCurrentUser(user);

        return { value: user, status: "success" };
    } else {
        return { error: response.status.toString(), status: "failure" };
    }
}

export async function login(
    username: string,
    password: string
): Promise<Result<User>> {
    const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        let user: User = await response.json();

        setCurrentUser(user);

        return { value: user, status: "success" };
    } else {
        return { error: response.status.toString(), status: "failure" };
    }
}

export async function logout() {
    await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        headers: {
            papauser: getCurrentUserId()
        }
    });
    return false;
}

export async function CreateLobby(
    location: string,
    keyword: string,
): Promise<Result<Lobby>> {

    let userID = getCurrentUserId();

    const response = await fetch(`${BACKEND_URL}/${userID}/${location}/${keyword}/createLobby`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            papauser: getCurrentUserId()
        },
        body: JSON.stringify({location, keyword})
    });

    if (response.ok) {
        let lobby: Lobby = await response.json();
        //setCurrentUser(user);
        setCurrentLobby(lobby);
        return {value: lobby, status: "success"};
    } else {
        return {error: response.status.toString(), status: "failure"};
    }
}

export async function JoinLobby(
    code: string,
): Promise<Result<Lobby>> {
    //setCurrentUser(user);
    let userID = getCurrentUserId();
    const response = await fetch(`${BACKEND_URL}/joinLobby`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            papauser: userID
        },
        body: JSON.stringify({code})
    });

    if (response.ok) {
        let lobby: Lobby = await response.json();
        //setCurrentUser(user);
        setCurrentLobby(lobby);
        return {value: lobby, status: "success"};
    } else {
        return {error: response.status.toString(), status: "failure"};
    }
}

export async function LeaveLobby() {
    let userID = getCurrentUserId();
    let lobbyID =  getCurrentLobbyId();
    await fetch(`${BACKEND_URL}/leaveLobby`, {
        method: "POST",
        headers: {
            papalobby: lobbyID,
            papauser: userID
        }
    });
    return false;
}

//restaurant stuff
function getCurrentRestaurantId(): string {
    return localStorage.getItem("papacurrentrest") || "";
}

export function setCurrentRestaurant(restaurant: string | null): void {

    if(restaurant == null){
        restaurant = "currentlyNothing"
    }
    //console.log(restaurant)
    localStorage.setItem("papacurrentrest", restaurant);
}

export async function Like() {
    let lobbyID = getCurrentLobbyId();
    let userID = getCurrentUserId();
    // debugger;
    let restID = getCurrentRestaurantId();
    // let lobbyID = "code1";
    // let userID = "Pablo";
    //let restID = "panya-bakery-new-york";
    await fetch(`${BACKEND_URL}/${userID}/${lobbyID}/${restID}/like`, {
        method: "POST",
        headers: {
            papauser: userID,
            papalobby: lobbyID,
            papacurrentrest: restID
        }
    });
    return false;
}

export async function Dislike() {
    let lobbyID = getCurrentLobbyId();
    let userID = getCurrentUserId();
    let restID = getCurrentRestaurantId();
    // let lobbyID = "code1";
    // let userID = "Pablo";
    //let restID = "panya-bakery-new-york";
    await fetch(`${BACKEND_URL}/${userID}/${lobbyID}/${restID}/dislike`, {
        method: "POST",
        headers: {
            papauser: userID,
            papalobby: lobbyID,
            papacurrentrest: restID
        }
    });
    return false;
}

let exports = {
    getCurrentUser,
    GetUserList,
    GetUrls,
    getLobbyFeed,
    GetRestaurantList,
    getCurrentLobby,
    initLobby,
    getCurrentLobbyId,
    CreateLobby,
    JoinLobby,
    LeaveLobby,
    setCurrentRestaurant,
    SignUp,
    logout,
    login,
    Like,
    Dislike,
    getRecommendation
};
export default exports;