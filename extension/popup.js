document.addEventListener('DOMContentLoaded', function () {

  const input = document.getElementById('username');

  const button = document.getElementById('save');

  const url = (value) => {
    const id = document.getElementById('url');
    id.href = 'https://youtube-music-tracker.onrender.com/' + value;
    id.style.display = 'block';
  }

  chrome.storage.sync.get(['ytUsername'], (result) => {
    if (result.ytUsername) {
      input.value = result.ytUsername;
      url(result.ytUsername);
    }
  });

  button.addEventListener('click', function () {
    const value = input.value.trim();
    if (value) {
      chrome.storage.sync.set({ ytUsername: value }, () => {
        url(value);
      });
    }
  });
});
