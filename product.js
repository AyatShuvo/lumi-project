
const windo2 =  window.location.search
if(!windo2){
    window.location.replace("http://127.0.0.1:5500/luminece-store-desing/Error.html")
}
const windo =  window.location.href.split("?")



async function fartt(id) {
    const respose = await fetch(`https://shop.mercegrower.com/wp-json/wc/store/v1/products/${id}`)
    if (respose.status == 200) {
        const data = await respose.json()  
        return data
    } else {
        const data = 404
        return data
    }

}

fetchData = async ()=> {
const datas = await fartt(windo[1])
    // if (!datas.data.status === 404) {
    //     console.log("rsdfg");
    // } else {
    //     console.log("drgdrgd");
    // }
    if (datas == 404 ) {
        window.location.replace("http://127.0.0.1:5500/luminece-store-desing/Error.html")
    } else {
        console.log(datas);
    }
}
fetchData()



