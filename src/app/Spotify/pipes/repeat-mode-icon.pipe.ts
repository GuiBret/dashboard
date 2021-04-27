import { Pipe, PipeTransform } from '@angular/core';



enum RepeatState {
  NO_REPEAT = 'off',
  REPEAT_ONE = 'track',
  REPEAT_ALL = 'context'
};

@Pipe({
  name: 'repeatModeIcon'
})
export class RepeatModeIconPipe implements PipeTransform {

  transform(value: string): string {
    let finalValue = 'repeat';
    switch(value) {
      case RepeatState.NO_REPEAT:
        finalValue = 'repeat';
        break;
      case RepeatState.REPEAT_ONE:
        finalValue = 'repeat_one';
      break;
      case RepeatState.REPEAT_ALL:
        finalValue = 'repeat_on';
      break;
    }

    return finalValue;
  }

}
