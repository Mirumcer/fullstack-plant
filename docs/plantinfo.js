const baseurl = "https://plant-dash-dev.ipq.co:5000"


$(document).ready(function() {
    //Check if JWT cookie is set an valid
    //if not go back to login
    var cookie = document.cookie
    if (!cookie) {
        window.location.href = "login.html"
    }
    jwt_token = cookie.split('=')[1]
    console.log("jwt Cookie", jwt_token)

    document.getElementById('contactform').addEventListener("submit", function(event) {
        const fetch_url = baseurl.concat("/plant")
        var name = $('#name').val()
        console.log(name)

        var form = document.getElementById("contactform")

        fetch(fetch_url, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Authorization": `jwt ${jwt_token}`
            },
            body: new FormData(form),

        }).then(res => {
            data = res.json().then(data => {
                console.log("request complete ", data)
                if (res.ok) {
                    console.log("submit complete", res.status)
                    window.location.href = "dashboard.html"
                }

            })
            event.preventDefault()
        })
        event.preventDefault()


    })

})