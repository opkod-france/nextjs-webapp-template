import { FormikValues } from 'formik';

import { removeEmptyKeysRecursively, convertToFormData } from '../utils';
describe('removeEmptyKeysRecursively', () => {
  it('should remove empty string keys', () => {
    const input = { key1: '', key2: 'value2' };
    const expectedOutput = { key2: 'value2' };

    expect(removeEmptyKeysRecursively(input)).toEqual(expectedOutput);
  });

  it('should remove empty object keys', () => {
    const input = { key1: {}, key2: { subKey: 'value' } };
    const expectedOutput = { key2: { subKey: 'value' } };

    expect(removeEmptyKeysRecursively(input)).toEqual(expectedOutput);
  });

  it('should remove nested empty keys', () => {
    const input = { key1: { key2: { key3: {} } }, key4: 'value' };
    const expectedOutput = { key4: 'value' };

    expect(removeEmptyKeysRecursively(input)).toEqual(expectedOutput);
  });

  it('should not remove non-empty values', () => {
    const input = {
      key1: 'value1',
      key2: 0,
      key3: false,
      key4: { key5: 'value2' },
    };
    const expectedOutput = {
      key1: 'value1',
      key2: 0,
      key3: false,
      key4: { key5: 'value2' },
    };

    expect(removeEmptyKeysRecursively(input)).toEqual(expectedOutput);
  });

  it('should handle an empty object', () => {
    const input = {};
    const expectedOutput = {};

    expect(removeEmptyKeysRecursively(input)).toEqual(expectedOutput);
  });

  it('should handle an object with only empty keys', () => {
    const obj = { a: { b: { c: {} } }, d: {}, e: '' };
    const result = removeEmptyKeysRecursively(obj);
    expect(result).toEqual({});
  });
});

describe('convertToFormData', () => {
  test('should handle simple values', () => {
    const values: FormikValues = {
      key1: 'value1',
      key2: 42,
      key3: true,
    };
    const uploadFileFields: string[] = [];

    const formData = convertToFormData(values, uploadFileFields);

    expect(formData.get('data')).toEqual(
      JSON.stringify({
        key1: 'value1',
        key2: 42,
        key3: true,
      })
    );
  });

  test('should handle single File field', () => {
    const file = new File(['content'], 'file1.txt', {
      type: 'text/plain',
    });

    const values: FormikValues = {
      key1: 'value1',
      fileField: file,
    };
    const uploadFileFields: string[] = ['fileField'];

    const formData = convertToFormData(values, uploadFileFields);

    expect(formData.get('data')).toEqual(JSON.stringify({ key1: 'value1' }));
    expect(formData.get('files.fileField')).toEqual(file);
  });

  test('should handle array of File fields', () => {
    const file1 = new File(['content1'], 'file1.txt', {
      type: 'text/plain',
    });
    const file2 = new File(['content2'], 'file2.txt', {
      type: 'text/plain',
    });

    const values: FormikValues = {
      key1: 'value1',
      fileArrayField: [file1, file2],
    };
    const uploadFileFields: string[] = ['fileArrayField'];

    const formData = convertToFormData(values, uploadFileFields);

    expect(formData.get('data')).toEqual(JSON.stringify({ key1: 'value1' }));
    expect(formData.get('files.fileArrayField[0]')).toEqual(file1);
    expect(formData.get('files.fileArrayField[1]')).toEqual(file2);
  });

  test('should clean empty values from data', () => {
    const values: FormikValues = {
      key1: 'value1',
      key2: '',
      key3: null,
      key4: { key5: { key6: {} } },
    };
    const uploadFileFields: string[] = [];

    const formData = convertToFormData(values, uploadFileFields);

    expect(formData.get('data')).toEqual(JSON.stringify({ key1: 'value1' }));
  });
});
