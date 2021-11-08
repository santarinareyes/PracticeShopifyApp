const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;

document.getElementsByTagName("head")[0].appendChild(script);
console.log("test-script.js");

function handler() {
  const header = $("p.announcement-bar__message").parent();
  header
    .prepend("<div>This is from test-script.js</div>")
    .css({ backgroundColor: "orange" });
}
