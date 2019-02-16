module qs {
    export class Utils {
        /**
         * 是否为文字
         */
        public static isLetter(str: string): boolean {
            if (new RegExp("[A-Za-z]").test(str)) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 是否是数字
         */
        public static isDigit(str: string): boolean {
            if (new RegExp("[0-9]").test(str)) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 是否为空字符串
         */
        public static isNullOrEmpty(str: string): boolean {
            return str == null || str == "";
        }
        /**
         * 文字或数字
         */
        public static isLetterOrDigit(str: string): boolean {
            if (new RegExp("[A-Za-z0-9]").test(str)) {
                return true;
            } else {
                return false;
            }
        }
        /**
         * 是否是十六进制数字
         */
        public static isHexDigit(c: string): boolean {
            if (Utils.isDigit(c)) {
                return true;
            }
            if ('a' <= c && c <= 'f') {
                return true;
            }
            if ('A' <= c && c <= 'F') {
                return true;
            }
            return false;
        }
    }
}