export type ExtractParamsResult = {
  params: {
    [key: string]: string;
  };
  handler: string | null;
};

export type Route = {
  pattern: string;
  methods: {
    [key: string]: string;
  };
};
