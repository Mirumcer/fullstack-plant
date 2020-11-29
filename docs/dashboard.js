const baseurl = "http://127.0.0.1:5000"

$(document).ready(function() {
    console.log("in dashboard.js")

    //Check if JWT cookie is set an valid
    //if not go back to login
    var cookie = document.cookie
    if (!cookie) {
        window.location.href = "login.html"
    }
    jwt_token = cookie.split('=')[1]
    console.log("jwt Cookie", jwt_token)

    //JWT is valid
    //get the plants and display them
    get_plants()
})

function get_plants() {
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
            if (res.ok) {
                display_plants(data);
            }

        })
    })
}

//add the plants to the document page
function display_plants(data) {
    var getUrl = window.location;
    var currentUrl = getUrl.protocol + "//" + getUrl.host + "/"
    plant_container = document.getElementById('plant_container')
    for (plant in data) {
        console.log(data[plant])
        html_plant = build_plant(data[plant])
        plant_container.appendChild(html_plant)
    }
}

//Build the Plant document node
function build_plant(plant) {
    var src_html = document.getElementById('plant_card').outerHTML;
    var html_plant = createElementFromHTML(src_html)

    //set the plant img path
    plant_img = html_plant.getElementsByTagName('img')[0]
    plant_img.src = plant['img_path']

    //set the plant information
    title = html_plant.getElementsByTagName('h2')[0]
    title.innerHTML = plant['name']

    description = html_plant.getElementsByTagName('p')[0]
    description.innerHTML = plant['notes']

    html_plant.style.display = 'inline'

    return html_plant
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}