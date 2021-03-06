// After `importMeta` no longer experimental, we can use this ESM
//   approach over `__dirname`?
// import {fileURLToPath} from 'url';
// import {join, dirname} from 'path';
// join(dirname(fileURLToPath(import.meta.url)), 'babel-eslint')

export default {
  invalid: [
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo". Got "Foo".',
        },
      ],
    },
    {
      code: `
          /**
           * @arg Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @arg names to be "foo". Got "Foo".',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo". Got "Foo".',
        },
      ],
    },
    {
      code: `
          /**
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@param path declaration ("Foo.Bar") appears before any real parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees) {

          };
      `,
      errors: [
        {
          line: 4,
          message: '@param path declaration ("employees[].name") appears before any real parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].name - The employee's department.
           */
          function assign (employees) {

          };
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "employees[].name"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           */
          function assign (employees) {

          };
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param bar
           */
          function quux (bar, foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "bar, foo". Got "foo, bar".',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@param "bar" does not match an existing function parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
      class bar {
          /**
           * @param foo
           * @param foo
           */
          quux (foo) {

          }
      }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
      class bar {
          /**
           * @param foo
           */
          quux (foo) {

          }
      }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo, foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo, foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.foo
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param cfg
           * @param cfg.foo
           */
          function quux ({foo}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.foo
           */
          function quux ({foo}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      output: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.foo
           */
          function quux ({foo}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           */
          function quux ({foo, bar}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "cfg.bar"',
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo]
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo="with a default"]
           * @param baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "cfg.bar"',
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo="with a default"]
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
      options: [
        {
          enableFixer: true,
        },
      ],
      output: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param cfg
           * @param [cfg.foo="with a default"]
           * @param baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "cfg.bar"',
        },
      ],
    },
    {
      code: `
          /**
           * @param args
           */
          function quux ({a, b}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "args.a"',
        },
        {
          line: 3,
          message: 'Missing @param "args.b"',
        },
      ],
    },
    {
      code: `
          /**
           * @param args
           */
          function quux ({a, b} = {}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "args.a"',
        },
        {
          line: 3,
          message: 'Missing @param "args.b"',
        },
      ],
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param prop
           */
          constructor(private property: string) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "property". Got "prop".',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param prop
           * @param prop.foo
           */
          constructor(prop: { foo: string, bar: string }) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing @param "prop.bar"',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param prop
           * @param prop.foo
           * @param prop.bar
           */
          constructor(options: { foo: string, bar: string }) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Missing @param "options.foo"',
        },
        {
          line: 4,
          message: 'Missing @param "options.bar"',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor(options: { foo: string }) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: '@param "options.bar" does not exist on options',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@param`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {Error} error Exit code
           * @param {number} [code = 1] Exit code
           */
          function quux (error, cde = 1) {
          };
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "error, cde". Got "error, code".',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ([a, b] = []) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "foo.0"',
        },
        {
          line: 3,
          message: 'Missing @param "foo.1"',
        },
      ],
    },
    {
      code: `
      /**
       * @param options
       * @param options.foo
       */
      function quux ({foo, ...extra}) {
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @param "options.extra"',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      parserOptions: {
        ecmaVersion: 2018,
      },
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.bar
           * @param cfg.extra
           */
          function quux ({foo, ...extra}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@param "cfg.bar" does not exist on cfg',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      parserOptions: {
        ecmaVersion: 2018,
      },
    },
    {
      code: `
      /**
       * Converts an SVGRect into an object.
       * @param {SVGRect} bbox - a SVGRect
       */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
      errors: [
        {
          message: 'Missing @param "bbox.x"',
        },
        {
          message: 'Missing @param "bbox.y"',
        },
        {
          message: 'Missing @param "bbox.width"',
        },
        {
          message: 'Missing @param "bbox.height"',
        },
      ],
      options: [
        {
          checkTypesPattern: 'SVGRect',
        },
      ],
    },
    {
      code: `
      /**
       * Converts an SVGRect into an object.
       * @param {object} bbox - a SVGRect
       */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
      errors: [
        {
          message: 'Missing @param "bbox.x"',
        },
        {
          message: 'Missing @param "bbox.y"',
        },
        {
          message: 'Missing @param "bbox.width"',
        },
        {
          message: 'Missing @param "bbox.height"',
        },
      ],
    },
    {
      code: `
      module.exports = class GraphQL {
        /**
         * @param fetchOptions
         * @param cacheKey
         */
        fetch = ({ url, ...options }, cacheKey) => {
        }
      };
      `,
      errors: [
        {
          message: 'Missing @param "fetchOptions.url"',
        },
        {
          message: 'Missing @param "fetchOptions.options"',
        },
      ],
      options: [
        {
          checkRestProperty: true,
        },
      ],
      parser: require.resolve('babel-eslint'),
    },
  ],
  valid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param args
           */
          function quux (...args) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.a
           * @param foo.b
           */
          function quux ({a, b}) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param foo.baz
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {object[]} employees - The employees who are responsible for the project.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees) {

          };
      `,
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param property
           */
          constructor(private property: string) {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor(options: { foo: string, bar: string }) {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor({ foo, bar }: { foo: string, bar: string }) {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param options
           * @param options.foo
           * @param options.bar
           */
          constructor({ foo, bar }: { foo: string, bar: string }) {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param {Error} error Exit code
           * @param {number} [code = 1] Exit code
           */
          function quux (error, code = 1) {
          };
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          allowExtraTrailingParamDocs: true,
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param baz
           */
          function quux ({foo}, baz) {

          }
      `,
    },
    {
      code: `
      /**
       * @param options
       * @param options.foo
       */
      function quux ({foo, ...extra}) {
      }
      `,
      parserOptions: {
        ecmaVersion: 2018,
      },
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, ...extra) {

          }
      `,
    },
    {
      code: `
      /**
      * Converts an SVGRect into an object.
      * @param {SVGRect} bbox - a SVGRect
      */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
    },
    {
      code: `
      /**
      * Converts an SVGRect into an object.
      * @param {SVGRect} bbox - a SVGRect
      */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
    },
    {
      code: `
      /**
      * Converts an SVGRect into an object.
      * @param {object} bbox - a SVGRect
      */
      const bboxToObj = function ({x, y, width, height}) {
        return {x, y, width, height};
      };
      `,
      options: [
        {
          checkTypesPattern: 'SVGRect',
        },
      ],
    },
    {
      code: `
      class CSS {
        /**
         * Set one or more CSS properties for the set of matched elements.
         *
         * @param {Object} propertyObject - An object of property-value pairs to set.
         */
        setCssObject(propertyObject: {[key: string]: string | number}): void {
        }
      }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
};
