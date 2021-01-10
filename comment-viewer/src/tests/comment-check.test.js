import fs from 'fs';
import {commentCheck} from '../comment-check';
import {SupportedLanguages} from '../supported-languages';

describe('C/C++ Comment Check Suite', function() {
    test('C/C++ Single Line Test', function() {
        const comment = "// This is a single line comment in C";

        fs.writeFileSync('comment.txt', comment, (err) => {
            if (err) throw err;
        });
        expect(commentCheck('../comment.txt', SupportedLanguages.get('C'))).toBe(comment);
    })
    test('C/C++ String Multi-Line Test', function() {
        const multLineComment = "/* This is the beginning of a multi-line C comment \n"
        + "In here I will begin to describe the function itself \n"
        + "Ending with a new line at the end */";
        expect(commentCheck(multLineComment)).toBe(multLineComment);
    })
    test('C/C++ Comment Includes Following Code', function() {
        const funcComment = "// This is a descriptor for the next line of code \n"
        + "uint32_t newVar = 0xFFFFFFFF; \n";
        expect(commentCheck(funcComment)).toBe(funcComment);
    })
    test('C/C++ Comment Only Includes Following Code', function() {
        const funcExpandedComment = "// This is a descriptor for the next line of code \n"
        + "uint32_t newVar = 0xFFFFFFFF; \n"
        + "int secondVar = 0;";
        const funcComment = "// This is a descriptor for the next line of code \n"
        + "uint32_t newVar = 0xFFFFFFFF; \n";
        expect(commentCheck(funcExpandedComment)).toBe(funcComment);
    })
})