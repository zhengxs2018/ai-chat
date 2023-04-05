export const OPENAI_COMPLETE_ENGINES = [
  'text-davinci-003',
  'text-curie-001',
  'text-babbage-001',
  'text-ada-001',
  'text-davinci-002',
  'text-davinci-001',
  'davinci-instruct-beta',
  'davinci',
  'curie-instruct-beta',
  'curie',
  'babbage',
  'ada',
] as const;

export const OPENAI_MODEL_ENGINES_MAP = {
  complete: OPENAI_COMPLETE_ENGINES,
} as const;
