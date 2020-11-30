const baseurl = "https://plant-dash-dev.ipq.co:5000"


$(document).ready(function() {
    var loginform = document.getElementById('myform');

    loginform.addEventListener("submit", function(event) {
        console.log("submit processing")
        formData = $(myform).serializeArray()
        const plant_url = baseurl.concat("/auth")
        formData = { "username": formData[0].value, "password": formData[1].value }

        formData = JSON.stringify(formData)

        fetch(plant_url, {
            method: "post",
            mode: 'cors',
            credentials: 'same-origin',
            headers: { "Content-Type": "application/json" },
            body: formData,
        }).then(res => {
            data = res.json().then(data => {
                console.log("request complete ", data)
                if (!res.ok) {
                    console.log(res.ok)
                    var invalid_message = document.getElementById("invalid_message")
                    invalid_message.style.visibility = 'visible'
                    return
                }
                var jwt_token = data["access_token"]
                console.log("jwt token:", jwt_token)
                token = jwt_token
                document.cookie = "jwt_token=".concat(token)
                window.location.href = "dashboard.html"
            })
            event.preventDefault()

        })
        event.preventDefault()
    })
})