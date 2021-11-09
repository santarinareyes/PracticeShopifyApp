const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;
console.log("test-script.js");

document.getElementsByTagName("head")[0].appendChild(script);

function handler() {
  const header = $("p.announcement-bar__message").parent();

  const createHeader = (data) => {
    header.prepend(`<div>${data}</div>`).css({
      backgroundColor: "orange",
      textAlign: "center",
      fontWeight: "bold",
    });
  };

  fetch(
    "https://cors-anywhere.herokuapp.com/https://2d48-188-149-211-205.ngrok.io/api/products?shop=samplestorerichard.myshopify.com"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("handler data", data);
      //   createHeader(data.data).catch((error) => console.log("error", error));
    })
    .catch((error) => console.log("test-script.js handler()", error));
}
