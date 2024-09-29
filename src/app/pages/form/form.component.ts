import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataAdapter } from 'src/app/models/data-adapter.model';
import { addTask } from 'src/app/store/actions/task.actions';
import { hasAtLeastOneSkill } from 'src/app/utils/hasAtLeastOneSkill';
import { uniqueFullNamesValidator } from 'src/app/utils/uniqueFullNamesValidator';
import * as uuid from 'uuid';

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

  constructor(private fb: NonNullableFormBuilder, private store: Store, private message: NzMessageService) { }

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
      const values = this.taskForm.value as DataAdapter;
      const uniqueId = uuid.v4();
      const task: DataAdapter = {
        ...values,
        userId: uniqueId,
        id: uniqueId,
        title: values.name || '',
        completed: false
      }
      this.store.dispatch(addTask({task}));
      this.taskForm.reset();
      this.message.success('Tarea creada correctamente');
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }
}
