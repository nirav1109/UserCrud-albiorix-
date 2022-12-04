import { FormGroup } from "@angular/forms";

export function ConfirmValidators(password:string, confirmPassword:string)
{
    return (formGroup:FormGroup)=>{
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[confirmPassword];
        if(matchingControl?.errors && !matchingControl?.errors['confirmValidator']){
            return;
        }
        if(control?.value !== matchingControl?.value){
            matchingControl?.setErrors({confirmValidator:true})
        }
        else{
            matchingControl.setErrors(null); 
        }
    }
}