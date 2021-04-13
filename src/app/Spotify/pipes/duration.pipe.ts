import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})

/**
 * Turns a number (in milliseconds) into a string in the format : mm:ss
 */
export class DurationPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    let nbOfMinutes = Math.floor(value / 60).toString();
    let nbOfSeconds: any = Math.floor(value % 60);

    // TODO: do it properly, ugly AF
    if(nbOfSeconds <= 9 ) {
      nbOfSeconds = "0" + nbOfSeconds.toString();
    } else {
      nbOfSeconds = nbOfSeconds.toString();
    }
    return nbOfMinutes + ":" + nbOfSeconds;
  }

}
