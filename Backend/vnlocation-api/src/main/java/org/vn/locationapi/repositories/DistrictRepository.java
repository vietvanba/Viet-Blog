package org.vn.locationapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vn.locationapi.entities.District;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, String> {
    List<District> findAllByProvinceId(String provinceId);
}
