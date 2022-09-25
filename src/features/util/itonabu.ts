const nameBreak = (bombSoundUrl : string) : void => {
    const name = document.getElementsByClassName('pc_kv')[0];
    name.addEventListener('click', function(this : any) {
        const audioElem : HTMLAudioElement = new Audio();
        audioElem.src = bombSoundUrl;
        console.log(audioElem);
        audioElem.play();
        this.animate(
            [
              {
                opacity: 1,
                transform: 'scale(0.8)',
                filter: `blur(0) url('#animation-filter')`,
              },
              {
                opacity: 0,
                transform: 'scale(4)',
                filter: `blur(10px) url('#animation-filter')`,
              },
            ],
            {
              fill: 'forwards',
              duration: 1000,
            }
        );
        audioElem.pause();
    })
}

export default nameBreak;