package com.tuke.lirkiseduvepnservice.model.dao;

import com.tuke.lirkiseduvepnservice.model.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String nickname;

    private String email;

    private String firstname;

    private String lastname;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean isEnabled;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ConfirmationToken> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
