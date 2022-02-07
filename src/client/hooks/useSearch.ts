import Fuse from "fuse.js";

interface IOptions {
  keys: string[];
}

const useSearch = (list: any[], text: string, options: IOptions) => {
  const fuse = new Fuse(list, options);

  console.log(text)
  if (text) {
    return fuse.search(text).map(({ item }) => item);
  }

  return list;
};

export { useSearch };
