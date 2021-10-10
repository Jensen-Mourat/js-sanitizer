import {BAN_LIST, KEYWORDS, KeywordType} from './ban-list';

interface SanitizerOptions {
    allow?: string[];
    sanitizeWindowProperties?: boolean;
    preventKeyWord?: KeywordType[];
    preventString?: string[];
    expandBanList?: string[];
    failSilently?: boolean;
}

const banSet = new Set(BAN_LIST);
const keywordSet = new Set<string>(KEYWORDS);
export const sanitize = (fn: string, options?: SanitizerOptions) => {
    const throwError = (err: string) => {
        if (options.failSilently) {
            console.warn(err);
        } else {
            throw new Error(err);
        }
    };
    const preventString = (s: string[], err) => {
        for (let i = 0; i < s.length; i++) {
            if (fn.includes(s[i])) {
                throwError(err + s[i]);
            }
        }
    };
    const expandBanList = (expand: string[], throwOnKeywordError?: boolean) => {
        for (let i = 0; i < expand.length; i++) {
            if (!keywordSet.has(expand[i])) {
                banSet.add(expand[i]);
            } else {
                if (throwOnKeywordError) throwError('cannot ban a javascript keyword');
            }
        }
    };
    if (options?.expandBanList) {
        expandBanList(options?.expandBanList, true);
    }
    if (options?.preventKeyWord) {
        preventString(options.preventKeyWord, 'A forbidden keyword present: ');
    }
    if (options?.preventString) {
        preventString(options.preventString, 'A forbidden keyword present: ');
    }
    if (options?.sanitizeWindowProperties) {
        if (window) {
            const keys = Object.keys(window);
            expandBanList(keys);
        } else {
            throwError('window is undefined');
        }
    }
    if (options?.allow) {
        const allow = options.allow;
        for (let i = 0; i < allow.length; i++) {
            banSet.delete(allow[i]);
        }
    }
    const banList = Array.from(banSet);
    const _fn = `return function(${banList.join(',')}){return ${fn}}`;
    return new Function('', _fn).apply({}, banList)();
};
