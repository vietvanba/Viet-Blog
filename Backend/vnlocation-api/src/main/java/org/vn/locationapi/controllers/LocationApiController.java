package org.vn.locationapi.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vn.locationapi.services.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationApiController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LocationApiController.class);
    @Autowired
    LocationService service;

    @GetMapping("/province")
    public ResponseEntity<?> getProvinces() {
        LOGGER.info("Call get all provinces api");
        return ResponseEntity.ok(service.getAllProvince());
    }

    @GetMapping("/province/{provinceId}")
    public ResponseEntity<?> getProvinceById(@PathVariable(name = "provinceId") String provinceId) {
        LOGGER.info("Call get province by id: " + provinceId);
        return ResponseEntity.ok(service.getProvinceById(provinceId));
    }
    @GetMapping("/district")
    public ResponseEntity<?> getDistricts(@RequestParam(name = "provinceId") String provinceId) {
        LOGGER.info("Call get districts by province id: " + provinceId);
        return ResponseEntity.ok(service.getAllDistrictByProvince(provinceId));
    }
    @GetMapping("/district/{districtId}")
    public ResponseEntity<?> getDistrictById(@PathVariable(name = "districtId") String districtId) {
        LOGGER.info("Call get district by id: " + districtId);
        return ResponseEntity.ok(service.getDistrictById(districtId));
    }

    @GetMapping("/ward")
    public ResponseEntity<?> getWards(@RequestParam(name = "districtId") String districtId) {
        LOGGER.info("Call get wards by district id: " + districtId);
        return ResponseEntity.ok(service.getAllWardByDistrict(districtId));
    }
    @GetMapping("/ward/{wardId}")
    public ResponseEntity<?> getWardById(@PathVariable(name = "wardId") String wardId) {
        LOGGER.info("Call get ward id: " + wardId);
        return ResponseEntity.ok(service.getWardById(wardId));
    }
}
