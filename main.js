function sgToPct(sg){
  if(sg < 1.17) return 17.136 * sg**3 - 120.05 * sg**2 + 338.34 * sg - 235.41;
  return -346.29 * sg**6 + 3010.6 * sg**5 - 10763 * sg**4 +
         20280 * sg**3 - 21317 * sg**2 + 12026 * sg - 2890.5;
}

function calculate() {
  const V1 = parseFloat(document.getElementById("v1").value);
  const SG1 = parseFloat(document.getElementById("sg1").value);
  const SGT = parseFloat(document.getElementById("sgt").value);
  const VF = parseFloat(document.getElementById("vf").value);

  const P1 = sgToPct(SG1);
  const PT = sgToPct(SGT);
  const V2 = VF - V1;
  const P2 = ((PT * VF) - (P1 * V1)) / V2;

  let low = 1.0, high = 1.85, mid = 0;
  for (let i = 0; i < 100; i++) {
    mid = (low + high) / 2;
    const guess = sgToPct(mid);
    if (Math.abs(guess - P2) < 0.0001) break;
    if (guess < P2) low = mid; else high = mid;
  }

  document.getElementById("result").innerText =
    "Required SG of added acid: " + mid.toFixed(3);
}
