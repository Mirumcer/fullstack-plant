const baseurl = "http://34.82.148.121:5000"


$(document).ready(function() {
    var contactform = document.getElementById('contactform');

    contactform.addEventListener("submit", function(event) {
        console.log("submit processing")
        formData = $(contactform).serializeArray()
        console.log(formData);
        const contactus_url = baseurl.concat("/feedback")
        formData = { "name": formData[0].value, "email": formData[1].value, "message": formData[2].value }

        console.log(formData)
        formData = JSON.stringify(formData)
        console.log(formData)

        fetch(contactus_url, {
            method: "post",
            mode: 'cors',
            credentials: 'same-origin',
            headers: { "Content-Type": "application/json" },
            body: formData,
        }).then(res => {
            data = res.json().then(data => {
                console.log("request complete ", data)
                window.location.href = "contactus.html"
            })

        })
        event.preventDefault()
    })
})