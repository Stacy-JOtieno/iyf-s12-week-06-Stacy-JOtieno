
/* WEEK 6 - TASK 11.4
   BUILD: Rewrite Callback Hell Using Async/Await
*/


// 1. Get user information
function getUserData(userId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (userId > 0) {

                resolve({
                    id: userId,
                    name: "John"
                });

            } else {

                reject("Invalid user ID");

            }

        }, 1000);

    });

}


// 2. Get user posts
function getUserPosts(userId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (userId > 0) {

                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);

            } else {

                reject("Invalid user ID");

            }

        }, 1000);

    });

}


// 3. Get post comments
function getPostComments(postId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (postId > 0) {

                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);

            } else {

                reject("Invalid post ID");

            }

        }, 1000);

    });

}


// 4. Rewrite callback hell using async/await
async function getCompleteUserData(userId) {

    try {

        // Get user information
        const user = await getUserData(userId);

        console.log("User:", user);


        // Get user posts
        const posts = await getUserPosts(user.id);

        console.log("Posts:", posts);


        // Get comments for the first post
        const comments = await getPostComments(posts[0].id);

        console.log("Comments:", comments);


        // Return all information
        return {
            user,
            posts,
            comments
        };

    } catch (error) {

        console.error("Error:", error);

        throw error;

    }

}


// 5. Execute the function
async function main() {

    try {

        const result = await getCompleteUserData(1);

        console.log("All data retrieved successfully!");

        console.log(result);

    } catch (error) {

        console.error("Main error:", error);

    }

}


// Start the program
main();
