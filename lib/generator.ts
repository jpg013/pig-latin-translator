// https://pythonhosted.org/PigLatinTranslation/examples.html

type TranslationConfig = {
  isCapitalized: boolean;
  punctuationChars: string;
  word: string;
  postfix: null | 'yay' | 'ay'; 
}

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
 * Accepts a TranslationConfig and builds and returns the translated word, including provided capitalization and punctuation.
 */

export const buildTranslation = (config: TranslationConfig): string => {
  const {
    word,
    punctuationChars,
    postfix,
    isCapitalized
  } = config;
  
  const translation = `${word}${postfix}${punctuationChars}`;

  if (isCapitalized) {
    return `${translation.charAt(0).toUpperCase()}${translation.slice(1)}`;
  }

  return translation;
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
 * Accepts a TranslationConfig and strips all ending punctuation from the word, returning
 * a TranslationConfig object.
 */

export const stripPunctuation = (conf: TranslationConfig): TranslationConfig => {
  let { punctuationChars, word } = conf;

  while (punctuationSet.has(word.slice(-1))) {
    punctuationChars = `${word.slice(-1)}${punctuationChars}`;
    word = word.slice(0, -1);
  }

  return {
    ...conf,
    word,
    punctuationChars
  };
}

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

export const englishToPigLatin = (s: string): string => {
  // Split string on whitespace while keeping the whitespace groups.
  // https://bobbyhadz.com/blog/javascript-split-string-keep-whitespace
  const translatedWords = s
    .split(/(\s+)/)
    .map((s: string): string => {
      // If the current word is just an empty string then return string
      if (isEmptyString(s)) {
        return s;
      }
      
      // If the current word does not contain any alpha characters then return
      if (!isAlpha(s)) {
        return s;
      }

      const conf: TranslationConfig = stripPunctuation({
        isCapitalized: isCapitalized(s),
        punctuationChars: '',
        word: `${s.charAt(0).toLowerCase()}${s.slice(1)}`,
        postfix: null,
      });


      // 1) if the word starts with a vowel, then append "yay" to end of word.
      if (startsWithVowel(conf.word)) {
        return buildTranslation({
          ...conf,
          postfix: 'yay'
        });
      }

      // 2) The word must start with a consonant or consonant cluster, so regroup the word based on
      // the consonant cluster rules.
      const regroupedWord = regroupConsonantWord(conf.word);

      // Build translation from config
      return buildTranslation({
        ...conf,
        word: regroupedWord,
        postfix: 'ay'
      });
    });
  
  // join the list of translated words and return.
  return translatedWords.join('');
};