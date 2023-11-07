function getCORS(url, success) {
  var xhr = new XMLHttpRequest();
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest(); // fix IE8/9
  xhr.withCredentials = true;
  xhr.open("GET", url);

  xhr.onload = success;
  xhr.send();
  return xhr;
}
function getVisitUrl() {
  const loc = window.location;
  const params = new URLSearchParams(loc.search);
  const partnerId = params.get("partner");
  return partnerId ? loc.href : null;
}
function setPartner(url) {
  if (url) {
    getCORS(
      "https://amrita-center.ru/api/partner/visitor/" + encodeURIComponent(url),
      function (request) {
        var response = request.currentTarget.response || request.target.responseText;
        console.log(response);
      }
    );
  }
}

function getPartner(serviceType, fn) {
  if (serviceType) {
    getCORS("https://amrita-center.ru/api/partner/get/" + serviceType, function (request) {
      var response = request.currentTarget.response || request.target.responseText;
      console.log(response);
      fn(response);
    });
  }
}

window.addEventListener("load", function (event) {
  const url = getVisitUrl();
  setPartner(url);
});

// window.addEventListener('load', function(event) {
//     getPartner("zozh",console.warn);
// });
