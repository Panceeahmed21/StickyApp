import { atom } from "recoil";

export const noteAtom = atom({
  key: "noteAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
