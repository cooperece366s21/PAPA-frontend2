export const BACKEND_URL = "http://localhost:4567";

function getCurrentUserId(): string {
    return localStorage.getItem("PAPAuser") || "";
}

function setCurrentUser(user: User): void {
    localStorage.setItem("PAPA", user.id);
}

export type User = {
    id: string;
    name: string;
    subscription: string | null;
    genres: string[];
};

async function getCurrentUser(): Promise<User | null> {
    let response = await fetch(`${BACKEND_URL}/me`, {
        headers: {
            PAPAuser: getCurrentUserId()
        }
    });

    if (!response.ok) {
        // throw new Error("not logged in");
        return null;
    } else {
        return await response.json();
    }
}
//
// export type Feed = {
//     shelves: Shelf[];
// };
//
// export type Shelf = {
//     title: String;
//     shelfItems: Content[];
// };

export type Content = {
    id: string;
    title: string;
    thumbnail: string | null;
    distributorId: string | null;
    genre: string;
    rating: {
        value: string;
    } | null;
};

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

let exports = {
    getCurrentUser,
    //getFeed,
    logout,
    login
};
export default exports;