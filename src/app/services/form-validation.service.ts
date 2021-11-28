import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomCurrencyPipe } from '../pipes/custom-currency.pipe';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor(private customCurrencyPipe: CustomCurrencyPipe) { }

  /**
   * get all values of the formGroup, loop over them
   * then mark each field as touched
   */
   public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control:any) => {
      control.markAsTouched();

      if (control['controls']) {
        control['controls'].forEach((c:any) => this.markFormGroupTouched(c));
      }
    });
  }

  public markFormGroupUntouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control:any) => {
      control.markAsUntouched();

      if (control['controls']) {
        control['controls'].forEach((c:any) => this.markFormGroupUntouched(c));
      }
    });
  }

  /**
   * common message in case of error
   */
  public validationMessages() {
    const messages = {
      required: '* This field is required',
      email: '* This email address is invalid',
      minlength: '* Length is too short',
      maxlength: '* Length is too long',
      invalid_characters: (matches: any[]) => {

        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;

          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }

          return string;
        }, '');

        return `These characters are not allowed: ${matchedCharacters}`;
      },
    };

    return messages;
  }

  /**
   * Validate form instance
   * check_dirty true will only emit errors if the field is touched
   * check_dirty false will check all fields independent of
   * being touched or not. Use this as the last check before submitting
   */
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;
    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        const messages:any = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              console.log("======>inside", key);
              if (key && key !== 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }

  formatCurrency(value, formGroup: FormGroup,fld) {
    if (value == '0') {
      if (formGroup.contains(''+fld)) formGroup.get(''+fld).reset();
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'decimal');
      if (updatedCurrency == ' 0.00') {
        if (formGroup.contains(''+fld)) formGroup.get(''+fld).reset();
      } else {
        if(updatedCurrency.trim() == '0'){
          formGroup.get(''+fld).reset()
        }else{
          console.log(updatedCurrency);
          formGroup.patchValue({ [fld]: "₹" + updatedCurrency });
          //formGroup.patchValue({ amount: updatedCurrency });

        }
      }
      // this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      // this.amountInWords ="";
      formGroup.get(''+fld).reset('')
    }
  }

}
