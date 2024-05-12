// import { createUploadthing } from "uploadthing/next";
// import { auth } from "@clerk/nextjs";

// const f = createUploadthing();

// const handleAuth = () => {
//     const { userId } = auth();
//     if (!userId) {
//         throw new Error("Unauthorized"); 
//     }
//     return { userId };
// };

// export const ourFileRouter = {
//   profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   courseAttachment: f(["text", "image", "video", "audio", "pdf"])
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
// };

import { createUploadthing } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .onUploadComplete(() => {}),
};
