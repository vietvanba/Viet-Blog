package org.vn.locationapi.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.vn.locationapi.dtos.DistrictDTO;
import org.vn.locationapi.dtos.ProvinceDTO;
import org.vn.locationapi.dtos.WardDTO;
import org.vn.locationapi.entities.District;
import org.vn.locationapi.entities.Province;
import org.vn.locationapi.entities.Ward;
import org.vn.locationapi.exceptions.NotFound;
import org.vn.locationapi.repositories.DistrictRepository;
import org.vn.locationapi.repositories.ProvinceRepository;
import org.vn.locationapi.repositories.WardRepository;
import org.vn.locationapi.responses.AddressResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(LocationService.class);
    private final ModelMapper mapper;

    public List<ProvinceDTO> getAllProvince() {
        LOGGER.info("Get all province");
        List<Province> provinces = provinceRepository.findAll();
        List<ProvinceDTO> provinceDTOS = new ArrayList<>();
        for (Province province : provinces) {
            provinceDTOS.add(mapper.map(province, ProvinceDTO.class));
        }
        return provinceDTOS;
    }

    public List<DistrictDTO> getAllDistrictByProvince(String provinceId) {
        LOGGER.info("Get all district by province id: " + provinceId);
        List<District> districts = districtRepository.findAllByProvinceId(provinceId);
        List<DistrictDTO> districtDTOS = new ArrayList<>();
        for (District district : districts) {
            districtDTOS.add(mapper.map(district, DistrictDTO.class));
        }
        return districtDTOS;
    }

    public List<WardDTO> getAllWardByDistrict(String districtId) {
        LOGGER.info("Get all ward by district id: " + districtId);
        List<Ward> wards = wardRepository.findAllByDistrictId(districtId);
        List<WardDTO> wardDTOS = new ArrayList<>();
        for (Ward ward : wards) {
            wardDTOS.add(mapper.map(ward, WardDTO.class));
        }
        return wardDTOS;
    }

    public AddressResponse getProvinceById(String provinceId) {
        Province province = provinceRepository.findById(provinceId).orElseThrow(() -> {
            LOGGER.error("Can not find province with Id " + provinceId);
            return new NotFound("Can not find province with Id " + provinceId);
        });
        AddressResponse response = new AddressResponse();
        response.setId(provinceId);
        response.setAddress(province.getName());
        response.setFullAddress(province.getName());
        return response;
    }

    public AddressResponse getDistrictById(String districtId) {
        District district = districtRepository.findById(districtId).orElseThrow(() -> {
            LOGGER.error("Can not find district with Id " + districtId);
            return new NotFound("Can not find district with Id " + districtId);
        });
        AddressResponse response = new AddressResponse();
        response.setId(districtId);
        response.setAddress(district.getName());
        response.setFullAddress(district.getName() + ", " + district.getProvince().getName());
        return response;
    }

    public AddressResponse getWardById(String wardId) {
        Ward ward = wardRepository.findById(wardId).orElseThrow(() -> {
            LOGGER.error("Can not find ward with Id " + wardId);
            return new NotFound("Can not find ward with Id " + wardId);
        });
        AddressResponse response = new AddressResponse();
        response.setId(wardId);
        response.setAddress(ward.getName());
        response.setFullAddress(ward.getName() + ", " + ward.getDistrict().getName() + ", " + ward.getDistrict().getProvince().getName());
        return response;
    }
}
