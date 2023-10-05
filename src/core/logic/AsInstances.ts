type Class = abstract new (...args: unknown[]) => unknown

export type AsInstances<T extends Record<string, Class>> = {
  [K in keyof T]: InstanceType<T[K]>
}
