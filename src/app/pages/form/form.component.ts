import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { hasAtLeastOneSkill } from 'src/utils/hasAtLeastOneSkill';
import { uniqueFullNamesValidator } from 'src/utils/uniqueFullNamesValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  taskForm: FormGroup<{
    name: FormControl<string>;
    datePicker: FormControl<string>;
    peoples: FormArray<FormGroup<{
      name: FormControl<string>;
      age: FormControl<number>;
      skills: FormArray<FormControl<string>>;
    }>>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    datePicker: ['', [Validators.required]],
    peoples: this.fb.array([this.createPeopleFormGroup()], [uniqueFullNamesValidator()])
  });

  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit() { }

  // Create a form group for a person
  createPeopleFormGroup(): FormGroup<{
    name: FormControl<string>;
    age: FormControl<number>;
    skills: FormArray<FormControl<string>>;
  }> {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: [18, [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)], [hasAtLeastOneSkill as any]) // Array of form controls
    });
  }

  // Getter for peoples array
  get peoples(): FormArray {
    return this.taskForm.get('peoples') as FormArray;
  }

  // Getter for skills array within a person's form group
  getSkills(index: number): FormArray {
    return this.peoples.at(index).get('skills') as FormArray;
  }

  // Add a skill to the skills FormArray
  addSkill(i: number) {
    this.getSkills(i).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    // Get the FormArray of skills for the specific person
    const skillsArray = this.getSkills(personIndex);

    // Remove the skill at the specified index
    skillsArray.removeAt(skillIndex);
  }

  addPerson() {
    const peoplesArray = this.peoples; // Get the FormArray of peoples
    peoplesArray.push(this.createPeopleFormGroup()); // Push a new FormGroup for the person
  }

  // Remove a person from the peoples FormArray
  removePerson(personIndex: number) {
    const peoplesArray = this.peoples;
    peoplesArray.removeAt(personIndex);
  }

  // Helper method to recursively mark controls as touched and update their validity
  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control); // Recursively mark nested controls
      }
    });
  }

  submitForm(): void {
    if (this.taskForm.valid) {
      console.log('submit', this.taskForm.value);
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }
}
