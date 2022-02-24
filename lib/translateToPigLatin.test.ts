import { translateToPigLatin } from './translateToPigLatin';

const commonSayings = [
  [
    'How do you say ... in Pig Latin?',
    'Owhay oday ouyay aysay ... inyay Igpay Atinlay?'
  ],
  [
    'Where is the toilet?',
    'Erewhay isyay ethay oilettay?'
  ],
  [
    'Call the police!',
    'Allcay ethay olicepay!'
  ],
  [
    'How do you say ... in Pig Latin?! I don’t know!',
    'Owhay oday ouyay aysay ... inyay Igpay Atinlay?! Iyay on’tday owknay!'
  ],
  [
    'Rhythm',
    'Ythmrhay'
  ]
];

describe('@generatorenglishToPigLatin', () => {
  describe('englishToPigLatin', () => {
    test('it translate the word "dog"', () => { 
      expect(translateToPigLatin('dog')).toStrictEqual('ogday');
    });

    test('it translates the word "plants"', () => {
      expect(translateToPigLatin('plants')).toStrictEqual('antsplay');
    });

    test('it translates the word "am"', () => {
      expect(translateToPigLatin('am')).toStrictEqual('amyay');
    });

    test('it translates the word "Hello!"', () => {
      expect(translateToPigLatin('Hello!')).toStrictEqual('Ellohay!');
    });

    test('it translates the word "you"', () => {
      expect(translateToPigLatin('you')).toStrictEqual('ouyay');
    });

    test('it translates the word "Latin?"', () => {
      expect(translateToPigLatin('Latin?')).toStrictEqual('Atinlay?');
    });

    test('it translates common phrases', () => {
      commonSayings.forEach((x) => {
        const [phrase, expected] = x;
        expect(translateToPigLatin(phrase)).toStrictEqual(expected);
      });
    });
  });
});
