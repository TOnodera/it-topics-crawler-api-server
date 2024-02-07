export const parseBearerToken = (autorization?: string) => {
  if (autorization == undefined) {
    console.error('tokenが不正です');
    return;
  }
  const [bearer, token] = autorization.split(' ');
  if (bearer != 'bearer') {
    console.error('tokenが不正です');
    return;
  }
  return token;
};
