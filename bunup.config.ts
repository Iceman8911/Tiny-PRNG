import { defineConfig } from 'bunup'

export default defineConfig([
  {name:"regular",
	entry: ['src/*.ts'],
    format: ['esm', 'cjs'],
    exports: true
  },
  {name:"minified",
	entry: ['src/*.ts'],
    format: "esm",
    minify: true,
    outDir: "dist/min"
  }
])
