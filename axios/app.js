const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const putPatchBtn = document.getElementById("put-patch");
const deleteBtn = document.getElementById("delete");
const ayniAndaIstek = document.getElementById("ayni-anda-istek");
const headersBtn = document.getElementById("headers");
const hataBtn = document.getElementById("hata");

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", postData);
putPatchBtn.addEventListener("click", putPatchData);
deleteBtn.addEventListener("click", deleteData);
ayniAndaIstek.addEventListener("click", ayniAndaIstekData);
// headersBtn.addEventListener("click", headersData);
hataBtn.addEventListener("click", hataData);

// 200 veya 201 gibi olumlu dönen isteklerde bu çalıştırılır
// 2xx aralığında bulunan herhangi bir durum kodu bu fonksiyonun tetiklenmesine neden olur
axios.interceptors.request.use(config => {
    console.log(`${config.url} linkine ${config.method} isteği yapıldı ve timout ${config.timeout} olarak ayarlandı`);
    return config;
});

// 
// axios.interceptors.response.use(response => {
//     if (response.status === 200) {
//         response.status = 999;
//     }
//     return response;
// }, err => {
//     return Promise.reject(err);
// });

function hataData() {
    axios.get('https://jsonplaceholder.typicode.com/usersduaıdıasıdo?_limit=2')
        .then(response => ekranaYazdir(response))
        .catch(hata => hatayiYazdir(hata))
        .then(() => { console.log("hata data") })
}

function hatayiYazdir(hata) {
    console.log(hata + "dfdsfsf");
    document.querySelector('.sonuc').innerHTML = `
    <div class="notification is-info">
    <div class="columns is-mobile is-vcentered">
        <div class="column"><h1 class="subtitle">Sonuç : </h1></div>
        <div class="column"><h1 class="subtitle">
        <pre>${JSON.stringify(hata.response, null, 2)}</pre></h1></div>
    </div>
    </div>`

}
function ayniAndaIstekData() {
    // axios.all([
    //     axios.get('https://jsonplaceholder.typicode.com/users'),
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    // ]).then(response =>{
    //     console.log(response[0]);
    //     console.log(response[1]);
    //     ekranaYazdir(response[0])
    // });

    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/users?_limit=1'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=1')
    ]).then(axios.spread((kullanicilar, postlar) => {
        console.log(kullanicilar.data);
        console.log(postlar.data);
        ekranaYazdir(kullanicilar);
    }));

}

function deleteData() {
    axios
        .delete("https://jsonplaceholder.typicode.com/users/1")
        .then(response => ekranaYazdir(response))
        .catch(hata => console.log(hata))
        .then(() => console.log("delete çalıştı"))
}

function putPatchData() {
    // axios
    //     .put("https://jsonplaceholder.typicode.com/users/1", {
    //         name: "feyza",
    //         username: "crayzgirl46",
    //         email: "crayz@typicode.com"
    //     })
    //     .then(response => ekranaYazdir(response))
    //     .catch(hata => console.log(hata))
    //     .then(() => console.log("putPatchData çalıştı"));

    axios
        .patch("https://jsonplaceholder.typicode.com/users/1", {
            name: "feyza",
            username: "crayzgirl46",
            email: "crayz@typicode.com"
        })
        .then(response => ekranaYazdir(response))
        .catch(hata => console.log(hata))
        .then(() => console.log("putPatchData çalıştı"))
    /*
        put => gönderilen verileri günceller, diğerlerini siler
        patch => gönderilen verileri günceller, diğerlerine karışmaz
    */

}

function getData() {
    // yöntem 1
    // axios({
    //     method: "GET",
    //     url: "https://jsonplaceholder.typicode.com/users",
    //     params: {
    //         _limit:2
    //     }

    // })
    //     .then(response => ekranaYazdir(response))
    //     .catch(hata => console.log(hata))
    //     .then(() => console.log("get çalıştı"));


    // yöntem 2
    // axios
    //     .get('https://jsonplaceholder.typicode.com/users', { params: { _limit: 1 } })
    //     .then(response => ekranaYazdir(response))
    //     .catch(hata => console.log(hata))
    //     .then(() => console.log("get çalıştı"));

    // yöntem 3
    axios
        .get('https://jsonplaceholder.typicode.com/users?_limit=3')
        .then(response => ekranaYazdir(response))
        .catch(hata => console.log(hata))
        .then(() => console.log("get çalıştı"));
}

function postData() {
    axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'Yeni başlık',
        body: 'body kısmı',
        userId: 256
    })
        .then(response => ekranaYazdir(response))
        .catch(hata => console.log(hata))
        .then(() => console.log("post çalıştı"));
}

function ekranaYazdir(response) {
    document.querySelector('.sonuc').innerHTML = `
    <div class="section">
    <div class="notification is-info">
    <div class="columns is-mobile is-vcentered">
        <div class="column"><h1 class="subtitle">Sonuc</h1></div>
        <div class="column"><h1 class="subtitle">${response.status}</h1></div>
    </div>
    </div>
    </div>
    
    <div class="section">
        <article class="message is-success">
            <div class="message-header">
                <p>Header</p>
            </div>
            <div class="message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.headers, null, 4)}</pre>
            </div>
        </article>
    </div>
    
    <div class="section">
        <article class="message is-warning">
            <div class="message-header">
                <p>Data</p>
            </div>
            <div class="message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.data, null, 4)}</pre>
            </div>
        </article>
    </div>

    <div class="section">
        <article class="message is-info">
            <div class="message-header">
                <p>Config</p>
            </div>
            <div class="message-body has-background-white has-text-dark">
            <pre>${JSON.stringify(response.config, null, 4)}</pre>
            </div>
        </article>
    </div>
    `

}