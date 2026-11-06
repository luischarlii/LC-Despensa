(function () {
  var APP = "despensa";
  var ENDPOINT = "https://contador.paragugliar.workers.dev/ping";
  try {
    var id = localStorage.getItem("uid");
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(36).slice(2);
      localStorage.setItem("uid", id);
    }
    var hoy = new Date().toDateString();
    if (localStorage.getItem("ping_" + APP) === hoy) return; // ya se reportó hoy
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ app: APP, id: id }),
      keepalive: true,
    }).then(function () { localStorage.setItem("ping_" + APP, hoy); }).catch(function () {});
  } catch (e) {}
})();
