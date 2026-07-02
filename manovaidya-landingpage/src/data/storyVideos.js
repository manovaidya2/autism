const storyVideoIds = [
  "oWMqqacIIpQ",
  "rBOGwlYSfUY",
  "IxrOVghEjuo",
  "gYgPy11WNV8",
  "ZRsjg5Onbqo",
  "OQg0gMNgIdo",
  "b0OzBNn9F_s",
  "lqhpefWYP2E",
  "DP-crCP4rLo",
  "oRaZRWeA-Sk",
  "oRaZRWeA-Sk",
  "FJuj_jAmgqI",
  "tSJp1Ca9Gdg",
  "myQ5ThUSY8A",
  "bj63Qv-NM8o",
  "80fFVYSS_gA",
];

export const storyVideos = storyVideoIds.map((id, index) => ({
  id: `${id}-${index + 1}`,
  title: `Success Story ${index + 1}`,
  src: `https://www.youtube.com/embed/${id}?cc_load_policy=0&iv_load_policy=3&modestbranding=1&rel=0&playsinline=1`,
}));
