package org.vn.locationapi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class District {
    @Id
    private String id;
    @Nationalized
    private String name;
    @ManyToOne
    private Province province;
    @OneToMany(mappedBy = "district")
    private List<Ward> wards;
}
