const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;
document.getElementsByTagName("head")[0].appendChild(script);

function handler() {
  const shop = Shopify.shop;

  const body = $("body");
  body.css({ position: "relative" });

  const init = (products) => {
    const recommendItemsContainer = $(`
        <div>
            <h3>Recommended By Us</h3>
            ${products.map((item) => {
              return `
                    <a href="/products/${item.handle}" 
                        style="
                        display: flex; 
                        align-items: center; 
                        padding: 20px 10px; 
                        border-top: 1px solid #f3f3f3";
                        text-decoration: none;
                        "
                        >
                        <img src=${item.images[0].originalSrc} style="width: 75px;" />
                            <div 
                                style="
                                display: flex; 
                                justify-content: space-between; 
                                align-items: start; 
                                width: 100%;"
                                >
                                <p style="padding: 0 10px">${item.title}</p>
                                <p>${item.variants[0].price}</p>
                            </div>    
                    </a>
                `;
            })}
        </div>
    `).css({
      overflowY: "scroll",
      position: "fixed",
      backgroundColor: "#ffff",
      border: "1px solid #f3f3f3",
      bottom: "85px",
      right: "20px",
      height: "400px",
      width: "350px",
      display: "none",
      zIndex: "100",
      borderRadius: "5px",
      padding: "0 10px",
      boxShadow: `rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px,
    rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px`,
    });

    const buttonContainer = $("<button>Recommended By Us</button>").css({
      position: "fixed",
      width: "150px",
      bottom: "20px",
      right: "20px",
      padding: "15px 25px",
      borderRadius: "5px",
      border: "#f3f3f3",
      fontWeight: "500",
      cursor: "pointer",
    });

    body.append(recommendItemsContainer);
    body.append(buttonContainer);

    buttonContainer.click(() => {
      recommendItemsContainer.slideToggle();
    });
  };

  fetch(
    "https://cors-anywhere.herokuapp.com/https://2d48-188-149-211-205.ngrok.io/api/products?shop=samplestorerichard.myshopify.com"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("handler data", data);
      init(data.data);
    })
    .catch((error) => console.log("test-script.js handler()", error));
}
