import { TPage, TImageList } from "~/Types";

const EXPERIENCE: TImageList = {
  rows: 2,
  separation: 2,
  leftPadding: 0.5,
  topPadding: 0.22,
  scale: [0.4, 0.45],
  images: [
    {
      url: "logos/leavingstone.svg",
      zoom: 0.6,
      websiteURL: "https://www.leavingstone.com/",
    },
    {
      url: "logos/bull.jpeg",
      zoom: 0.23,
      websiteURL: "https://live.sharedeals.de/room/Hauptchat",
    },

    {
      url: "logos/vabaco.png",
      zoom: 0.6,
      websiteURL: "https://vabaco.ge/language/en/home-page/",
    },
    {
      url: "logos/dolphin.png",
      zoom: 1,
      link: "http://loankeeper.ge/en/",
    },
  ],
};

const SKILL_LIST: TImageList = {
  rows: 4,
  separation: 2.5,
  leftPadding: 0,
  topPadding: 0,
  scale: 0.18,
  images: [
    { url: "icons/react-logo.png" },
    { url: "icons/css-logo.png" },
    { url: "icons/graphql-logo.png" },
    { url: "icons/html-logo.png" },
    { url: "icons/jest-logo.png" },
    { url: "icons/mobx-logo.svg" },
    { url: "icons/redux-logo.png" },
    { url: "icons/spacemacs-logo.svg" },
    { url: "icons/js-logo.png" },
    { url: "icons/threejs-logo.png" },
    { url: "icons/node-logo.svg" },
    { url: "icons/ts-logo.png" },
  ],
};

const page: TPage[] = [
  {
    page: 0,
    startScale: 0,
    title: "Who am I?",
    titlePos: [0, 12, 0],
    titleScale: 2,
    pageCords: {
      pos: [0, -0.2, 1.51],
      scale: 0.1,
    },
    meshProps: {
      pos: undefined,
    },
    infos: [
      {
        text: "* I'm an avid creator and inquisitive mind, always intrigued by unraveling the workings of the world around me.",
        pos: [0, 7, 0],
        scale: 1,
      },
      {
        text: "* My fascination with software development ignited during my childhood quest to understand the magic behind video game creation.",
        pos: [0, 3, 0],
        scale: 1,
      },
      {
        text: "* Embarking on my journey as a front-end developer eight years back in 2015, I've been privileged to contribute to numerous startups and companies, fostering the development of impactful products.",
        pos: [0, -2, 0],
        scale: 1,
      },
      {
        text: "* My skill set spans a broad spectrum, and I take pride in honing many of them to a masterful level.",
        pos: [0, -7, 0],
        scale: 1,
      },
    ],
  },
  {
    page: 1,
    startScale: 0,
    title: "EXPERIENCE",
    titlePos: [0.75, 0.62, 0.4],
    titleScale: 0.08,
    meshProps: {
      pos: [-1, 0, 0],
    },
    pageCords: {
      pos: [0.5, -0.09, 0.8],
      scale: 2,
    },
    imageList: EXPERIENCE,
    infos: [
      {
        text: "You have the option to explore further details by clicking on the icons.",
        pos: [0.75, -0.6, 0.4],
        scale: 0.045,
      },
    ],
  },
  {
    page: 2,
    startScale: 0,
    title: "SKILLS",
    titlePos: [0.85, 0.65, 0.36],
    titleScale: 0.08,
    meshProps: {
      pos: [-1.1, 0, 0],
    },
    pageCords: {
      pos: [0.5, -0.1, 0.8],
      scale: 2,
    },
    groupPos: [0.45, 0.45, 0],
    imageList: SKILL_LIST,
    infos: [
      {
        text: "And more...",
        pos: [0.85, -0.55, 0.4],
        scale: 0.045,
      },
    ],
  },
  {
    page: 3,
    startScale: 0,
    title: "Here's my résumé!",
    titlePos: [0.3, 0.99, 0.41],
    titleScale: 0.08,
    meshProps: {
      pos: [-0.8, 0, 0],
    },
    pageCords: {
      pos: [1, -1, 0.7],
      scale: 2,
    },
    groupPos: [0.33, 0.45, 0.01],
    imageList: {
      // scale: 25,
      rows: 4,
      separation: 2.5,
      leftPadding: 0,
      topPadding: 0,
      scale: 1,
      images: [
        {
          url: "icons/resume.svg",
          pos: [1, 1, 1],
          target: "Rezo.pdf",
        },
      ],
    },
    infos: [
      {
        text: "Click on the icon above to see!",
        pos: [0.33, -0.1, 0.45],
        scale: 0.045,
      },
    ],
  },
  {
    page: 4,
    rotateY: Math.PI / 2,
    startScale: 1,
    title: "You can find me in:",
    titlePos: [0, 0.55, 1.8],
    titleScale: 0.1,
    meshProps: {
      pos: [0, 0, -1],
    },
    pageCords: {
      pos: [0, 0, 0],
      scale: 2,
    },
    groupPos: [0, 0.2, 1.4],
    imageList: {
      // scale: 25,
      rows: 2,
      separation: 0.1,
      leftPadding: 0,
      topPadding: 0,
      scale: 0.4,
      images: [
        {
          url: "icons/github-logo.png",
          scale: [0.5, 0.4],
          target: "https://github.com/beraiarezo",
        },
        {
          url: "icons/linkedin-logo.svg",
          target: "https://www.linkedin.com/in/rezo-beraia-99085091",
        },
      ],
    },
    infos: [
      {
        text: "Click on the icon above to see!",
        pos: [0, 0, 0],
        scale: 0.045,
      },
    ],
  },
];

export const config = {
  title: "Rezo Beraia",
  pages: page,
};
