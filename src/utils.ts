/**
 * Determine if a person is an adult based on their age.
 * @param age - The age of the person.
 * @returns True if the person is an adult, false otherwise.
 */
export function isAdult(age: number): boolean {
  if (age < 0) throw new Error('age cannot be less than 0');
  return age >= 18;
};



/**
 * Represents a person.
 * 
 * `name` - The name of the person. It must less than 100 characters.
 * `email` - The email of the person. It must be a valid email.
 * `age` - The age of the person. It must be greater than or equal to 0.
 */
export interface Person {
  name: string;
  email: string;
  age: number;
}

/**
 * Determines if a person is registerable.
 * 
 * A guardian is required if the person is under 18.
 * In that case, the guardian must be an adult (age >= 18).
 * 
 * @param person - The person to check for registerability.
 * @param guardian - An optional guardian for the person.
 * @returns True if the person is registerable, false otherwise.
 */
export function isRegisterable(person: Person, guardian?: Person): boolean {
  throw new Error('Not implemented');
}