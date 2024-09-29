import { ValidationErrors, FormArray, FormControl } from "@angular/forms";

export function hasAtLeastOneSkill(control: FormArray<FormControl<string>>): ValidationErrors | null {
  return control.value.length > 0 ? null : { hasAtLeastOneSkill: true };
}