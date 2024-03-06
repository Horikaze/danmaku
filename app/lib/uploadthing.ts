import { generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
