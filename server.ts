import { Hono } from "hono";
import { join } from "path";

const PNG_HEADERS = {
    "Content-Type": "image/png",
    "Cache-Control": "public, max-age=2592000",
};

const app = new Hono();

const imageCache = new Map<string, ArrayBuffer>();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.get("/image/:image", async (c) => {
    const imageName = c.req.param("image");
    const imagePath = join("images", imageName);

    if (imageCache.has(imageName)) {
        return c.body(imageCache.get(imageName)!, 200, PNG_HEADERS);
    }

    const imageFile = Bun.file(imagePath);

    if (await imageFile.exists()) {
        const imageBuffer = await imageFile.arrayBuffer();

        imageCache.set(imageName, imageBuffer);

        return c.body(imageBuffer, 200, PNG_HEADERS);
    } else {
        const response = await fetch(
            `https://img.suplaymart.com/img/${imageName}`
        );

        if (!response.ok) {
            return c.text("Image not found", 404);
        }

        const imageBuffer = await response.arrayBuffer();

        imageCache.set(imageName, imageBuffer);

        return c.body(imageBuffer, 200, PNG_HEADERS);
    }
});

Bun.serve({
    fetch: app.fetch,
    port: 4000
})