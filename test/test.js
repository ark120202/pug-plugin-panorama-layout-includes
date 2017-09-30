const test = require('ava');
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const plugin = require('..');

const fixtures = path.join(__dirname, 'fixtures');

async function compare(t, name) {
  const source = fs.readFileSync(path.join(fixtures, `${name}.pug`), 'utf8');
  const expected = fs.readFileSync(path.join(fixtures, `${name}.xml`), 'utf8').trim();
  const result = pug.render(source, { plugins: [plugin] });

  t.is(result, expected);
}

test('should apply transform in common case', compare, 'common');
test('should apply transform to multiple includes', compare, 'multiple');
