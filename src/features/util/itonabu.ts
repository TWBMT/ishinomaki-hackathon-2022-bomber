const nameBreak = (bombSoundUrl: string): void => {
  const name = document.getElementsByClassName("pc_kv")[0];
  console.log(name);
  if (name) {
    name.addEventListener("click", (event) => {
      const audioElem: HTMLAudioElement = new Audio();
      audioElem.src = bombSoundUrl;
      audioElem.play();
      console.log(event);
      (event.target! as HTMLElement).animate(
        [
          {
            opacity: 1,
            transform: "scale(0.8)",
            filter: `blur(0) url('#animation-filter')`,
          },
          {
            opacity: 0,
            transform: "scale(4)",
            filter: `blur(10px) url('#animation-filter')`,
          },
        ],
        {
          fill: "forwards",
          duration: 800,
        }
      );
    });
  }
};

export default nameBreak;
