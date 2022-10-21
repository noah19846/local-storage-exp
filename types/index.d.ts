declare type WrappedLocalStorage = Storage & {
    get(key: string): unknown;
    set(key: string, value: unknown, lifetime?: string | number): void;
    (key: string, value?: unknown, lifetime?: string | number): unknown;
};
declare const lse: WrappedLocalStorage;
export default lse;
