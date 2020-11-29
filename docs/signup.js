const baseurl = "https://plant-dash-dev.ipq.co:5000"


$(document).ready(function() {
    var loginform = document.getElementById('myform');

    loginform.addEventListener("submit", function(event) {
        console.log("submit processing")
            //formData = { "username": username, "password": password }
        formData = $(myform).serializeArray()
        const plant_url = baseurl.concat("/new_user")
        formData = { "username": formData[0].value, "password": formData[1].value }

        console.log(formData)
        formData = JSON.stringify(formData)
        console.log(formData)

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
                        //var invalid_message = document.getElementById("invalid_message")
                        //invalid_message.style.visibility = 'visible'
                    return
                }
                console.log("changing to login window")
                window.location.href = "login.html"
            })
            event.preventDefault()

        })
        event.preventDefault()
    })
})