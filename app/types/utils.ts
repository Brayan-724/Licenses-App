export type Awaitable<T> = T | Promise<T>;

/**
 * @description Returns type or array of same type
 */
export type ArrayOr<T> = T | T[];

/**
 * @description Returns type values from an array.
 */
export type ArrayValues<T> = T extends Array<infer U> ? U : never;

/**
 * @description Removes arrays from the given type.
 */
export type NoArray<T> = Exclude<T, ArrayValues<T>[]>

// -----------------------------------------------------------------------------

/**
 * @description Returns props of a component.
 */
export type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * @description Returns children of a component.
 */
export type ChildrenOf<T> = PropsOf<T> extends { children?: infer C }
  ? C
  : never;

/**
 * @description Returns props with children as component.
 */
export type PropsWithComponent<
  T extends React.ComponentType<any>,
  OP extends boolean = false
> = OP extends true
  ? { children?: ArrayOr<React.ReactElement<any, T>> }
  : { children: ArrayOr<React.ReactElement<any, T>> };

/**
 * @description Returns a function to validate if target is of same type as `component`.
 * @param component Base component
 */
export function IsComponent(
  component: React.ComponentType
): (target: React.ComponentType) => boolean;

/**
 * @description Returns if target is of same type as `component`.
 * @param component Base component
 * @param target Target component
 */
export function IsComponent(
  component: React.ComponentType,
  target: React.ComponentType
): boolean;

// Union all above functions
export function IsComponent(
  component: React.ComponentType,
  target?: React.ComponentType
): boolean | ((target: React.ComponentType) => boolean) {
  if (target) {
    return target.prototype instanceof component;
  } else {
    return (target: React.ComponentType) =>
      target.prototype instanceof component;
  }
}

// -----------------------------------------------------------------------------

/**
 * @description Make optional a property of a object
 */
export type MakeOptional<T, K extends keyof T> = T extends object
  ? Omit<T, K> & Partial<Pick<T, K>>
  : T;

/**
 * @description Make optional a property of a object recursively
 */
export type MakeOptionalDeep<T, K extends keyof T> = {
  [P in keyof T]: T[P] extends object
    ? K extends keyof T[P]
      ? MakeOptionalDeep<T[P], K>
      : T[P]
    : T[P];
};

// -----------------------------------------------------------------------------

/**
 * @decription Make required a property of a object
 */
export type MakeRequired<T, K extends keyof T> = T extends object
  ? Omit<T, K> & Required<Pick<T, K>>
  : T;

/**
 * @description Make required a property of a object recursively
 */
export type MakeRequiredDeep<T, K extends keyof T> = {
  [P in keyof T]: T[P] extends object
    ? K extends keyof T[P]
      ? MakeRequiredDeep<T[P], K>
      : T[P]
    : T[P];
};
