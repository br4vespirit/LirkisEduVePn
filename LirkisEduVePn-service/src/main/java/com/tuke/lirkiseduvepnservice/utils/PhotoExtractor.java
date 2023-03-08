package com.tuke.lirkiseduvepnservice.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
public class PhotoExtractor {

    private static final Set<String> PHOTO_EXTENSIONS = new HashSet<>(Arrays.asList(".png", ".jpg", ".jpeg", ".webp"));

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

    private String getPhotoExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex);
    }
}
