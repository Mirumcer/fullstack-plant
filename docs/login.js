const baseurl = "http://127.0.0.1:5000"

var jwt_token

$(document).ready(function() {
    var loginform = document.getElementById('myform');

    loginform.addEventListener("submit", function(event) {
        console.log("submit processing")
        formData = $(myform).serializeArray()
        console.log(formData);
        var fetch_url = baseurl.concat("/auth")
        formData = { "username": formData[0].value, "password": formData[1].value }

        console.log(formData)
        formData = JSON.stringify(formData)
        console.log(formData)

        fetch(fetch_url, {
            method: "post",
            mode: 'cors',
            credentials: 'same-origin',
            headers: { "Content-Type": "application/json" },
            body: formData,
        }).then(res => {
            data = res.json().then(data => {
                console.log("request complete ", data)
                jwt_token = data["access_token"]
                console.log("jwt token:", jwt_token)
                document.cookie = "jwt_token=".concat(jwt_token)
                window.location.href = "dashboard.html"
            })

        })
        event.preventDefault()
    })
})