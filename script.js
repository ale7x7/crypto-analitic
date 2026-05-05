const priceBox = document.getElementById("priceBox");

// LIVE PRICE (Binance)
async function loadPrice() {
  const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
  const data = await res.json();

  const price = parseFloat(data.price).toFixed(2);

  priceBox.innerHTML = `$${price}`;
}

setInterval(loadPrice, 3000);
loadPrice();

// SIGNAL GENERATOR (logic simplificat dar realist)
async function generateSignals() {

  const res = await fetch("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=50");
  const data = await res.json();

  const closes = data.map(c => parseFloat(c[4]));

  const last = closes[closes.length - 1];
  const prev = closes[closes.length - 2];

  let signal, tp, sl;

  if (last > prev) {
    signal = "BUY";
    tp = last + 200;
    sl = last - 100;
  } else {
    signal = "SELL";
    tp = last - 200;
    sl = last + 100;
  }

  document.getElementById("signalsBox").innerHTML = `
    <b>${signal}</b><br>
    Entry: ${last.toFixed(2)}<br>
    TP: ${tp.toFixed(2)}<br>
    SL: ${sl.toFixed(2)}
  `;
}