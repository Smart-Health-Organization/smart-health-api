import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class DateFormatConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(value);
  }

  defaultMessage() {
    return 'Invalid date format. The date should be in the format "DD/MM/YYYY".';
  }
}

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DateFormatConstraint,
    });
  };
}
