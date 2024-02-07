import { parseBearerToken } from '@/utils';

describe('retribeToken()のテスト', () => {
  test('autorization: bearer token...からトークンを取得できること', () => {
    const autorization =
      'bearer e077bd589a5af4dfa71f7a81eab5bc7727c7f0fccd4a50b7e17b8b1e49a3662a60a80972e5bff44aab48ccd63205db51247c9b00fff5341df773e5bbf0aad4f1';
    expect(parseBearerToken(autorization)).toBe(
      'e077bd589a5af4dfa71f7a81eab5bc7727c7f0fccd4a50b7e17b8b1e49a3662a60a80972e5bff44aab48ccd63205db51247c9b00fff5341df773e5bbf0aad4f1'
    );
  });
  test('autorization: bearer token...の形式が不正の場合はundefinedを返すこと', () => {
    const autorization1 =
      'bearereee e077bd589a5af4dfa71f7a81eab5bc7727c7f0fccd4a50b7e17b8b1e49a3662a60a80972e5bff44aab48ccd63205db51247c9b00fff5341df773e5bbf0aad4f1';
    expect(parseBearerToken(autorization1)).toBe(undefined);
    const autorization2 = undefined;
    expect(parseBearerToken(autorization2)).toBe(undefined);
    const authorization3 = '';
    expect(parseBearerToken(authorization3)).toBe(undefined);
  });
});
