package org.vn.locationapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vn.locationapi.entities.Province;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, String> {
}
