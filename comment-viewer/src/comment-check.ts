import fs, { PathLike } from 'fs';
import readline from 'readline';
import {SupportedLang} from './supported-languages';

export {commentCheck}

async function commentCheck(codeFile: string, fileLang: SupportedLang) {
    var finalCommentString : string = "";

    const fileStream = fs.createReadStream(codeFile);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(codeFile)
    });

    lineReader.on('line', function (line: any) {
        console.log('Line from file: ', line);
    });

    var foundComment : boolean = false;
    var isMultiLine : boolean = false;

    for await (const line of rl) {
        console.log('Line from file: ${line}');

        // First, check if foundComment is true
        if (foundComment) {
            // Then we need to check if it is a multi-line comment
            if (!isMultiLine) {
                // Now we check if the next line has code on it
                if (line !== "\r\n") {
                    finalCommentString += line;
                }

                finalCommentString += "\n"; // Added for spacing
                foundComment = false;
            } else {
                finalCommentString += line;

                if (line.includes(fileLang.endMultLineComment)) {
                    // This is the end of the multi-line comment
                    isMultiLine = false;
                }
            }
        } else {
            // We see if this next line holds a single line of code or multiple lines of code
            if (line.includes(fileLang.singleLineComment)) {
                foundComment = true;
                finalCommentString += line;
            } else if (line.includes(fileLang.startMultLineComment)) {
                finalCommentString += line;
                foundComment = true;

                // Check if someone used this format in a single line or multi-line
                if (!line.includes(fileLang.endMultLineComment)) {
                    isMultiLine = true;
                }
            }
        }
    }

    return finalCommentString;
}