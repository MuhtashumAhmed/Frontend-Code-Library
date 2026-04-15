// just add images url or video url .. must add type= image or video

export const imagesData = [
  {
    title: "location image",
    url: "/ourSiteImages/WhatsApp Image 2026-04-10 at 7.10.48 PM.jpeg",
    type: "image",
  },

  {
    title: "our video",
    url: "/ourSiteImages/WhatsApp Video 2026-04-10 at 7.10.37 PM (1).mp4",
    type: "video",
  },
];
export const imagesWithId = imagesData.map((item, index) => ({
  id: index + 1,
  ...item,
}));
