const checkIIN = (IIN: string) => {
  const regex = /^(\d{12})$/;
  return regex.test(IIN);
};

export default checkIIN;
