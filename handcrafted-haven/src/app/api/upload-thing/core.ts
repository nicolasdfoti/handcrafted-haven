import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/auth";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Not authenticated");
      return { userId: session.user.id };
    })
    .onUploadComplete(({ metadata, file }) => {

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
