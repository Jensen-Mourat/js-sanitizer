import { KeywordType } from './ban-list';
interface SanitizerOptions {
    sanitizeWindowProperties: boolean;
    preventKeyWord: KeywordType[];
    preventString: string[];
    expandBanList: string[];
    failSilently: boolean;
}
export declare const sanitizer: (fn: string, options?: SanitizerOptions) => any;
export {};
