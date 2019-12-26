import Regex from './regex-dp';


const rg = new Regex();

test('Regex test 1', () => {
    const s = "aa"; // false
    const p = "a";
    const result = false;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});

test('Regex test 2', () => {
    const s = "aab"; // true
    const p = "c*a*b";
    const result = true;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});

test('Regex test 3', () => {
    const s = "mississippi"; // false
    const p = "mis*is*p*.";
    const result = false;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});

test('Regex test 4', () => {
    const s = "ab" // false
    const p = ".*c";
    const result = false;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});

test('Regex test 5', () => {
    const s = "aaa"; //true
    const p = "a*a";
    const result = true;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});

test('Regex test 6', () => {
    const s = "mississippi"; // true
    const p = "mis*is*ip*.";
    const result = true;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});

test('Regex test 7', () => {
    const s = "aaa"; // true
    const p = "ab*a*c*a";
    const result = true;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});

test('Regex test 8', () => {
    const s = "ab"; // true
    const p = ".*";
    const result = true;
    const r = rg.isMatch(s, p);
    expect(r).toEqual(result);
});