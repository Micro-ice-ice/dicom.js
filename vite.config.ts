import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        // генерация файла `index.d.ts`
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'myLib',
            formats: ['es', 'umd'],
            fileName: (format) => `my-lib.${format}.js`,
        },
    },
});
