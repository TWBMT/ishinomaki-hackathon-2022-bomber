const nameBreak = () : void => {
    const name = document.getElementsByClassName('pc_kv')[0];
    name.addEventListener('click', function(this : any) {
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
          )
    })
}

export default nameBreak;