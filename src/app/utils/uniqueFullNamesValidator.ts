import { AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

export function uniqueFullNamesValidator(): ValidatorFn {
  return (formArray: AbstractControl): { [key: string]: any } | null => {
    const peoples = (formArray as FormArray).controls;
    
    // Get names that are longer than 5 characters
    const names = peoples
      .map((person) => person.get('name')?.value)
      .filter(name => name?.length >= 5) // Only consider names with more than 5 characters
      .map(name => name?.toLowerCase());

    const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index);

    return hasDuplicates ? { duplicateFullNames: true } : null;
  };
}
