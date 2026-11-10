function loadUser(userId, callback) {

    setTimeout(() => {

        const user = {
            id: userId,
            name: "Stacy Otieno",
            age: 21,
            email: "jjaqkuxhi@gmail.com"
        };

        callback(user);

    }, 1500);

}

loadUser(1, function(user) {
    console.log("User loaded:", user);
});