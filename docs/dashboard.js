const baseurl = "http://127.0.0.1:5000"

$(document).ready(function() {
    console.log("in dashboard.js")

    //Check if JWT cookie is set an valid
    //if not go back to login
    var cookie = document.cookie
    jwt_token = cookie.split('=')[1]
    console.log("jwt Cookie", jwt_token)

    //JWT is valid
    //get the plants and display them

    display_plants()

    function display_plants() {
        const fetch_url = baseurl.concat("/plants")

        fetch(fetch_url, {
            method: "GET",
            credentials: 'include',

            headers: {
                "Content-Type": "application/json",
                "Authorization": `jwt ${jwt_token}`
            }

        }).then(res => {
            data = res.json().then(data => {
                console.log("request complete ", data)
            })
        })
    }
})