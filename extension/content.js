let last = null;

const base64FromUrl = async (url) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        throw new Error(`${error}`);
    }
};

const run = () => {
  const music = document.querySelector('.title.ytmusic-player-bar')?.innerText;

  if (!music || music === '') {
    return;
  }

  const byline = document.querySelector('.byline.ytmusic-player-bar')?.innerText;
  const [artist, album] = byline?.split('\n • \n').map(item => item.trim()) || [undefined, undefined];
  const art = document.querySelector('img.ytmusic-player-bar')?.src?.split('=')?.[0] + '=w600';

  if (last === music) {
    return;
  }

  last = music;

  console.log('%c youtube music tracker', 'color: green; font-weight: bold', { music, artist, album, art });

  base64FromUrl(art)
    .then(base64 => {
      const body = { music, artist, album, art, base64 };
      return fetch(`http://localhost:4444/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    })
    .catch(error => {
      console.log('%c youtube music tracker', 'color: red; font-weight: bold', 'offline');
    });
};

run();

setInterval(run, 3000);