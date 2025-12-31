export enum AppState {
  LOGIN = 'LOGIN',
  CAPTCHA = 'CAPTCHA',
  DESTRUCTION = 'DESTRUCTION'
}

export interface CaptchaChallenge {
  id: number;
  prompt: string;
  gridSize: number;
  imageKeyword: string;
  distractorKeyword: string;
}

export const CAPTCHA_SEQUENCE: CaptchaChallenge[] = [
  { id: 1, prompt: "TRAFFIC LIGHTS", gridSize: 3, imageKeyword: "traffic,light", distractorKeyword: "tree,leaves" },
  { id: 2, prompt: "CROSSWALKS", gridSize: 3, imageKeyword: "crosswalk,crossing", distractorKeyword: "road,asphalt" },
  { id: 3, prompt: "FIRE HYDRANTS", gridSize: 4, imageKeyword: "fire,hydrant", distractorKeyword: "sidewalk,curb" },
  { id: 4, prompt: "STAIRS", gridSize: 4, imageKeyword: "stairs,steps", distractorKeyword: "window,building" },
  { id: 5, prompt: "BUSES", gridSize: 4, imageKeyword: "bus,transport", distractorKeyword: "truck,car" }
];