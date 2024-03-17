import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3333/graphql',
  documents: 'src/app/graphql/queries/**/*.graphql',
  generates: {
    'src/app/graphql/generated/schema.ts': {
      config: {
        addExplicitOverride: true,
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
    },
  },
};

export default config;
