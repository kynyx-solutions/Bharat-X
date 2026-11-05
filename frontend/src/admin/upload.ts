import { MEDIA_BUCKET, sb } from "./db";

/**
 * Shrinks a photo before upload: longest side at most maxSize px, saved as WebP (JPEG where the browser can't make
 * WebP). GIFs and files the browser can't read are uploaded as they are.
 */
async function compressImage(file: File, maxSize: number): Promise<File> {
  if (!/^image\/(jpeg|png|webp|avif|bmp)$/.test(file.type)) return file;
  let bmp: ImageBitmap;
  try {
    bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file;
  }
  const scale = Math.min(1, maxSize / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext("2d")!;
  const encode = (type: string) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.82));
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  let blob = await encode("image/webp");
  if (!blob || blob.type !== "image/webp") {
    // JPEG has no transparency: put cut-outs on white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    blob = await encode("image/jpeg");
  }
  bmp.close();
  if (!blob || (scale === 1 && blob.size >= file.size)) return file;
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + "." + ext, { type: blob.type });
}

const safeName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-60);

/** Compresses and uploads an image to the public media bucket; returns its public URL. */
export async function uploadImage(folder: string, file: File, maxSize = 1920): Promise<string> {
  const small = await compressImage(file, maxSize);
  const path = `${folder}/${Date.now()}-${safeName(small.name)}`;
  const { error } = await sb().storage.from(MEDIA_BUCKET).upload(path, small, { contentType: small.type, upsert: false });
  if (error) throw error;
  return sb().storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
