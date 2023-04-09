export class FieldRequiredError extends Error {
  constructor(name: string) {
    super(`Field ${name} is required`);
  }
}
