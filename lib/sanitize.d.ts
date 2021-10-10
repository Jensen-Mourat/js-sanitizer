import { KeywordType } from './ban-list';
interface SanitizerOptions {
    allow?: string[];
    sanitizeWindowProperties?: boolean;
    preventKeyWord?: KeywordType[];
    preventString?: string[];
    expandBanList?: string[];
    failSilently?: boolean;
}
export declare const sanitize: (fn: string, options?: SanitizerOptions) => any;
export {};
