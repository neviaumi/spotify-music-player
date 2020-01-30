import authorize from '../authorize';

it('Should redirect browsers', () => {
  const replaceSpy = jest
    .spyOn(window.location, 'replace')
    .mockReturnValue(undefined);
  authorize();
  expect(replaceSpy).toHaveBeenCalled();
});
