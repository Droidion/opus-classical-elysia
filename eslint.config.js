import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tsEslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      // mounted svelte components run in the browser
      globals: {
        ...globals.browser
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      // setup the svelte parser and give it the ts parser config
      parser: svelteParser,
      parserOptions: {
        parser: tsEslint.parser,
        // needed so ts parser won't skip svelte files
        extraFileExtensions: ['.svelte'],
        // svelte files need both `tsconfig`s
        project: ['tsconfig.json', '.svelte-kit/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    ignores: [
      '.svelte-kit',
      '.vercel',
      '.github',
      '.storybook',
      '.vscode',
      'build',
      'static',
      'package',
      'coverage',
      'node_modules'
    ]
  },
  eslintConfigPrettier
];
