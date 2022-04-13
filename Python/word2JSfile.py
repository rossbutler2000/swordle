import random

## List of most common 6 letter words
file = open("WORDS.txt")
words = file.read().split('\n')
file.close()

## List of all 6 letter words
file = open("ALLWORDS.txt")
allWords = file.read().split('\n')
file.close()

jsText = 'export const WORDS = ['
sixLetter = []

def createJSText(listName, list):
    jsText = 'export const ' + listName + ' = ['
    sixLetter = []

    for word in list:
        if(len(word) == 6):
            sixLetter.append(word)
            jsText += '"' + word + '", '

    jsText = jsText[0:-2] + '];'

    return jsText
## Most Common 6 letter Words
jsFile = open("WORDS.js", 'w')
jsFile.write(createJSText("WORDS", words))
jsFile.close()

## All 6 letter words
jsFile = open("ALL_WORDS.js", 'w')
jsFile.write(createJSText("ALL_WORDS", allWords))
jsFile.close()

## Randomized most common 6 letter words
random.shuffle(words)
jsFile = open("randomizedList.js", 'w')
jsFile.write(createJSText("randomWords", words))
jsFile.close()