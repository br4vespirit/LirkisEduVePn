package com.tuke.lirkiseduvepnservice.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * The PhotoExtractor class contains methods for validating and extracting photo files
 * from the "photo/" directory based on their file extensions.
 */
@Service
@Slf4j
public class PhotoExtractor {

    /**
     * A Set containing valid photo file extensions.
     */
    private static final Set<String> PHOTO_EXTENSIONS = new HashSet<>(Arrays.asList(".png", ".jpg", ".jpeg", ".webp"));

    /**
     * Validates the provided photo file based on its file extension and name.
     * If the file is invalid, it logs an error message and returns false.
     *
     * @param filename The name of the file to validate.
     * @return True if the file is valid, false otherwise.
     */
    public boolean validatePhotoFile(String filename) {
        final String photoExtension = getPhotoExtension(filename);
        if (!PHOTO_EXTENSIONS.contains(photoExtension)) {
            log.error("Provided file inside \"photo/\" directory has other than .png, .jpg, .jpeg or .webp extension");
            return false;
        }
        filename = filename.substring(0, filename.length() - photoExtension.length());
        if (filename.contains(".")) {
            log.error("Provided file inside \"photo/\" directory has an unauthorized extension");
            return false;
        }
        return true;
    }

    /**
     * Gets the extension of the provided photo file.
     *
     * @param filename The name of the photo file.
     * @return The extension of the photo file, or an empty string if the file has no extension.
     */
    private String getPhotoExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex);
    }
}
