const flashCard = document.querySelector(".flash-card")


async function flashCardFetch() {
    const response = await fetch("https://shop.mercegrower.com/wp-json/wc/store/v1/products")
    const data = await response.json()
    console.log(data);
    return data
}
flashCardFetch()


async function flashCardData() {
    const datas = await flashCardFetch();

    datas.forEach((data, i)=> {
        const element = document.createElement("div")
        element.className = `div-container ${i+1}` 
        element.enterKeyHint = data.id;

        const sale = String(data.prices.sale_price).split("")
        const sale_price = sale.slice(0, -2).join('') + '.'+ sale.slice(-2).join('')

        const regular = String(data.prices.regular_price).split("")
        const regular_price = regular.slice(0, -2).join('')+ '.'+ regular.slice(-2).join('')

        const discount = regular_price - sale_price
        const regularData = regular_price == sale_price

        element.innerHTML = `
        <a href="./product.html?${data.id}" style="text-decoration:none; color:black">
        <div class="card ">
            ${regularData ? "" : `  
            <div class="card-head">
                <h5>Deal Of The Day</h5>
                <div class="deal-time " id= "${data.id}">

                </div>
              </div>`}

              <img
              sizes="${data.images[0].sizes}"
              loading="lazy"
              decoding="async"
              srcset="${data.images[0].srcset}"
              class="product"
              width = "241px"
              height = "229px"
              alt="card-img"
              />

              <div class="card-buttom">
                <div class="title">
                  <h3>${data.name}</h3>
                  <h6>${data.add_to_cart.description}</h6>
                </div>

                <div class="star-price">
                  <div class="star">
                    <img src="./images/Header/Icon/star.png" alt="" />
                    <img src="./images/Header/Icon/star.png" alt="" />
                    <img src="./images/Header/Icon/star.png" alt="" />
                    <img src="./images/Header/Icon/star.png" alt="" />
                    <h6>(${data.average_rating})</h6>
                  </div>

                  <div class="price">
                    <h3>${sale_price}${data.prices.currency_prefix}</h3>
                    
                    
                    ${ regularData ? "" : `
                    <h5><del>${regular_price}${data.prices.currency_prefix}</del></h5>
                    <div>
                      <h5>Safe ${discount}${data.prices.currency_prefix}</h5>`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </a>
        `

        
        function  timeGenaretor(
          from = new Date(2024, 0 ,1),
          to = new Date()
        ){
          return new Date(
            from.getTime() + Math.random() * (to.getTime() - from.getTime()),
          )
        }
        // Set the date we're counting down to
var countDownDate = new Date(timeGenaretor()).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  const time = document.getElementById(`${data.id}`)
if (time) {
  time.innerHTML = `
  <div class="time">
  <h2>${days}</h2>
  <h6>Days</h6>
</div>
<img src="./images/Header/Icon/Colon.png" width="" />

  <div class="time">
  <h2>${hours}</h2>
  <h6>hour</h6>
</div>
<img src="./images/Header/Icon/Colon.png" width="" />
<div class="time">
  <h2>${minutes}</h2>
  <h6>min</h6>
</div>
<img src="./images/Header/Icon/Colon.png" alt="" />
<div class="time">
  <h2>${seconds}</h2>
  <h6>sec</h6>
</div>
  `
}

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById(`${data.id}`).innerHTML = "EXPIRED";
  }
}, 1000);

        flashCard.append(element)
        console.log(element);
    });
}

flashCardData()