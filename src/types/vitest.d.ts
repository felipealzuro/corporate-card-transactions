// src/types/vitest.d.ts
import { vi } from 'vitest'

declare global {
  var vi: typeof vi
  namespace Vi {
    type Mocked<T> = {
      [P in keyof T]: T[P] extends (...args: any[]) => any
        ? ReturnType<T[P]> extends Promise<any>
          ? jest.MockedFunction<T[P]>
          : jest.MockedFunction<T[P]>
        : T[P]
    }
  }
}
