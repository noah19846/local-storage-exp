declare function lsc(key: string, value?: unknown, lifetime?: string | number): unknown;
declare namespace lsc {
    var get: (key: string) => unknown;
    var set: (key: string, value: unknown, lifetime?: string | number) => void;
    var clear: any;
    var remove: any;
}
export default lsc;
