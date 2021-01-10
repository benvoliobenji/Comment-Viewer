type SupportedLang = {
    singleLineComment : string;
    startMultLineComment : string;
    endMultLineComment : string;
}

const SupportedLanguages = new Map<string, SupportedLang>();
SupportedLanguages.set("C", {
    singleLineComment: "//",
    startMultLineComment: "/*",
    endMultLineComment: "*/",
});
SupportedLanguages.set("C++", {
    singleLineComment: "//",
    startMultLineComment: "/*",
    endMultLineComment: "*/",
});

export { SupportedLanguages };
export type { SupportedLang };
