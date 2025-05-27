let last = null;

const update = () => {
    fetch('/select')
        .then(res => res.json())
        .then(data => {
            if (last === data.music) {
                return;
            }
            last = data.music;
            document.getElementById('background').src = data.base64;
            document.getElementById('art').src = data.base64;
        });
};

update();

setInterval(update, 3000);