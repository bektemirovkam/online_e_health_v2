export type SliderItemType = {
  largeText?: string;
  text?: string;
  btnText?: string;
  showBtn?: boolean;
  image: string;
  navigateTo: string;
};

export type SliderResponseType = {
  status: string;
  messages: string;
  data: SliderItemType[];
};

export type FeedBackResponseType = {
  status: string;
  messages: string;
  data: boolean;
};
