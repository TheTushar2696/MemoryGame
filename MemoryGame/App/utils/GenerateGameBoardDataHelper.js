export const generateGameBoardData = lettersArray => {
  let i = lettersArray.length,
    j,
    temp;
  if (i === 0) return lettersArray;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = lettersArray[i];
    lettersArray[i] = lettersArray[j];
    lettersArray[j] = temp;
  }
  return lettersArray;
};
