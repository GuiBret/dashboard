import { RepeatModeIconPipe } from './repeat-mode-icon.pipe';

describe('RepeatModeIconPipe', () => {
  it('should create an instance', () => {
    const pipe = new RepeatModeIconPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "repeat" when providing an invalid value', () => {
    const pipe = new RepeatModeIconPipe();

    const value = pipe.transform('abcdef');

    expect(value).toEqual('repeat');
  });
  it('should return "repeat" when providing "off"', () => {
    const pipe = new RepeatModeIconPipe();

    const value = pipe.transform('off');

    expect(value).toEqual('repeat');
  });

  it('should return "repeat_one" when providing "track"', () => {
    const pipe = new RepeatModeIconPipe();

    const value = pipe.transform('track');

    expect(value).toEqual('repeat_one');
  });

  it('should return "repeat_on" when providing "context"', () => {
    const pipe = new RepeatModeIconPipe();

    const value = pipe.transform('context');

    expect(value).toEqual('repeat_on');
  });
});
