export const BACKEND_URL = "http://localhost:4567";

//USER STUFF
function getCurrentUserId(): string {
    return localStorage.getItem("papauser") || "";
}

function setCurrentUser(user: User): void {
    localStorage.setItem("papauser", user.id);
}

export type User = {
    id: string;
    username: string;
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
    localStorage.setItem("papalobby", lobby.id);
}

//not sure if we want the resturant list in local storage but this might be complicated to do
// function setLobbyList(lobby: Lobby): void {
//     localStorage.setItem("papalobbylist", lobby.restaurant_maps);
// }

export type Lobby = {
    id: string;
    code: string | null;
    restaurant_maps: Array<string>
};



async function getCurrentLobby(): Promise<Lobby | null> {

    let lobbyID = getCurrentLobbyId();

    let response = await fetch(`${BACKEND_URL}/lobby/${lobbyID}`, {
        headers: {
            papalobby: getCurrentLobbyId()
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

export type Restaurant = {
    id: string;
    name: String;
    price: String | null;
    rating: number;
    //NOT SURE HOW TO DO THE REST
    // Cuisine cuisine();
    // Address address();
    // PhoneNumber phoneNumber();
    // OperatingHours operatingHours();
};

// export type RestInfo = {
//     id: string;
//     name: string;
//     location: string | null;
//     price: string | null;
//     cuisine: string;
//     OTHER REST INFO
//     rating: {
//         value: string;
//     } | null;
// };


//
// export type Feed = {
//     shelves: Shelf[];
// };
//
// export type Shelf = {
//     title: String;
//     shelfItems: Content[];
// };

// export type Content = {
//     id: string;
//     title: string;
//     thumbnail: string | null;
//     distributorId: string | null;
//     genre: string;
//     rating: {
//         value: string;
//     } | null;
// };



export function GetRestaurantList(): Promise<string[]> {
    let lobbyID = getCurrentLobbyId();

    return fetch(`${BACKEND_URL}/${lobbyID}/getList`, {
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
            throw new Error("something went wrong loading the restaurant list" + err.message);
        });
}

// export function getFeed(): Promise<Feed> {
//     let userId = getCurrentUserId();
//
//     return fetch(`${BACKEND_URL}/user/${userId}/feed`, {
//         headers: {
//             papauser: userId
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("not logged in");
//             } else {
//                 return response.json();
//             }
//         })
//         .catch(err => {
//             throw new Error("something went wrong loading feed" + err.message);
//         });
// }

export type Result<T> =
    | {
    value: T;
    status: "success";
}
    | {
    error: string;
    status: "failure";
};

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

export async function JoinLobby(
    code: string,
): Promise<Result<Lobby>> {
    const response = await fetch(`${BACKEND_URL}/joinLobby`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
    });

    if (response.ok) {
        let lobby: Lobby = await response.json();
        //setCurrentUser(user);
        setCurrentLobby(lobby);
        return { value: lobby, status: "success" };
    } else {
        return { error: response.status.toString(), status: "failure" };
    }
}

export async function LeaveLobby() {
    await fetch(`${BACKEND_URL}/leaveLobby`, {
        method: "POST",
        headers: {
            papalobby: getCurrentLobbyId()
        }
    });
    return false;
}

let exports = {
    getCurrentUser,
    //getFeed,
    GetRestaurantList,
    getCurrentLobby,
    initLobby,
    getCurrentLobbyId,
    JoinLobby,
    LeaveLobby,
    logout,
    login
};
export default exports;