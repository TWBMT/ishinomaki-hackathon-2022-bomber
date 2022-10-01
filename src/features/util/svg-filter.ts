export const initSvgFilter = () => {
  const NS = "http://www.w3.org/2000/svg";
  const el = document.createElementNS(NS, "svg");
  el.innerHTML = `
      <filter id='animation-filter' x='0%' y='0%' width='110%' height='110%'>
        <feTurbulence type="turbulence" baseFrequency="0.2 0.2" result="NOISE" numOctaves="2" />
        <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="16" xChannelSelector="R" yChannelSelector="R" />
      </filter>`;
  document.body.appendChild(el);

  const NS2 = "http://www.w3.org/2000/svg";
  const el2 = document.createElementNS(NS2, "svg");
  el.innerHTML = `
    <filter id='animation-filter2' x='0%' y='0%' width='110%' height='110%'>
      <feTurbulence type="turbulence" baseFrequency="0.2 0.2" result="NOISE" numOctaves="2" />
      <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="16" xChannelSelector="R" yChannelSelector="R" />
    </filter>`;
  document.body.appendChild(el2);
};
