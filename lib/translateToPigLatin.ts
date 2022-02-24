// https://pythonhosted.org/PigLatinTranslation/examples.html

// Set of standard vowels excluding 'y'
const standardVowels = new Set(['a', 'e', 'i', 'o', 'u']);

// Set of extended vowels including 'y'
const extendedVowels = new Set([...standardVowels, 'y']);

// Set of puncuation allowed at the end of word
const punctuationSet = new Set(['!', '.', '?', '\'', ';', ':']);

/**
 * Accepts a string and returns true if the string only contains white space, else false.
 */

const isEmptyString = (s: string): boolean => s.trim() === '';

/**
 * Accepts a string and returns true if the first char in the string is a standard vowel (not including 'y')
 */

const startsWithVowel = (s: string, vowels: Set<string> = standardVowels): boolean => vowels.has(s[0].toLowerCase());


/**
 * Accepts a single word input and transforms it into Pig Latin using defined the defined logic rules.
 * If the input does not contain and alpha characters, or it is empty (whitespace only) then the input will be returned.
 * All capitalization and punctuation should be preserved.
 */

export const transformPigLatin = (word: string): string => {
  // If the input word is just an empty string then return it as is
  if (isEmptyString(word)) {
    return word;
  }
  
  // If the input word does not contain any alpha characters (e.g. numbers or symbols only) then return as is
  if (!isAlpha(word)) {
    return word;
  }

  // defined translatedWord as the input word with first character to lower case
  let translatedWord = `${word.charAt(0).toLowerCase()}${word.slice(1)}`;
  let punctuation = '';

  // Strip all punctuation off the end of the transformed word
  while (punctuationSet.has(translatedWord.slice(-1))) {
    punctuation = `${translatedWord.slice(-1)}${punctuation}`;
    translatedWord = translatedWord.slice(0, -1);
  }

  // Logic Rules for transforming English -> Pig Latin
  // 1) If the word starts with a standard vowel (excluding 'y'), then append "yay" to end of word.
  // 2) If the word starts with a consonant or consonant cluster, regroup the consonants to the end of the word an append "ay"
  if (startsWithVowel(translatedWord)) {
    translatedWord = `${translatedWord}yay`;
  } else {
    translatedWord = `${regroupConsonantWord(translatedWord)}ay`;
  }

  // If the original word was capitalized then capitalize the first character of the translated word
  if (isCapitalized(word)) {
    translatedWord = `${translatedWord.charAt(0).toUpperCase()}${translatedWord.slice(1)}`;
  }

  // Return translated word with appended punctuation.
  return `${translatedWord}${punctuation}`
}

/**
 * Accepts a string and returns true if the string is capitalized, else false.
 */

export const isCapitalized = (s: string): boolean => s.charAt(0).toUpperCase() === s.charAt(0);

/**
 * Accepts a string and returns true if the string contains a single alpha character (a-z), else false.
 */

export const isAlpha = (s: string): boolean => s.match(/^[a-z]+/i) !== null;

/**
 * Takes a string that starts with a consonant (including y) and regroups the word
 * by clustering the n number of consonants until a vowel is reached, then moving
 * the cluster group to the end of the word. (e.g. "plants" would regoup to "antspl")
 */

export const regroupConsonantWord = (s: string): string => {
  const vowelIdx = s.split('').findIndex((ch: string, idx: number): boolean => {
    if (idx === 0 && ch.toLowerCase() === 'y') {
      return false;
    }
    return extendedVowels.has(ch.toLowerCase());
  });

  return `${s.slice(vowelIdx)}${s.slice(0, vowelIdx)}`;
};

/**
 * Accepts an input string and convers it into Pig Latin.
 */

export const translateToPigLatin = (s: string): string => {
  // Split string on whitespace while keeping the whitespace groups.
  // https://bobbyhadz.com/blog/javascript-split-string-keep-whitespace
  const translatedWords = s
    .split(/(\s+)/)
    .map(transformPigLatin);
  
  // join the list of translated words and return.
  return translatedWords.join('');
};