
// Html elements

var sitename = document.getElementById("SiteName");
var siteurl = document.getElementById("SiteURL");
var sites = document.getElementById("sites");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");




// variables

var namevaild = /^[a-z]{3,}$/i;
var urlvalid = /^(https?:\/\/)?(www\.)?(\w|\-){1,}\.(com|net|org)$/i;
var sitelst = JSON.parse(localStorage.getItem("lst")) || [];





displayall();



// Functions

function addsite(name, url) {

    var site = {
        name: sitename.value,
        url: siteurl.value
    }
    
    if (isvalid(site.name, site.url)) {

        sitelst.push(site);
        localStorage.setItem("lst", JSON.stringify(sitelst));
        console.log(sitelst);
        displaysite(sitelst.length - 1);
    }
    else {

        Swal.fire({
            title: `<h3> Site Name or Url is not valid, Please follow the rules below :</h3>`,
            html: `
            <div class="position-absolute" style="margin-top:-185px">
               <i class="fa-solid fa-circle" style="color: #f15f5d;"></i>
               <i class="fa-solid fa-circle" style="color: #FFD43B;"></i>
               <i class="fa-solid fa-circle" style="color: #74ee72;"></i>
            </div>

             <p>
             <i class="fa-regular fa-circle-right text-danger"></i>
             Site name must contain at least 3 characters
             </p>
              <p>
              <i class="fa-regular fa-circle-right text-danger"></i>
              Site URL must be a valid one
              </p>
             
            `,

            showCloseButton: true
        });

    }
    resetinput();

}


function resetinput() {
    sitename.value = "";
    siteurl.value = "";
}


function isvalid(name, url) {

    for (var i=0;i< sitelst.length;++i) {

        if (sitelst[i].name.toLowerCase() === name.toLowerCase()) {
            window.alert("Site name already exists!");
            return false;
        }
    }

    if (namevaild.test(name) && urlvalid.test(url)) {

        return true;
    }
    else {
        return false;
    }

}

function errorname(name) {

    if (namevaild.test(sitename.value)) {
        sitename.classList.remove("is-invalid");
        sitename.classList.add("is-valid");
    }
    else {
        sitename.classList.remove("is-valid");
        sitename.classList.add("is-invalid");
    }
}
function errorurl(url) {
    if (urlvalid.test(siteurl.value)) {
        siteurl.classList.remove("is-invalid");
        siteurl.classList.add("is-valid");
    }
    else {
        siteurl.classList.remove("is-valid");
        siteurl.classList.add("is-invalid");
    }
}

function button() {
    
    btn2.classList.remove('btn-danger');
    btn2.classList.add('btn-outline-dark');
}



function displaysite(index) {
    var htmlsite = `

    <tr>

        <th scope="row">${index + 1}</th>
        <td>${sitelst[index].name}</td>

        <td>
            <button type="button" class="btn btn-success">
                <i class="fa-solid fa-eye"></i>
                <a href="${sitelst[index].url}" class="text-decoration-none text-white">Visit</a>
            </button>
        </td>

        <td>
            <button type="button" class="btn btn-danger" id="btn2"  onclick="deletesite()">
                <i class="fa-solid fa-trash"></i>
                    Delete
            </button>
        </td>

    </tr>
    
    `
    sites.innerHTML += htmlsite;

}

function displayall() {

    for (var i = 0; i < sitelst.length; ++i) {
        displaysite(i);
    }
}


function deletesite(index) {

    sitelst.splice(index, 1);
    localStorage.setItem("lst", JSON.stringify(sitelst));
    sites.innerHTML = "";
    displayall();
}