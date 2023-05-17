package com.tuke.lirkiseduvepnservice.repository;

import com.tuke.lirkiseduvepnservice.model.dao.LanguageFile;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Extension of JPARepository that perform actions with a "language_file" table
 */
public interface LanguageFileRepository extends JpaRepository<LanguageFile, Long> {
}
