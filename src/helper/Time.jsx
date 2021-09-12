const pad = (num) => (`0${num}`).slice(-2);

export const SecondsToHHMMSS = (secs) => {
  let minutes = Math.floor(secs / 60);
  secs %= 60;
  const hours = Math.floor(minutes / 60);
  minutes %= 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

export const SecondsToMMSS = (secs) => {
  let minutes = Math.floor(secs / 60);
  secs %= 60;
  minutes %= 60;
  return `${pad(minutes)}:${pad(secs)}`;
};

export const SecondsToMMSSMM = (timeInSeconds) => {
  const pad = function (num, size) {
    return (`00${num}`).slice(size * -1);
  };
  const time = parseFloat(timeInSeconds).toFixed(3);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);
  const milliseconds = time.slice(2, -1);
  return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 2)}`;
};
