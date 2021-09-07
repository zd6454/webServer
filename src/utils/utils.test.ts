import { isUrl } from './utils';

describe('isUrl tests', () => {
  it('should return false for invalid and corner case inputs', () => {
    expect(isUrl([] as any)).toBeFalsy();
    expect(isUrl({} as any)).toBeFalsy();
    expect(isUrl(false as any)).toBeFalsy();
    expect(isUrl(true as any)).toBeFalsy();
    expect(isUrl(NaN as any)).toBeFalsy();
    expect(isUrl(null as any)).toBeFalsy();
    expect(isUrl(undefined as any)).toBeFalsy();
    expect(isUrl('')).toBeFalsy();
  });

  it('should return false for invalid URLs', () => {
    expect(isUrl('foo')).toBeFalsy();
    expect(isUrl('bar')).toBeFalsy();
    expect(isUrl('bar/test')).toBeFalsy();
    expect(isUrl('https:/example.com/')).toBeFalsy();
    expect(isUrl('ttp://example.com/')).toBeFalsy();
  });

  it('should return true for valid URLs', () => {
    expect(isUrl('https://example.com/')).toBeTruthy();
    expect(isUrl('httpss://example.com/')).toBeTruthy();
    expect(isUrl('https://example.com/test/123')).toBeTruthy();
    expect(isUrl('httpss://example.com/test/123')).toBeTruthy();
    expect(isUrl('https://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('httpss://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://www.example.com/')).toBeTruthy();
    expect(isUrl('httpss://www.example.com/')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('httpss://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('httpss://www.example.com/test/123?foo=bar')).toBeTruthy();
  });
});
