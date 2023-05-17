package com.tuke.lirkiseduvepnservice.utils;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * The ImageResizer class contains methods for resizing images using the Java ImageIO library.
 */
@Service
public class ImageResizer {

    /**
     * Resizes the provided image data to the specified width and height using the Java ImageIO library.
     *
     * @param imageData The byte array of image data to resize.
     * @param width     The desired width of the resized image.
     * @param height    The desired height of the resized image.
     * @return A byte array containing the resized image data.
     * @throws Exception If an error occurs during the resizing process.
     */
    public byte[] resizeImage(byte[] imageData, int width, int height) throws Exception {
        if (imageData == null)
            return new byte[0];
        // Read the image data into a BufferedImage
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        BufferedImage image = ImageIO.read(bais);

        // Create a new BufferedImage for the resized image
        BufferedImage resizedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        // Resize the image using Graphics2D
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(image, 0, 0, width, height, null);
        g.dispose();

        // Convert the resized image to a byte array
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, "jpg", baos);

        return baos.toByteArray();
    }

    /**
     * Resizes a list of images to a width of 500 pixels and a height of 300 pixels using the Java ImageIO library.
     *
     * @param photos A List of byte arrays containing the image data to resize.
     * @return A List of byte arrays containing the resized image data.
     */
    public List<byte[]> resizeImages(List<byte[]> photos) {
        List<byte[]> resizedPhotos = new ArrayList<>();
        for (byte[] photo : photos) {
            try {
                resizedPhotos.add(resizeImage(photo, 500, 300));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return resizedPhotos;
    }
}
